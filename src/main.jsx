import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { AuthProvider } from './AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* koska App on kaikkien komponenttien juuri ja se on AuthProviderin child, useAuth-hook on kaikkialla käytössä */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
