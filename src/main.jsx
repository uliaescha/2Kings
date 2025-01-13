import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MainPage from './components/pages/MainPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainPage/>
  </StrictMode>,
)
