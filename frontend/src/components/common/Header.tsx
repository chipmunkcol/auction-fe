import { useNavigate } from "react-router";

export default function Header() {
  const navigate = useNavigate();

  // 로그인 시 유저 정보 저장 및 admin 판단
  const isAdmin = true;

  const routes = [
    { path: "/auction", label: "경매" },
    { path: "/public-auction", label: "공매" },
    { path: "/login", label: "로그인" },
    { path: "/sign-up", label: "회원가입" },
    { path: "/test", label: "테스트" },
  ];

  return (
    <header className="w-full p-6">
      <div className="flex gap-10">
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          Logo
        </div>
        <ul className="flex gap-5">
          {routes.map((route) => (
            <div
              key={`routes-${route.label}`}
              className="cursor-pointer"
              onClick={() => navigate(route.path)}
            >
              <span>{route.label}</span>
            </div>
          ))}

          {isAdmin && (
            <div className="cursor-pointer" onClick={() => navigate("/admin")}>
              <span>관리자 페이지</span>
            </div>
          )}
        </ul>
      </div>
    </header>
  );
}
