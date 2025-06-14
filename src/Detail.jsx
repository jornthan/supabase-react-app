import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

export default function Detail() {
  const { id } = useParams()
  const [entry, setEntry] = useState(null)

  useEffect(() => {
    const fetchEntry = async () => {
      const { data, error } = await supabase.from('entries').select('*').eq('id', id).single()
      if (!error) setEntry(data)
    }
    fetchEntry()
  }, [id])

  if (!entry) return <div>로딩 중...</div>

  return (
    <div style={{ padding: 20 }}>
      <h2>📄 상세보기</h2>
      <p><strong>제목:</strong> {entry.title}</p>
      <p><strong>내용:</strong> {entry.content}</p>
      <p><strong>작성일:</strong> {new Date(entry.created_at).toLocaleString()}</p>
    </div>
  )
}