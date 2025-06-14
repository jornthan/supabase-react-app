import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'

const labelMap = {
  name: '관찰 대상', goal: '활동 목표', character: '성격', mbti: 'MBTI',
  favorite_food: '좋아하는 음식', hobby: '취미/특기', favorite_subject: '좋아하는 과목',
  has_boyfriend: '이성 친구 유무', common_with_me: '나와의 공통점',
  favorite_color: '좋아하는 색깔', live_place: '사는 곳',
  future_job: '장래희망', weekly_note: '일주일 관찰일지'
}

export default function Edit() {
  const { id } = useParams()
  const nav = useNavigate()
  const [form, setForm] = useState({})

  useEffect(() => {
    supabase.from('observation_logs').select('*').eq('id', id).single()
      .then(({ data }) => setForm(data))
  }, [id])

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type==='checkbox'? checked : value
    }))
  }

  const handleUpdate = async () => {
    await supabase.from('observation_logs').update(form).eq('id', id)
    alert('수정 완료')
    nav('/list')
  }

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: 'auto' }}>
      <h2>✏️ 관찰일지 수정</h2>
      {Object.entries(form).map(([k,v]) => (
        (k==='id'||k==='photo_url'||k==='created_at')? null :
        <div key={k} style={{ marginBottom: 10 }}>
          <label>{labelMap[k]}:</label><br/>
          {typeof v === 'boolean'
            ? <input type="checkbox" name={k} checked={v || false} onChange={handleChange} />
            : <input type="text" name={k} value={v || ''} onChange={handleChange} style={{ width: '100%' }} />
          }
        </div>
      ))}
      <button onClick={handleUpdate}>저장</button>
    </div>
  )
}
