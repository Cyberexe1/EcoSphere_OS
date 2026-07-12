import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout.jsx'
import AuthField from '../components/AuthField.jsx'
import SocialButtons from '../components/SocialButtons.jsx'
import Icon from '../components/Icon.jsx'
import { useAuth, DEMO_CREDENTIALS } from '../context/AuthContext.jsx'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setError('')
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const result = login(form.email, form.password)
    if (result.ok) {
      navigate('/dashboard')
    } else {
      setError(result.error)
    }
  }

  const fillDemo = () => {
    setError('')
    setForm({ email: DEMO_CREDENTIALS.email, password: DEMO_CREDENTIALS.password })
  }

  return (
    <AuthLayout>
      <div className="mb-8">
        <h1 className="text-[28px] font-extrabold tracking-tight text-on-surface">Welcome back</h1>
        <p className="text-body-md text-on-surface-variant mt-2">
          Log in to your EcoSphere workspace.
        </p>
      </div>

      {error && (
        <div className="mb-5 flex items-start gap-2 rounded-xl border border-error/30 bg-error-container/60 px-4 py-3 text-body-sm text-on-error-container">
          <Icon name="error" className="text-[20px] text-error" />
          <span>{error}</span>
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <AuthField
          id="email"
          label="Work email"
          type="email"
          placeholder="you@company.com"
          icon="mail"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
        />

        <AuthField
          id="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          icon="lock"
          value={form.password}
          onChange={handleChange}
          autoComplete="current-password"
          trailing={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary"
            >
              <Icon name={showPassword ? 'visibility_off' : 'visibility'} className="text-[20px]" />
            </button>
          }
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-body-sm text-on-surface-variant cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary/30"
            />
            Remember me
          </label>
          <Link
            to="/forgot-password"
            className="text-body-sm font-medium text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full h-12 bg-primary text-on-primary text-label-md rounded-xl hover:bg-primary-container transition-all shadow-lg active:scale-[0.99]"
        >
          Log in
        </button>
      </form>

      <div className="mt-6 rounded-xl border border-dashed border-primary/40 bg-primary/5 px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-label-md text-primary">
            <Icon name="key" className="text-[18px]" />
            Demo account
          </div>
          <button
            type="button"
            onClick={fillDemo}
            className="text-label-md text-primary font-semibold hover:underline"
          >
            Autofill
          </button>
        </div>
        <p className="text-body-sm text-on-surface-variant mt-2">
          Email: <span className="font-semibold text-on-surface">{DEMO_CREDENTIALS.email}</span>
          <br />
          Password:{' '}
          <span className="font-semibold text-on-surface">{DEMO_CREDENTIALS.password}</span>
        </p>
      </div>

      <SocialButtons />

      <p className="text-center text-body-md text-on-surface-variant mt-8">
        Don't have an account?{' '}
        <Link to="/signup" className="font-semibold text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  )
}
