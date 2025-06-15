
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#fffbe6',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      textAlign: 'center'
    }}>
      <h1 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 40
      }}>
        중고등부 중2 페이지
      </h1>
      <button onClick={() => navigate('/list')} style={{
        padding: '12px 24px',
        fontSize: '16px',
        backgroundColor: '#2196f3',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        marginBottom: 12
      }}>
        친구 관찰일지
      </button>
      <button onClick={() => navigate('/pray')} style={{
        padding: '12px 24px',
        fontSize: '16px',
        backgroundColor: '#ff9800',
        color: '#fff',
        border: 'none',
        borderRadius: 8
      }}>
        🙏 기도부탁 명단
      </button>
    </div>
  )
}
