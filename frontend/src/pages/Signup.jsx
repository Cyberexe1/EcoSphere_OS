import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout.jsx'
import AuthField from '../components/AuthField.jsx'
import SocialButtons from '../components/SocialButtons.jsx'
import Icon from '../components/Icon.jsx'

const STRENGTH = [
  { label: 'Weak', color: 'bg-error', text: 'text-error' },
  { label: 'Fair', color: 'bg-amber-500', text: 'text-amber-600' },
  { label: 'Good', color: 'bg-tertiary', text: 'text-tertiary' },
  { label: 'Strong', color: 'bg-primary', text: 'text-primary' },
]

function scorePassword(pw) {
  let score = 0
  if (pw.length >= 8) score++
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++
  if (/\d/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  return Math.min(score, 4)
}

export default function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ org: '', name: '', email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const score = scorePassword(form.password)
  const strength = score > 0 ? STRENGTH[score - 1] : null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!agreed) return
    // TODO: wire up to auth API. For now, go to login.
    navigate('/login')
  }

  return (
    <AuthLayout>
      <div className="mb-8">
        <h1 className="text-[28px] font-extrabold tracking-tight text-on-surface">
          Create your account
        </h1>
        <p className="text-body-md text-on-surface-variant mt-2">
          Start managing your ESG program in minutes.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <AuthField
          id="org"
          label="Organization name"
          placeholder="Acme Corp"
          icon="business"
          value={form.org}
          onChange={handleChange}
          autoComplete="organization"
        />

        <AuthField
          id="name"
          label="Full name"
          placeholder="Jane Doe"
          icon="person"
          value={form.name}
          onChange={handleChange}
          autoComplete="name"
        />

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

        <div>
          <AuthField
            id="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a strong password"
            icon="lock"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
            trailing={
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary"
              >
                <Icon
                  name={showPassword ? 'visibility_off' : 'visibility'}
                  className="text-[20px]"
                />
              </button>
            }
          />
          {form.password && (
            <div className="mt-2 flex items-center gap-3">
              <div className="flex-1 flex gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      i < score ? strength.color : 'bg-surface-variant'
                    }`}
                  />
                ))}
              </div>
              {strength && (
                <span className={`text-label-sm font-semibold ${strength.text}`}>
                  {strength.label}
                </span>
              )}
            </div>
          )}
        </div>

        <label className="flex items-start gap-2 text-body-sm text-on-surface-variant cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="w-4 h-4 mt-0.5 rounded border-outline-variant text-primary focus:ring-primary/30"
          />
          <span>
            I agree to the{' '}
            <a href="#" className="text-primary font-medium hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-primary font-medium hover:underline">
              Privacy Policy
            </a>
            .
          </span>
        </label>

        <button
          type="submit"
          disabled={!agreed}
          className="w-full h-12 bg-primary text-on-primary text-label-md rounded-xl hover:bg-primary-container transition-all shadow-lg active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Create account
        </button>
      </form>

      <SocialButtons />

      <p className="text-center text-body-md text-on-surface-variant mt-8">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-primary hover:underline">
          Log in
        </Link>
      </p>
    </AuthLayout>
  )
}
