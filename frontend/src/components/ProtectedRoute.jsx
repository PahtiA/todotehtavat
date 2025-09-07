import { useUser } from '../context/useUser'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute() {
  const { user } = useUser()
  if (!user || !user.token) return <Navigate to="/signin" replace />
  return <Outlet />
}
