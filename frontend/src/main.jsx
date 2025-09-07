import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Authentication, { AuthenticationMode } from './screens/Authentication'
import ProtectedRoute from './components/ProtectedRoute'
import UserProvider from './context/UserProvider'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from './screens/NotFound'

const router = createBrowserRouter([
  { path: '/signin', element: <Authentication authenticationMode={AuthenticationMode.SignIn} /> },
  { path: '/signup', element: <Authentication authenticationMode={AuthenticationMode.SignUp} /> },
  {
    element: <ProtectedRoute />,
    children: [
      { path: '/', element: <App /> }
    ]
  },
  { path: '*', element: <NotFound /> }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
)
