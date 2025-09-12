import { Table, type TableProps } from "antd";
import type { 인근진행물건타입 } from "../../../data/types/auction";
import { 인근진행물건 } from "../../../data/auctionDetail/인근진행물건";

const ItemProgressNearby = () => {
  const columns: TableProps<인근진행물건타입>["columns"] = [
    {
      title: "구분",
      key: "구분",
      render: (_, record) => {
        const statusMap: Record<string, string> = {
          "0002100001": "진행",
          "0002100002": "종료",
          "0002100003": "취하",
          "0002100004": "연기",
          "0002100005": "중지",
          "0002100006": "재개",
        };
        return <span>{statusMap[record.jinstatCd] || "알수없음"}</span>;
      },
    },
    {
      title: "사건번호",
      key: "사건번호",
      render: (_, record) => {
        const jpDeptMap: Record<string, string> = {
          "1001": "서울중앙1",
          "1002": "서울중앙2",
          "1003": "서울중앙3",
          "1004": "서울중앙4",
          "1005": "서울중앙5",
          "1006": "서울중앙6",
          "1007": "서울중앙7",
          "1008": "서울중앙8",
          "1009": "서울중앙9",
          "1010": "서울중앙10",
          "1011": "서울남부1",
          "1012": "서울남부2",
          "1013": "서울남부3",
          "1014": "서울남부4",
          "1015": "서울북부1",
          "1016": "서울북부2",
          "1017": "서울북부3",
          "1018": "서울동부1",
          "1019": "서울동부2",
          "1020": "서울동부3",
          "1021": "서울서부1",
          "1022": "서울서부2",
          "1023": "서울서부3",
        };
        const jpDept = jpDeptMap[record.jpDeptCd] || "알수없음";
        return (
          <span>
            {`${jpDept} ${record.srnSaNo}${
              record.maemulSer ? `(${record.maemulSer})` : ""
            }`}
          </span>
        );
      },
    },
    {
      title: "인근물건",
      key: "인근물건",
      render: (_, record) => (
        <span>{`${record.printSt} [${record.dspslUsgNm}]`}</span>
      ),
    },
    {
      title: "입찰일",
      key: "입찰일",
      render: (_, record) => {
        const dateStr = record.maeGiil;
        if (dateStr.length === 8) {
          return (
            <span>{`${dateStr.slice(0, 4)}-${dateStr.slice(
              4,
              6
            )}-${dateStr.slice(6, 8)}`}</span>
          );
        }
        return <span>알수없음</span>;
      },
    },
    {
      title: "감정가",
      key: "감정가",
      render: (_, record) => {
        const formattedValue = Number(record.gamevalAmt).toLocaleString();
        return <span>{formattedValue}</span>;
      },
    },
    {
      title: "최저가",
      key: "최저가",
      render: (_, record) => {
        const minPrice =
          record.notifyMinmaePrice1 && record.notifyMinmaePrice1 !== "0"
            ? record.notifyMinmaePrice1
            : record.minmaePrice;
        const formattedValue = Number(minPrice).toLocaleString();
        return <span>{formattedValue}</span>;
      },
    },
  ];

  const dataSource: 인근진행물건타입[] = 인근진행물건.data.result;

  return (
    <div>
      {/* <h1>인근 경·공매 물건</h1> */}
      <div>
        <Table
          title={() => <h2 className="text-xl">인근 경·공매 물건</h2>}
          bordered
          size="small"
          pagination={false}
          columns={columns}
          dataSource={dataSource}
        />
      </div>
    </div>
  );
};

export default ItemProgressNearby;

// 1. 구분 (Status)

// Key: jinstatCd 또는 mulStatcd
// Value: "0002100001" → "진행"
// 참고: 상태코드를 한글로 변환하여 표시

// 2. 사건번호 (Case Number)

// Key: srnSaNo + maemulSer
// Value: "2024타경114268" + "(1)" → "서울중앙3 2024-114268(1)"
// 구성요소:

// jpDeptNm: "경매3계" → "서울중앙3"
// srnSaNo: "2024타경114268"
// maemulSer: "1" → "(1)"

// 3. 인근물건 (Property Info)

// Key: printSt + dspslUsgNm
// Value:

// 주소: printSt → "서울특별시 관악구 난곡로26나길 30 301동 2층201호 (신림동,씨지아름채)"
// 용도: dspslUsgNm → "다세대" → "[도시형생활주택]"

// 4. 입찰일 (Auction Date)

// Key: maeGiil
// Value: "20250916" → "2025-09-16"
// 포맷: YYYYMMDD → YYYY-MM-DD

// 5. 감정가 (Appraised Value)

// Key: gamevalAmt
// Value: "268000000" → "268,000,000"
// 포맷: 숫자에 천단위 콤마 추가

// 6. 최저가 (Minimum Price)

// Key: notifyMinmaePrice1 또는 minmaePrice
// Value: "109773000" → "109,773,000"
// 참고:

// 현재 회차 최저가는 notifyMinmaePrice1
// 전체 최저가는 minmaePrice 사용 가능
