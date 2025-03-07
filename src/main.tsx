import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { NhostClient, NhostProvider } from '@nhost/react'
import CustomApolloProvider from './components/CustomApolloProvider.tsx'

export const nhost = new NhostClient({
  subdomain: import.meta.env.VITE_nhost_subdomain,
  region: import.meta.env.VITE_nhost_region,
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NhostProvider nhost={nhost}>
      <CustomApolloProvider>
        <App />
      </CustomApolloProvider>
    </NhostProvider>
  </StrictMode>,
)
