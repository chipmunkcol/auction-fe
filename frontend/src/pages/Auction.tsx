import { useNavigate } from "react-router";
import { auctionListDummy, type AuctionItem } from "../../data/auctionList";
import type { Auction } from "../types/auction";
import SearchTable from "../components/auction/SearchTable";
import AuctionTable from "../components/auction/AuctionTable";

export default function Auction() {
  const auctionData = auctionListDummy;

  return (
    <div>
      <h1>경매 물건 페이지</h1>
      <Table auctionData={auctionData} />
    </div>
  );
}

const Table: React.FC<{ auctionData: AuctionItem[] }> = ({ auctionData }) => {
  const navigate = useNavigate();

  // 날짜 변환 (20250827 → 2025-08-27)
  const formatDate = (dateStr: string) => {
    return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(
      6,
      8
    )}`;
  };

  // 시간 변환 (1000 → 10:00)
  const formatTime = (timeStr: string) => {
    if (!timeStr) return "";
    return `${timeStr.slice(0, 2)}:${timeStr.slice(2, 4)}`;
  };

  // 숫자 3자리 콤마
  const formatNumber = (numStr: string) => {
    return Number(numStr).toLocaleString();
  };

  // 상태 계산 (입찰당일 / 예정)
  const getStatus = (data: AuctionItem) => {
    const today = new Date();
    const auctionDate = new Date(
      Number(data.maeGiil.slice(0, 4)),
      Number(data.maeGiil.slice(4, 6)) - 1,
      Number(data.maeGiil.slice(6, 8))
    );

    if (
      today.getFullYear() === auctionDate.getFullYear() &&
      today.getMonth() === auctionDate.getMonth() &&
      today.getDate() === auctionDate.getDate()
    ) {
      return "입찰당일";
    } else if (today < auctionDate) {
      return "예정";
    } else {
      return "종료";
    }
  };

  const navigateAuctionDetail = (id: string) => {
    // navigate(`/auction/${id}`) // 절대경로
    navigate(id); // 상대경로
  };

  return (
    <div className="flex flex-col items-center w-[1440px] mx-auto">
      <div className="w-full">
        <SearchTable />
      </div>

      <div className="w-full">
        <AuctionTable />
      </div>
    </div>
  );
};

// <table className="min-w-6xl border border-gray-300 text-sm">
// <thead className="bg-table-head text-table-foreground ">
//   <tr>
//     <th className="border px-4 py-2">사진</th>
//     <th className="border px-4 py-2">
//       매각기일 <br /> 용도
//     </th>
//     <th className="border px-4 py-2">물건기본내역</th>
//     <th className="border px-4 py-2">
//       감정가 <br /> 최저가
//     </th>
//     <th className="border px-4 py-2">상태</th>
//     <th className="border px-4 py-2">경매대행문의</th>
//     <th className="border px-4 py-2">조회</th>
//   </tr>
// </thead>
// <tbody>
//   {auctionData.map((item, idx) => (
//     <tr key={idx} className="hover:bg-gray-50">
//       <td>

//       </td>
//       <td className="border px-4 py-2 text-center">
//         {/* 매각기일 ex) 2025-08-27 */}
//         {formatDate(item.maeGiil)}
//         <br />({/* 매각시간 ex) 10:00 */}{formatTime(item.maeHh1)})
//       </td>
//       <td className="border px-4 py-2 text-center">
//         {/* 용도 ex) 다세대, 아파트, 빌딩 */}[{item.dspslUsgNm}]
//       </td>
//       <td
//         onClick={() => navigateAuctionDetail(item.docid)}
//         className="border px-4 py-2 text-center"
//       >
//         {/* 이미지 - 클릭시 상세페이지 이동 */}
//         <img
//           src="/frontend/public/vite.svg"
//           alt="temp"
//           className="w-full h-full"
//         />
//       </td>
//       <td className="border px-4 py-2 text-center text-red-500 font-semibold">
//         {/* 상태 ex) 입찰당일, 예정, 종료 */}
//         {getStatus(item)}
//       </td>
//       <td className="border px-4 py-2 text-center">
//         {/* 지원명 + 부서명 ex) 서울중앙지방법원 경매과 */}
//         {item.jiwonNm} {item.jpDeptNm}
//         <br />
//         {/* 사건번호 ex) 2024-123456 */}
//         {item.srnSaNo}
//       </td>
//       <td className="border px-4 py-2">
//         {/* 주소 ex) 서울특별시 강남구 테헤란로 123 */}
//         {item.printSt}
//       </td>
//       <td className="border px-4 py-2">
//         {/* 비고 ex) 권리분석 필요, 점유자 있음 */}
//         {item.mulBigo}
//       </td>
//       <td className="border px-4 py-2">
//         {/* 면적 ex) 84.5㎡ */}
//         {item.pjbBuldList}
//       </td>
//       <td className="border px-4 py-2 text-right">
//         {/* 감정가 ex) 500,000,000원 */}
//         {formatNumber(item.gamevalAmt)}원
//       </td>
//       <td className="border px-4 py-2 text-right">
//         {/* 최저가 ex) 400,000,000원 */}
//         {formatNumber(item.notifyMinmaePrice1)}원
//         <br />({/* 최저가 비율 ex) 80% */}{item.notifyMinmaePriceRate1}%)
//       </td>
//       <td className="border px-4 py-2 text-center">
//         {/* 유찰 횟수 ex) 2회 */}
//         {item.yuchalCnt}회
//       </td>
//     </tr>
//   ))}
// </tbody>
// </table>
