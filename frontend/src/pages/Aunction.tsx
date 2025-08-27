import { auctionListDummy, type AuctionItem } from './../../data/auctionList';



// 매각기일 maeGiil (maeHh1)
// 용도 dspslUsgNm

// 물건기본내역 
// 1 printCsNo
// 2 hjguSido / hjguSigu / hjguDong / hjguRd / daepyoLotno / buldNm
// 3
// 4 

// 감정가 gamevalAmt
// 최저가 notifyMinmaePrice1 ~ notifyMinmaePrice4 중 0이 아닌 작은 수

// 상태 yuchalCnt (notifyMinmaePriceRate1)

export default function Auction() {
  const auctionData = auctionListDummy;

  return (
    <div>
      <h1>경매 물건 페이지</h1>
      <AuctionTable auctionData={auctionData} />
      
    </div>
  )
}

const AuctionTable: React.FC<{ auctionData: AuctionItem[] }> = ({ auctionData }) => {
  // 날짜 변환 (20250827 → 2025-08-27)
  const formatDate = (dateStr: string) => {
    return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;
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

  return (
    <table className="min-w-full border border-gray-300 text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-4 py-2">매각기일</th>
          <th className="border px-4 py-2">용도</th>
          <th className="border px-4 py-2">상태</th>
          <th className="border px-4 py-2">사건번호</th>
          <th className="border px-4 py-2">주소</th>
          <th className="border px-4 py-2">비고</th>
          <th className="border px-4 py-2">면적</th>
          <th className="border px-4 py-2">감정가</th>
          <th className="border px-4 py-2">최저가</th>
          <th className="border px-4 py-2">유찰</th>
        </tr>
      </thead>
      <tbody>
        {auctionData.map((item, idx) => (
          <tr key={idx} className="hover:bg-gray-50">
            <td className="border px-4 py-2 text-center">
              {formatDate(item.maeGiil)}
              <br />
              ({formatTime(item.maeHh1)})
            </td>
            <td className="border px-4 py-2 text-center">
              [{item.dspslUsgNm}]
            </td>
            <td className="border px-4 py-2 text-center text-red-500 font-semibold">
              {getStatus(item)}
            </td>
            <td className="border px-4 py-2 text-center">
              {item.jiwonNm} {item.jpDeptNm}
              <br />
              {item.srnSaNo}
            </td>
            <td className="border px-4 py-2">{item.printSt}</td>
            <td className="border px-4 py-2">{item.mulBigo}</td>
            <td className="border px-4 py-2">{item.pjbBuldList}</td>
            <td className="border px-4 py-2 text-right">
              {formatNumber(item.gamevalAmt)}원
            </td>
            <td className="border px-4 py-2 text-right">
              {formatNumber(item.notifyMinmaePrice1)}원
              <br />({item.notifyMinmaePriceRate1}%)
            </td>
            <td className="border px-4 py-2 text-center">{item.yuchalCnt}회</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
