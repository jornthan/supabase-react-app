import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from './supabaseClient'

export default function ActivityPage() {
  const { index } = useParams()
  const navigate = useNavigate()

  // Load pray list entries directly
  const prayEntries = JSON.parse(localStorage.getItem('praylistEntries')) || []
  const entry = prayEntries[index] || {}

  // Define activities
  const activities = [
    { key: 'prayForFriend', label: '친구를 위해 기도하기' },
    { key: 'inviteHome', label: '집에 초대하기' },
    { key: 'safetyEscort', label: '귀갓길 안전지킴이' },
    { key: 'dailyContact', label: '매일 연락하기' },
    { key: 'eatTogether', label: '같이 밥먹기' },
    { key: 'shareSnack', label: '간식 나눠주기' },
  ]

  // Initialize counts
  const initialCounts = activities.reduce((acc, act) => {
    acc[act.key] = 0
    return acc
  }, {})

  const [counts, setCounts] = useState(initialCounts)

  const handleCount = async act => {
    // Update count state
    setCounts(prev => ({
      ...prev,
      [act.key]: prev[act.key] + 1
    }))

    // 1) Log to localStorage
    const logEntry = {
      name: entry.name,
      activity: act.label,
      timestamp: new Date().toLocaleString()
    }
    const logsLocal = JSON.parse(localStorage.getItem('activityLogs')) || []
    logsLocal.unshift(logEntry)
    localStorage.setItem('activityLogs', JSON.stringify(logsLocal))

    // 2) Log to Supabase
    try {
      const { error } = await supabase
        .from('activity_logs')
        .insert([{
          name: entry.name,
          activity: act.label,
          timestamp: new Date().toISOString()
        }])
      if (error) throw error
    } catch (err) {
      console.error('Supabase 로그 저장 실패', err)
    }
  }

  if (!entry.name) {
    return <div style={{ padding: 20 }}>존재하지 않는 전도활동입니다.</div>
  }

  return (
    <div style={{ backgroundColor: '#fffbe6', minHeight: '100vh', padding: 20 }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>{entry.name} 전도활동</h2>
      <div style={{ padding: 16, border: '1px solid #ccc', borderRadius: 10, backgroundColor: '#fff', marginBottom: 20 }}>
        <h3>전도대상자: {entry.target}</h3>
        {activities.map(act => (
          <button
            key={act.key}
            onClick={() => handleCount(act)}
            style={{
              padding: '10px 20px',
              width: '100%',
              borderRadius: 6,
              border: 'none',
              marginBottom: 8,
              backgroundColor: '#2196f3',
              color: '#fff'
            }}
          >
            {act.label} ({counts[act.key]}회)
          </button>
        ))}
      </div>
      <button
        onClick={() => navigate('/')}
        style={{
          padding: 10,
          fontSize: 16,
          borderRadius: 6,
          backgroundColor: '#999',
          color: '#fff',
          border: 'none',
          width: '100%',
          marginBottom: 20
        }}
      >
        🏠 홈으로
      </button>
    </div>
  )
}
