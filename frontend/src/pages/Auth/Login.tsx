// import { useForm } from 'react-hook-form'

import axios from "axios"
import { useState } from "react"

interface LOGIN {
  id: string,
  pw: string
}

export default function Login() {
  
  const [login, setLogin] = useState<LOGIN>({
    id: '',
    pw: ''
  })

  const onChangeLogin = (key: keyof LOGIN, value: string ) => {
    setLogin(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!login.id) return
    if (!login.pw) return

    try {
      const response = await axios.post('/api/login', {
        user_id: login.id,
        password: login.pw
      })
    if (response.data.success) {
      alert('로그인 되었습니다')
    }
      console.log("🚀 ~ handleSignup ~ response:", response)
    } catch (err) {
      console.log(err)
    }
    
  }

  return (
    <div className='w-full bg-[#f8f8fc]'>
      <h1 className='text-center'>회원 로그인</h1>
      <form onSubmit={handleLogin} className='w-full flex flex-col items-center gap-5'>
      <div>
        <input className='border w-60' placeholder='아이디' value={login.id} onChange={(e) => onChangeLogin('id', e.target.value)} />
      </div>
      <div>
        <input className='border w-60' placeholder='비밀번호' value={login.pw} onChange={(e) => onChangeLogin('pw', e.target.value)} />
      </div>
      <div>
        <button type='submit' className='border-2'>
          회원 로그인
        </button>
      </div>
      </form>
    </div>
  )
} 