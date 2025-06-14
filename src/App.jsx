import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import { Link } from 'react-router-dom'

function App() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [entries, setEntries] = useState([])

  const fetchEntries = async () => {
    const { data, error } = await supabase
      .from('entries')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setEntries(data)
  }

  const addEntry = async () => {
    if (!title || !content) return
    const { error } = await supabase.from('entries').insert([{ title, content }])
    if (!error) {
      setTitle('')
      setContent('')
      fetchEntries()
    }
  }

  const deleteEntry = async (id) => {
    await supabase.from('entries').delete().eq('id', id)
    fetchEntries()
  }

  useEffect(() => {
    fetchEntries()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h2>📋 새 데이터 입력</h2>
      <input
        placeholder="제목"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ width: 300 }}
      /><br /><br />
      <textarea
        placeholder="내용"
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={4}
        cols={40}
        style={{ width: 300 }}
      /><br /><br />
      <button onClick={addEntry}>저장</button>

      <h2>🗂 저장된 항목</h2>
      {entries.map(e => (
        <div key={e.id} style={{
          border: '1px solid #ccc',
          borderRadius: 10,
          padding: 10,
          marginBottom: 10,
          backgroundColor: '#f9f9f9',
          maxWidth: 500
        }}>
          <Link to={`/detail/${e.id}`}>
            <strong>{e.title}</strong>: {e.content}
          </Link>
          <br />
          <button onClick={() => deleteEntry(e.id)}>삭제</button>
        </div>
      ))}
    </div>
  )
}

export default App