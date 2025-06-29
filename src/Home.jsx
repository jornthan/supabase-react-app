import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

export default function Home() {
  const navigate = useNavigate()
  const [logs, setLogs] = useState([])

  useEffect(() => {
    async function loadLogs() {
      // Load local logs
      const localLogs = JSON.parse(localStorage.getItem('activityLogs')) || []

      // Attempt to fetch server logs
      let serverLogs = []
      try {
        const { data, error } = await supabase
          .from('activity_logs')
          .select('name, activity, timestamp')
          .order('timestamp', { ascending: false })
        if (error) {
          console.error('서버 로그 가져오기 실패', error)
        } else {
          serverLogs = data.map(log => ({
            name: log.name,
            activity: log.activity,
            timestamp: new Date(log.timestamp).toLocaleString()
          }))
        }
      } catch (err) {
        console.error('서버 로그 요청 중 에러', err)
      }

      // Combine and set logs (local first, then server)
      setLogs([...localLogs, ...serverLogs])
    }
    loadLogs()
  }, [])

  const buttonCommon = {
    width: '80%',
    maxWidth: '300px',
    padding: '16px',
    fontSize: '18px',
    borderRadius: '8px',
    border: 'none',
    margin: '8px 0'
  }

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
      <button 
        onClick={() => navigate('/list')} 
        style={{ ...buttonCommon, backgroundColor: '#2196f3', color: '#fff' }}
      >
        관찰일지 목록
      </button>
      <button 
        onClick={() => navigate('/pray')} 
        style={{ ...buttonCommon, backgroundColor: '#ff9800', color: '#fff' }}
      >
        기도부탁 명단
      </button>
      <button 
        onClick={() => navigate('/evangelism')} 
        style={{ ...buttonCommon, backgroundColor: '#4caf50', color: '#fff' }}
      >
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
