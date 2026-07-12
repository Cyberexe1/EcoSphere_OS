const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(email) {
  return typeof email === 'string' && EMAIL_RE.test(email.trim())
}

// Returns null if valid, otherwise an error message.
export function validatePassword(password) {
  if (typeof password !== 'string' || password.length < 8) {
    return 'Password must be at least 8 characters long.'
  }
  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    return 'Password must contain both uppercase and lowercase letters.'
  }
  if (!/\d/.test(password)) {
    return 'Password must contain at least one number.'
  }
  return null
}

// Validates a registration payload. Returns { valid, errors }.
export function validateRegistration({ name, email, password }) {
  const errors = {}
  if (!name || !String(name).trim()) errors.name = 'Name is required.'
  if (!isValidEmail(email)) errors.email = 'A valid email is required.'
  const pwError = validatePassword(password)
  if (pwError) errors.password = pwError
  return { valid: Object.keys(errors).length === 0, errors }
}
