
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import App from './App'
import List from './List'
import Detail from './Detail'
import Edit from './Edit'
import PrayList from './PrayList'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/write" element={<App />} />
      <Route path="/list" element={<List />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/pray" element={<PrayList />} />
    </Routes>
  </BrowserRouter>
)
