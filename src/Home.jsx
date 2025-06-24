import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Home() {
  const navigate = useNavigate()
  const [logs, setLogs] = useState([])

  useEffect(() => {
    const savedLogs = JSON.parse(localStorage.getItem('activityLogs')) || []
    setLogs(savedLogs)
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#fffbe6',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 20,
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: 24, marginBottom: 20 }}>친구 관찰 일지 앱</h1>
      <button onClick={() => navigate('/list')} style={{
        padding: '12px 24px',
        fontSize: '16px',
        backgroundColor: '#2196f3',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        marginBottom: 10
      }}>
        관찰일지 목록
      </button>
      <button onClick={() => navigate('/pray')} style={{
        padding: '12px 24px',
        fontSize: '16px',
        backgroundColor: '#ff9800',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        marginBottom: 10
      }}>
        기도부탁 명단
      </button>
      <button onClick={() => navigate('/evangelism')} style={{
        padding: '12px 24px',
        fontSize: '16px',
        backgroundColor: '#4caf50',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        marginTop: 20
      }}>
        전도활동
      </button>
      <div style={{
        width: '100%',
        maxWidth: 600,
        marginTop: 40,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        textAlign: 'left',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        maxHeight: '200px',
        overflowY: 'auto'
      }}>
        <ul>
          {logs.map((log, idx) => (
            <li key={idx} style={{ marginBottom: 8 }}>
              {log.timestamp}: {log.name}님이 {log.activity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
