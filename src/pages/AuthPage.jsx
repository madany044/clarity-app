import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import styles from './AuthPage.module.css'

export default function AuthPage() {
  const [mode,    setMode]    = useState('signin') // 'signin' | 'signup'
  const [email,   setEmail]   = useState('')
  const [password,setPassword]= useState('')
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError(''); setSuccess(''); setLoading(true)
    if (mode === 'signup') {
      const { error } = await signUp(email, password)
      if (error) setError(error.message)
      else setSuccess('Check your email to confirm your account!')
    } else {
      const { error } = await signIn(email, password)
      if (error) setError(error.message)
      else navigate('/')
    }
    setLoading(false)
  }

  return (
    <div className={styles.page}>
      <div className={styles.card + ' fade-up'}>
        <div className={styles.logo}>clarity<span>.</span></div>
        <p className={styles.tagline}>Distraction-free tasks, every day.</p>

        <div className={styles.tabs}>
          <button className={mode === 'signin' ? styles.tabActive : styles.tab} onClick={() => { setMode('signin'); setError(''); setSuccess('') }}>Sign In</button>
          <button className={mode === 'signup' ? styles.tabActive : styles.tab} onClick={() => { setMode('signup'); setError(''); setSuccess('') }}>Create Account</button>
        </div>

        <form onSubmit={submit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input className={styles.input} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <input className={styles.input} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} />
          </div>
          {error   && <div className={styles.error}>{error}</div>}
          {success && <div className={styles.success}>{success}</div>}
          <button className={styles.btn} type="submit" disabled={loading}>
            {loading ? 'Please wait…' : mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className={styles.footnote}>
          {mode === 'signin' ? "Don't have an account? " : 'Already have one? '}
          <span className={styles.link} onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); setSuccess('') }}>
            {mode === 'signin' ? 'Sign up free' : 'Sign in'}
          </span>
        </p>
      </div>
    </div>
  )
}
