import axios from "axios"
import { useRef, useState } from "react"

interface SIGNUP {
  id: string,
  pw: string,
}

export default function Signup() {
  
  const [signup, setSignup] = useState<SIGNUP>({
    id: '',
    pw: '',
  })

  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')

  const [isVerify, setIsVerify] = useState(false);
  const isVerifyRef = useRef(false);


  const onChangeSignup = (key: keyof SIGNUP, value: string) => {
    setSignup(prev => ({
      ...prev,
      [key] : value
    }))
  }

  const onChangePhone = (value: string) => {
    setPhone(value)
  }

  const onChangeCode = (value: string) => {
    setCode(value)
  }

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 새로고침 방지

    // 아이디 패스워드가 없으면 실행x
    if (!signup.id.trim()) return alert('id를 입력해주세요')
    if (!signup.pw.trim()) return alert('pw를 입력해주세요')
    if (!isVerifyRef.current) return alert('휴대폰 인증을 해주세요')

    try {
      const response = await axios.post('/api/sign-up', {
        user_id: signup.id,
        password: signup.pw,
        phone
      })

      if (response.data.success) {
        alert('회원가입 되었습니다')
        isVerifyRef.current = false
      }
      console.log("🚀 ~ handleSignup ~ response:", response)
    } catch (err) {
      console.log(err)
    }
  }

  const sendCode = async () => {
    if (!phone) return alert('휴대폰 번호를 입력해주세요')

    const response = await axios.post('/api/send-code', { phone });
    if (response.data.success) {
      console.log(response.data.message)
    }
  }

  const verifyCode = async () => {
    if (!phone) return alert('인증했던 휴대폰 번호를 입력해주세요')
    if (!code) return alert('인증번호를 입력해주세요')
      
    const response = await axios.post('/api/verify-code', { phone, code });
    if (response.data.success) {
      console.log(response.data.message)
      isVerifyRef.current = true;
      setIsVerify(true)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center">회원가입</h1>
      
      <form onSubmit={handleSignup} className="space-y-4">
        {/* 아이디 */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">아이디</label>
          <input
            required
            type="text"
            value={signup.id}
            onChange={(e) => onChangeSignup('id', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
  
        {/* 비밀번호 */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">비밀번호</label>
          <input
            required
            type="password"
            value={signup.pw}
            onChange={(e) => onChangeSignup('pw', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
  
        {/* 휴대폰 인증 */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">휴대폰 인증</label>
          <div className="flex gap-2">
            <input
              required
              type="tel"
              onChange={(e) => onChangePhone(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={sendCode}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              인증번호 받기
            </button>
          </div>
        </div>
  
        {/* 인증번호 입력 */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">인증번호 입력</label>
          <div className="flex gap-2">
            <input
              required
              type="text"
              onChange={(e) => onChangeCode(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={verifyCode}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              확인
            </button>
          </div>
        </div>
  
        {/* submit */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition-colors"
        >
          회원가입
        </button>
      </form>
    </div>
  </div>
  )
} 