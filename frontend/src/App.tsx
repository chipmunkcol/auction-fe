import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import Main from './pages/main';
import Header from './components/common/Header';
import PublicAuction from './pages/PublicAuction';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import Dashboard from './pages/admin/Dashboard';
import Auction from './pages/Aunction';


function App() {
  // 로그인 시 유저 정보 저장 및 admin 판단
  const isAdmin = true

  return (
    <>
      <BrowserRouter>
        <div className='min-h-screen '>
        <Header />

        <main className='w-full'>
          <Routes>
            <Route path='/' element={<Main/>}></Route>
            <Route path='/auction' element={<Auction />} ></Route>
            <Route path='/public-auction' element={<PublicAuction />}></Route>
          
          {/* 인증 */}
            <Route path='/sign-up' element={<Signup/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            
          {/* 관리자 모드 */}
            {
              isAdmin &&
              <Route path='/admin' element={<Dashboard />} />}
          </Routes>

        </main>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
