import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import List from './List'
import Detail from './Detail'
import Edit from './Edit'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/list" element={<List />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/edit/:id" element={<Edit />} />
    </Routes>
  </BrowserRouter>
)
