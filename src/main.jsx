import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import App from './App'
import List from './List'
import Detail from './Detail'
import Edit from './Edit'
import PrayList from './PrayList'
import EvangelismList from './EvangelismList'
import ActivityPage from './ActivityPage'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<List />} />
      <Route path="/write" element={<App />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/pray" element={<PrayList />} />
      <Route path="/evangelism" element={<EvangelismList />} />
      <Route path="/activity" element={<EvangelismList />} />  {/* 전도활동 목록 경로 추가 */}
      <Route path="/activity/:index" element={<ActivityPage />} />  {/* 전도활동 시작 경로 */}
    </Routes>
  </BrowserRouter>
)
