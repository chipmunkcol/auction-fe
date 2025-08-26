import { useNavigate } from "react-router";

export default function Header() {
  const navigate = useNavigate()
  const routes = [
    {path: '/auction', label: '경매'},
    {path: '/public-auction', label: '공매'},
    {path: '/login', label: '로그인'},
    {path: '/sign-up', label: '회원가입'}
  ]; 
  
  return (
    <header className="w-full p-6">
      <div className="flex gap-10">
        <div className="cursor-pointer" onClick={()=>navigate('/')}>Logo</div>
        <ul className="flex gap-5">
          {
            routes.map(route => (
              <div className="cursor-pointer" onClick={()=>navigate(route.path)}>
                <span>{route.label}</span>
              </div>
            ))
          }
        </ul>
      </div>
    </header>
  )
}

