import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import ButtonComponet from "./components/common/ButtonComponet";
import DescTableCompeont from "./components/common/DescTableCompeont";
import Header from "./components/common/Header";
import InputComponent from "./components/common/InputComponent.js";
import TableComponent from "./components/common/TableComponent";
import { ThemeContext } from "./hooks/ThemeContext.js";
import Dashboard from "./pages/admin/Dashboard";
import Auction from "./pages/Auction";
import AuctionDetail from "./pages/AuctionDetail";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Main from "./pages/Main";
import PublicAuction from "./pages/PublicAuction";

function App() {
  // 로그인 시 유저 정보 저장 및 admin 판단
  const isAdmin = true;

  const { toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Header />
          <div>
            <button className="text-foreground" onClick={toggleTheme}>
              테마 토글
            </button>
          </div>
          <main className="w-full">
            <Routes>
              <Route path="/" element={<Main />}></Route>
              <Route path="/auction" element={<Auction />}></Route>
              <Route path="/auction/:docId" element={<AuctionDetail />}></Route>

              <Route path="/public-auction" element={<PublicAuction />}></Route>

              {/* 인증 */}
              <Route path="/sign-up" element={<Signup />}></Route>
              <Route path="/login" element={<Login />}></Route>

              {/* 관리자 모드 */}
              {isAdmin && <Route path="/admin" element={<Dashboard />} />}

              {/* 공통 컴포넌트 */}
              <Route
                path="/test"
                element={
                  <>
                    <InputComponent />
                    <ButtonComponet />
                    <DescTableCompeont />
                    <TableComponent />
                  </>
                }
              ></Route>
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
