import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function EvangelismList() {
  const navigate = useNavigate()
  const [entries, setEntries] = useState([])

  useEffect(() => {
    // Load pray list entries and map to evangelism entries
    const prayEntries = JSON.parse(localStorage.getItem('praylistEntries')) || []
    const evangeEntries = prayEntries.map(({ name, target }) => ({ name, target }))
    setEntries(evangeEntries)
  }, [])

  return (
    <div style={{ backgroundColor: '#fffbe6', minHeight: '100vh', padding: 20 }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>🙏 전도활동 명단</h2>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: 10,
            fontSize: 16,
            borderRadius: 6,
            background: '#999',
            color: '#fff',
            border: 'none'
          }}
        >
          🏠 홈으로
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {entries.map((entry, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: '#fff',
              padding: 16,
              borderRadius: 10,
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
            }}
          >
            <p><strong>이름:</strong> {entry.name}</p>
            <p><strong>전도대상자:</strong> {entry.target}</p>
            <button
              onClick={() => navigate(`/activity/${idx}`)}
              style={{
                background: '#4caf50',
                color: '#fff',
                padding: '8px 16px',
                border: 'none',
                borderRadius: 6,
                width: '100%'
              }}
            >
              전도활동 시작
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
