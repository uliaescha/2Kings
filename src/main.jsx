import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MainPage from './components/pages/main-page/MainPage'
import AboutUs from './components/pages/about-us/AboutUs'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainPage />
    <AboutUs/>
  </StrictMode>,
)
