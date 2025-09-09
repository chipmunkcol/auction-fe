import { userDummy } from "../../../data/user/userData";

export default function Dashboard() {
  const users = userDummy;
  // 가입된 회원 display
  // 회원 관리 (아이디/ 이름/ 휴대폰 번호/ 이메일/ 마지막 로그인/ 등록일자)
  //  -> 상세보기 (결제 내역/ 관심 물건)
  // 결제 관리 (결제상품/ 결제금액/ 결제일/ 만료일)

  // 자동 생성 가능해?
  // 간단한 handler 함수 작성해줘

  return (
    <div>
      <h1>관리자 페이지</h1>
      <div>
        <table>
          <thead>
            <tr>
              {[
                "회원사",
                "회원권한",
                "아이디",
                "회원명",
                "휴대폰번호",
                "이메일",
              ].map((val) => (
                <th>{val}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr>
                <td>{user.회원사}</td>
                <td>{user.회원권한}</td>
                <td>{user.아이디}</td>
                <td>{user.회원명}</td>
                <td>{user.휴대폰번호}</td>
                <td>{user.이메일}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
