import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout.jsx'
import AuthField from '../components/AuthField.jsx'
import Icon from '../components/Icon.jsx'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setSent(true)
  }

  return (
    <AuthLayout>
      {sent ? (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <Icon name="mark_email_read" className="text-3xl text-primary" />
          </div>
          <h1 className="text-[28px] font-extrabold tracking-tight text-on-surface">
            Check your inbox
          </h1>
          <p className="text-body-md text-on-surface-variant">
            If an account exists for <span className="font-semibold text-on-surface">{email}</span>,
            we've sent a link to reset your password.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            <Icon name="arrow_back" className="text-[18px]" /> Back to log in
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h1 className="text-[28px] font-extrabold tracking-tight text-on-surface">
              Reset your password
            </h1>
            <p className="text-body-md text-on-surface-variant mt-2">
              Enter your email and we'll send you a reset link.
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
              value={email}
              onChange={(e) => {
                setError('')
                setEmail(e.target.value)
              }}
              autoComplete="email"
            />
            <button
              type="submit"
              className="w-full h-12 bg-primary text-on-primary text-label-md rounded-xl hover:bg-primary-container transition-all shadow-lg active:scale-[0.99]"
            >
              Send reset link
            </button>
          </form>

          <p className="text-center text-body-md text-on-surface-variant mt-8">
            Remembered it?{' '}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Log in
            </Link>
          </p>
        </>
      )}
    </AuthLayout>
  )
}
