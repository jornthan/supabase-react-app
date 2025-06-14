import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import { Link } from 'react-router-dom'

export default function List() {
  const [logs, setLogs] = useState([])

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
    <div style={{ padding: 16 }}>
      <h2 style={{ textAlign: 'center' }}>👥 친구 관찰일지 목록</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {logs.map(l => (
          <div key={l.id} style={{
            border: '1px solid #ccc', borderRadius: 10,
            padding: 15, width: '100%', background: '#f9f9f9'
          }}>
            {l.photo_url && (
              <img src={l.photo_url} alt="사진" style={{ width: '100%', borderRadius: 5 }} />
            )}
            <p><strong>관찰 대상:</strong> {l.name}</p>
            <p><strong>활동 목표:</strong> {l.goal}</p>
            <Link to={`/detail/${l.id}`}>상세 보기</Link> | <Link to={`/edit/${l.id}`}>수정</Link>
            <br />
            <button onClick={() => handleDelete(l.id)} style={{
              marginTop: 10, background: '#f66', color: '#fff',
              border: 'none', padding: 8, borderRadius: 5
            }}>삭제</button>
          </div>
        ))}
      </div>
    </div>
  )
}