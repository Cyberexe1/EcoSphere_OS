import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { ToastProvider } from './components/ui/Toast.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import LandingPage from './pages/LandingPage.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Environmental from './pages/Environmental.jsx'
import Gamification from './pages/Gamification.jsx'
import Reports from './pages/Reports.jsx'
import Governance from './pages/Governance.jsx'
import Social from './pages/Social.jsx'
import Settings from './pages/Settings.jsx'

const PROTECTED = [
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/environmental', element: <Environmental /> },
  { path: '/social', element: <Social /> },
  { path: '/governance', element: <Governance /> },
  { path: '/gamification', element: <Gamification /> },
  { path: '/reports', element: <Reports /> },
  { path: '/settings', element: <Settings /> },
]

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            {PROTECTED.map((r) => (
              <Route
                key={r.path}
                path={r.path}
                element={<ProtectedRoute>{r.element}</ProtectedRoute>}
              />
            ))}
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  )
}
