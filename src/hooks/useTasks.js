import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

const LS_KEY = 'clarity_tasks'

function localLoad() {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || [] } catch { return [] }
}
function localSave(tasks) {
  localStorage.setItem(LS_KEY, JSON.stringify(tasks))
}

export function useTasks(user) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const online = !!user

  // Load
  useEffect(() => {
    if (!online) {
      setTasks(localLoad())
      setLoading(false)
      return
    }
    setLoading(true)
    supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setTasks(data)
        setLoading(false)
      })
  }, [user, online])

  // Real-time subscription
  useEffect(() => {
    if (!online) return
    const channel = supabase
      .channel('tasks-changes')
      .on('postgres_changes', {
        event: '*', schema: 'public', table: 'tasks',
        filter: `user_id=eq.${user.id}`
      }, payload => {
        if (payload.eventType === 'INSERT') setTasks(t => [payload.new, ...t])
        if (payload.eventType === 'UPDATE') setTasks(t => t.map(x => x.id === payload.new.id ? payload.new : x))
        if (payload.eventType === 'DELETE') setTasks(t => t.filter(x => x.id !== payload.old.id))
      })
      .subscribe()
    return () => supabase.removeChannel(channel)
  }, [user, online])

  const addTask = useCallback(async (task) => {
    if (!online) {
      const newTask = { ...task, id: crypto.randomUUID(), created_at: new Date().toISOString(), completed: false }
      setTasks(t => { const n = [newTask, ...t]; localSave(n); return n })
      return
    }
    await supabase.from('tasks').insert({ ...task, user_id: user.id, completed: false })
  }, [online, user])

  const updateTask = useCallback(async (id, updates) => {
    if (!online) {
      setTasks(t => { const n = t.map(x => x.id === id ? { ...x, ...updates } : x); localSave(n); return n })
      return
    }
    await supabase.from('tasks').update(updates).eq('id', id)
  }, [online])

  const deleteTask = useCallback(async (id) => {
    if (!online) {
      setTasks(t => { const n = t.filter(x => x.id !== id); localSave(n); return n })
      return
    }
    await supabase.from('tasks').delete().eq('id', id)
  }, [online])

  const toggleTask = useCallback((id) => {
    const task = tasks.find(t => t.id === id)
    if (task) updateTask(id, { completed: !task.completed, completed_at: !task.completed ? new Date().toISOString() : null })
  }, [tasks, updateTask])

  return { tasks, loading, addTask, updateTask, deleteTask, toggleTask }
}
