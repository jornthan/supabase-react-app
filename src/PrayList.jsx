import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PrayList() {
  const navigate = useNavigate()
  const defaultEntries = [
    { name: '김민성', target: '이승기, 임성빈', relation: '친구', note: '승기: 유학 간 친구, 6월에 한국에 오면 권유예정\n성빈: 기독교를 싫어함, 복음들어봤는데 7년 연락 안됨' },
    { name: '이수빈', target: '전승민', relation: '친구', note: '전 학교친구, 주말집회 왔었음. 말씀 듣는 건 좋아한다는데 끌어지면 힘듦' },
    { name: '김진영', target: '최현서', relation: '친구', note: '교회 오는 것에 대해 거리낌 없음. 오래 말씀 듣는 건 힘들어함, 토요일에 나올 수 있음' },
    { name: '박서현', target: '강하율', relation: '친구', note: '학교친구, 하계수양회 권유는 많이 했었음. 말씀 듣는 것을 싫어함' },
    { name: '최서이', target: '이가영', relation: '친구', note: '교회 한번 왔던 적 있음. 어머니가 교회로 보내고 싶어함. 수양회 가는데 걸림이 되긴 하나 본인은 무교라 함.' },
    { name: '이소은', target: '정재은, 김하은', relation: '친구', note: '재은: 교회 오고 싶어함 하나 부모님이 오지 말라 하심\n하은: 올해 같은 반에서 만난 친해진 친구, 교회 얘기 안 해봄' },
    { name: '최은서', target: '최서진', relation: '친구', note: '하나님에 대한 궁금증이 있고 알고 싶어하는 친구' },
    { name: '이서현', target: '홍경숙, 한은택', relation: '할머니, 할아버지', note: '다른 교회 다니심. 하계수양회 권유할 예정' },
    { name: '문아윤', target: '조새윤', relation: '친구', note: '요즘 교우관계에 힘들어해서 다가가보려 함.' },
    { name: '배유진', target: '이윤서', relation: '친구', note: '' }
  ]

  const [entries, setEntries] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('praylistEntries'))
    return saved && saved.length > 0 ? saved : defaultEntries
  })
  const [isDeleteMode, setIsDeleteMode] = useState(false)
  const [newEntry, setNewEntry] = useState({ name: '', target: '', relation: '', note: '' })

  useEffect(() => {
    localStorage.setItem('praylistEntries', JSON.stringify(entries))
  }, [entries])

  const handleNewChange = e => {
    const { name, value } = e.target
    setNewEntry(prev => ({ ...prev, [name]: value }))
  }

  const handleAdd = () => {
    if (!newEntry.name || !newEntry.target) {
      alert('이름과 전도대상자를 입력해주세요.')
      return
    }
    setEntries(prev => [...prev, newEntry])
    setNewEntry({ name: '', target: '', relation: '', note: '' })
  }

  const handleEdit = idx => {
    const entry = entries[idx]
    const updatedName = prompt('이름 수정', entry.name)
    const updatedTarget = prompt('전도대상자 수정', entry.target)
    const updatedRelation = prompt('관계 수정', entry.relation)
    const updatedNote = prompt('소개 수정', entry.note)
    if (updatedName !== null && updatedTarget !== null) {
      const updated = entries.map((e, i) =>
        i === idx
          ? { name: updatedName, target: updatedTarget, relation: updatedRelation, note: updatedNote }
          : e
      )
      setEntries(updated)
    }
  }

  const handleDelete = idx => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return
    setEntries(prev => prev.filter((_, i) => i !== idx))
  }

  return (
    <div style={{ backgroundColor: '#fffbe6', minHeight: '100vh', padding: 20 }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>🙏 기도부탁 명단</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <button
          onClick={() => navigate('/')}
          style={{ padding: '8px 16px', background: '#999', color: '#fff', border: 'none', borderRadius: 6 }}
        >
          🏠 홈으로
        </button>
        <button
          onClick={() => setIsDeleteMode(prev => !prev)}
          style={{ padding: '8px 16px', background: isDeleteMode ? '#607d8b' : '#f44336', color: '#fff', border: 'none', borderRadius: 6 }}
        >
          {isDeleteMode ? '취소' : '삭제'}
        </button>
      </div>
      <div style={{ marginBottom: 20 }}>
        <h4>새 명단 추가</h4>
        <input name="name" value={newEntry.name} onChange={handleNewChange} placeholder="이름" style={{ marginBottom: 8, width: '100%' }} />
        <input name="target" value={newEntry.target} onChange={handleNewChange} placeholder="전도대상자 이름" style={{ marginBottom: 8, width: '100%' }} />
        <input name="relation" value={newEntry.relation} onChange={handleNewChange} placeholder="관계" style={{ marginBottom: 8, width: '100%' }} />
        <textarea name="note" value={newEntry.note} onChange={handleNewChange} placeholder="소개" style={{ marginBottom: 8, width: '100%', height: 80 }} />
        <button onClick={handleAdd} style={{ padding: 10, fontSize: 16, background: '#4caf50', color: '#fff', border: 'none', borderRadius: 6, width: '100%' }}>
          추가
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {entries.map((entry, idx) => (
          <div key={idx} style={{ position: 'relative', background: '#fff', padding: 16, borderRadius: 10, boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
            {isDeleteMode && (
              <button
                onClick={() => handleDelete(idx)}
                style={{ position: 'absolute', top: 8, right: 8, background: '#e91e63', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 8px' }}
              >
                삭제
              </button>
            )}
            <p><strong>이름:</strong> {entry.name}</p>
            <p><strong>전도대상자:</strong> {entry.target}</p>
            <p><strong>관계:</strong> {entry.relation}</p>
            <p><strong>소개:</strong><br />{entry.note}</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
              <button
                onClick={() => handleEdit(idx)}
                style={{ padding: '8px 16px', background: '#ff9800', color: '#fff', border: 'none', borderRadius: 6 }}
              >
                수정하기
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
)
}
