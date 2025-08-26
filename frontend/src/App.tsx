import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import Main from './pages/main';
import Header from './components/common/Header';
import PublicAuction from './pages/PublicAuction';
import Signup from './pages/Auth/Signup';
import Login from './pages/Auth/Login';


function App() {


  return (
    <>
      <BrowserRouter>
        <div className='min-h-screen '>
        <Header />

        <main className='w-full'>
          <Routes>
            <Route path='/' element={<Main/>}></Route>
            <Route path='/auction' element={<div>auction</div>} ></Route>
            <Route path='/public-auction' element={<PublicAuction />}></Route>
          
          {/* 인증 */}
            <Route path='/sign-up' element={<Signup/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            
          </Routes>

        </main>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
