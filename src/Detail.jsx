import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

const labelMap = {
  name: "관찰 대상",
  goal: "활동 목표",
  character: "성격",
  mbti: "MBTI",
  favorite_food: "좋아하는 음식",
  hobby: "취미/특기",
  favorite_subject: "좋아하는 과목",
  has_boyfriend: "이성 친구 유무",
  common_with_me: "나와의 공통점",
  favorite_color: "좋아하는 색깔",
  live_place: "사는 곳",
  future_job: "장래희망",
  weekly_note: "일주일 관찰일지"
}

export default function Detail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [entry, setEntry] = useState(null)

  useEffect(() => {
    supabase.from('observation_logs').select('*').eq('id', id).single()
      .then(({ data }) => setEntry(data))
  }, [id])

  const del = async () => {
    if (!confirm('정말 삭제?')) return
    await supabase.from('observation_logs').delete().eq('id', id)
    navigate('/list')
  }

  if (!entry) return <div>로딩 중...</div>

  return (
    <div style={{
      padding: 16, maxWidth: 700, margin: 'auto',
      border: '1px solid #ccc', borderRadius: 10, background: '#fffbe6'
    }}>
      <h2 style={{ textAlign: 'center' }}>👀 친구 관찰일지</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <img src={entry.photo_url} alt="사진" style={{ width: '100%', borderRadius: 10 }} />
        <table style={{ width: '100%', fontSize: 15 }}>
          <tbody>
            {Object.entries(entry).map(([key, val]) => (
              (key !== 'photo_url' && key !== 'id' && key !== 'created_at') &&
              <tr key={key}>
                <td style={{ fontWeight: 'bold', padding: '6px 8px' }}>{labelMap[key]}</td>
                <td style={{ padding: '6px 8px' }}>
                  {key === 'has_boyfriend'
                    ? (val ? '있음' : '없음')
                    : val?.toString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 16 }}>
        <button onClick={del} style={{
          background: '#f66', color: '#fff', padding: '10px 20px',
          border: 'none', borderRadius: 6, width: '100%'
        }}>삭제하기</button>
      </div>
    </div>
  )
}