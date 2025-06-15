import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import { Link, useNavigate } from 'react-router-dom'

export default function List() {
  const [logs, setLogs] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    supabase.from('observation_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => setLogs(data))
  }, [])

  const handleDelete = async id => {
    if (!confirm('정말 삭제할까요?')) return
    await supabase.from('observation_logs').delete().eq('id', id)
    setLogs(prev => prev.filter(l => l.id !== id))
  }

  return (
    <div style={{ backgroundColor: '#fffbe6', minHeight: '100vh', padding: 16 }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>👥 친구 관찰일지 목록</h2>

      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <button onClick={() => navigate('/write')} style={{
          padding: 10, fontSize: 16, borderRadius: 6,
          background: '#4caf50', color: '#fff', border: 'none', marginRight: 10
        }}>
          ➕ 관찰일지 작성하기
        </button>
        <button onClick={() => navigate('/')} style={{
          padding: 10, fontSize: 16, borderRadius: 6,
          background: '#999', color: '#fff', border: 'none'
        }}>
          🏠 홈으로
        </button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
        {logs.map(l => (
          <div key={l.id} style={{
            border: '1px solid #ccc', borderRadius: 10,
            padding: 15, width: 260, background: '#fff',
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)', color: '#333',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }} onMouseOver={e => {
            e.currentTarget.style.transform = 'scale(1.02)'
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)'
          }} onMouseOut={e => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.05)'
          }}>
            {l.photo_url && (
              <img src={l.photo_url} alt="사진" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: 5 }} />
            )}
            <p><strong>관찰 대상:</strong> {l.name}</p>
            <p><strong>활동 목표:</strong> {l.goal}</p>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <Link to={`/detail/${l.id}`} style={{ flex: 1 }}>
                <button style={{
                  width: '100%', padding: 8, borderRadius: 5,
                  background: '#2196f3', color: '#fff', border: 'none'
                }}>상세 보기</button>
              </Link>
              <Link to={`/edit/${l.id}`} style={{ flex: 1 }}>
                <button style={{
                  width: '100%', padding: 8, borderRadius: 5,
                  background: '#ff9800', color: '#fff', border: 'none'
                }}>수정</button>
              </Link>
            </div>
            <button onClick={() => handleDelete(l.id)} style={{
              marginTop: 10, background: '#f66', color: '#fff',
              border: 'none', padding: 8, borderRadius: 5, width: '100%'
            }}>삭제</button>
          </div>
        ))}
      </div>
    </div>
  )
}