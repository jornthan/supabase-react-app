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
  const navigate = useNavigate()
  const [form, setForm] = useState({})
  const [newImage, setNewImage] = useState(null)

  useEffect(() => {
    supabase
      .from('observation_logs')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => setForm(data))
  }, [id])

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleImageSelect = e => {
    setNewImage(e.target.files[0])
  }

  const uploadImage = async () => {
    if (!newImage) return form.photo_url || ''
    const cleanFileName = newImage.name.replace(/[^a-zA-Z0-9.]/g, '')
    const fileName = `${Date.now()}_${cleanFileName}`
    const { error } = await supabase.storage.from('observation-photos').upload(fileName, newImage)
    if (error) {
      alert('이미지 업로드 실패: ' + error.message)
      return form.photo_url || ''
    }
    const { data: urlData } = supabase.storage.from('observation-photos').getPublicUrl(fileName)
    return urlData.publicUrl
  }

  const handleUpdate = async () => {
    const photo_url = await uploadImage()
    await supabase
      .from('observation_logs')
      .update({ ...form, photo_url })
      .eq('id', id)
    alert('수정 완료')
    navigate('/list')
  }

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: 'auto' }}>
      <h2>✏️ 관찰일지 수정</h2>
      <div style={{ marginBottom: 10 }}>
        <label>현재 사진:</label><br/>
        {form.photo_url && <img src={form.photo_url} alt="사진" style={{ width: '100%', borderRadius: 5, marginBottom: 10 }} />}
      </div>
      <div style={{ marginBottom: 20 }}>
        <label>새 사진 업로드:</label><br/>
        <input type="file" onChange={handleImageSelect} />
      </div>
      {Object.entries(form).map(([k, v]) => (
        (k === 'id' || k === 'photo_url' || k === 'created_at') ? null :
        <div key={k} style={{ marginBottom: 10 }}>
          <label>{labelMap[k]}:</label><br/>
          {typeof v === 'boolean'
            ? <input type="checkbox" name={k} checked={v || false} onChange={handleChange} />
            : <input type="text" name={k} value={v || ''} onChange={handleChange} style={{ width: '100%' }} />
          }
        </div>
      ))}
      <button onClick={handleUpdate} style={{ padding: '10px 20px', background: '#4caf50', color: '#fff', border: 'none', borderRadius: 6 }}>
        저장
      </button>
    </div>
  )
}
