import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { format } from 'date-fns'

const LS_HABITS = 'clarity_habits'
const LS_LOGS   = 'clarity_habit_logs'

function lsGet(k) { try { return JSON.parse(localStorage.getItem(k)) || [] } catch { return [] } }
function lsSet(k, v) { localStorage.setItem(k, JSON.stringify(v)) }

export function useHabits(user) {
  const [habits, setHabits]   = useState([])
  const [logs,   setLogs]     = useState([])
  const [loading, setLoading] = useState(true)
  const online = !!user
  const today  = format(new Date(), 'yyyy-MM-dd')

  useEffect(() => {
    if (!online) {
      setHabits(lsGet(LS_HABITS))
      setLogs(lsGet(LS_LOGS))
      setLoading(false)
      return
    }
    setLoading(true)
    Promise.all([
      supabase.from('habits').select('*').eq('user_id', user.id).order('created_at'),
      supabase.from('habit_logs').select('*').eq('user_id', user.id).gte('log_date', format(new Date(Date.now() - 30*86400000), 'yyyy-MM-dd'))
    ]).then(([{ data: h }, { data: l }]) => {
      if (h) setHabits(h)
      if (l) setLogs(l)
      setLoading(false)
    })
  }, [user, online])

  const addHabit = useCallback(async (name, color = '#c85a2a', icon = '⭐') => {
    if (!online) {
      const h = { id: crypto.randomUUID(), name, color, icon, created_at: new Date().toISOString() }
      setHabits(hs => { const n = [...hs, h]; lsSet(LS_HABITS, n); return n })
      return
    }
    const { data } = await supabase.from('habits').insert({ user_id: user.id, name, color, icon }).select().single()
    if (data) setHabits(hs => [...hs, data])
  }, [online, user])

  const deleteHabit = useCallback(async (id) => {
    if (!online) {
      setHabits(hs => { const n = hs.filter(h => h.id !== id); lsSet(LS_HABITS, n); return n })
      return
    }
    await supabase.from('habits').delete().eq('id', id)
    setHabits(hs => hs.filter(h => h.id !== id))
  }, [online])

  const toggleLog = useCallback(async (habitId) => {
    const existing = logs.find(l => l.habit_id === habitId && l.log_date === today)
    if (existing) {
      if (!online) {
        setLogs(ls => { const n = ls.filter(l => l.id !== existing.id); lsSet(LS_LOGS, n); return n })
      } else {
        await supabase.from('habit_logs').delete().eq('id', existing.id)
        setLogs(ls => ls.filter(l => l.id !== existing.id))
      }
    } else {
      if (!online) {
        const log = { id: crypto.randomUUID(), habit_id: habitId, log_date: today }
        setLogs(ls => { const n = [...ls, log]; lsSet(LS_LOGS, n); return n })
      } else {
        const { data } = await supabase.from('habit_logs').insert({ user_id: user.id, habit_id: habitId, log_date: today }).select().single()
        if (data) setLogs(ls => [...ls, data])
      }
    }
  }, [logs, today, online, user])

  const isDoneToday = (habitId) => logs.some(l => l.habit_id === habitId && l.log_date === today)

  const getStreak = (habitId) => {
    const habitLogs = logs.filter(l => l.habit_id === habitId).map(l => l.log_date).sort().reverse()
    let streak = 0
    let check = today
    for (let i = 0; i < 365; i++) {
      if (habitLogs.includes(check)) { streak++; check = format(new Date(new Date(check).getTime() - 86400000), 'yyyy-MM-dd') }
      else break
    }
    return streak
  }

  return { habits, logs, loading, addHabit, deleteHabit, toggleLog, isDoneToday, getStreak }
}
