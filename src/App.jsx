import { useState } from 'react'
import { supabase } from './supabaseClient'
import { useNavigate, Link } from 'react-router-dom'

function App() {
  const [form, setForm] = useState({
    name: '', goal: '', character: '', mbti: '', favorite_food: '', hobby: '',
    favorite_subject: '', has_boyfriend: false, common_with_me: '',
    favorite_color: '', live_place: '', future_job: '', weekly_note: ''
  })
  const [image, setImage] = useState(null)
  const navigate = useNavigate()

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const uploadImage = async () => {
    if (!image) return ''
    const cleanFileName = image.name.replace(/[^a-zA-Z0-9.]/g, '')
    const fileName = `${Date.now()}_${cleanFileName}`
    const { error } = await supabase.storage.from('observation-photos').upload(fileName, image)
    if (error) {
      alert('이미지 업로드 실패: ' + error.message)
      return ''
    }
    const { data: urlData } = supabase.storage.from('observation-photos').getPublicUrl(fileName)
    return urlData.publicUrl
  }

  const handleSubmit = async () => {
    const photo_url = await uploadImage()
    const { error } = await supabase.from('observation_logs').insert([{ ...form, photo_url }])
    if (error) return alert('저장 실패')
    alert('저장 완료')
    navigate('/list')
  }

  const labelMap = {
    name: '관찰 대상', goal: '활동 목표', character: '성격', mbti: 'MBTI',
    favorite_food: '좋아하는 음식', hobby: '취미/특기', favorite_subject: '좋아하는 과목',
    has_boyfriend: '이성 친구 유무', common_with_me: '나와의 공통점',
    favorite_color: '좋아하는 색깔', live_place: '사는 곳',
    future_job: '장래희망', weekly_note: '일주일 관찰일지'
  }

  return (
    <div style={{ padding: 20, maxWidth: '100%', width: 500, margin: 'auto' }}>
      <h2>친구 관찰일지 입력</h2>
      <Link to="/list">
        <button style={{ marginBottom: 20, width: '100%', padding: 10 }}>📋 관찰일지 목록 보기</button>
      </Link>
      {Object.entries(form).map(([key, val]) => (
        <div key={key} style={{ marginBottom: 10 }}>
          <label>{labelMap[key]}:</label><br />
          {typeof val === 'boolean'
            ? <input type="checkbox" name={key} checked={val} onChange={handleChange} />
            : <input type="text" name={key} value={val} onChange={handleChange}
                     style={{ width: '100%', padding: 8, fontSize: 16 }} />
          }
        </div>
      ))}
      <div style={{ marginBottom: 10 }}>
        <label>사진 업로드:</label><br/>
        <input type="file" onChange={e => setImage(e.target.files[0])} />
      </div>
      <button onClick={handleSubmit} style={{ width: '100%', padding: 10, fontSize: 16 }}>저장하기</button>
    </div>
  )
}

export default App