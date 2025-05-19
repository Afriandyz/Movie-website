import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DetailsFilm from './components/DetailsFilm.jsx'

createRoot(document.getElementById('root')).render(
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/details/:id' element={<DetailsFilm />} />
      </Routes>
    </Router>,
)
