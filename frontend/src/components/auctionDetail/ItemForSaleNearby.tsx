import { Table, type TableProps } from "antd";
import type { 인근매각물건타입 } from "../../../data/types/auction";
import { 인근매각물건 } from "../../../data/auctionDetail/인근매각물건";

const ItemForSaleNearby = () => {
  const columns: TableProps<인근매각물건타입>["columns"] = [
    {
      title: (
        <div>
          매각일자 <br /> 사건번호
        </div>
      ),
      key: "매각일자 사건번호",
      render: (_, record) => {
        const { maeGiil, jpDeptNm, saNo, maemulSer } = record;
        const formattedDate = `${maeGiil.slice(0, 4)}-${maeGiil.slice(
          4,
          6
        )}-${maeGiil.slice(6, 8)}`;
        return `${formattedDate} ${jpDeptNm} ${saNo}(${maemulSer})`;
      },
    },
    {
      title: "물건기본내역",
      key: "물건기본내역",
      render: (_, record) => {
        const { printSt } = record;
        return printSt;
      },
    },
    {
      title: "감정가 최저가",
      key: "감정가 최저가",
      render: (_, record) => {
        const { gamevalAmt, minmaePrice, notifyMinmaePriceRate1 } = record;
        const formattedAppraisedValue = Number(gamevalAmt).toLocaleString();
        const formattedMinPrice = Number(minmaePrice).toLocaleString();
        return `${formattedAppraisedValue} ${formattedMinPrice} (${notifyMinmaePriceRate1}%)`;
      },
    },
    {
      title: "매각금액",
      key: "매각금액",
      render: (_, record) => {
        const { maeAmt, gamevalAmt } = record;
        if (maeAmt && maeAmt !== "0" && gamevalAmt && gamevalAmt !== "0") {
          const formattedSaleAmount = Number(maeAmt).toLocaleString();
          const saleRate = (
            (Number(maeAmt) / Number(gamevalAmt)) *
            100
          ).toFixed(0);
          return `${formattedSaleAmount} (${saleRate}%)`;
        }
        return "미정";
      },
    },
  ];

  const dataSource: 인근매각물건타입[] = 인근매각물건.data.result;
  return (
    <div>
      <h1>인근 매각물건</h1>
      <div>
        <Table
          title={() => <h2 className="text-xl">인근 매각물건</h2>}
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

export default ItemForSaleNearby;

// 인근매각물건 Display 필드 매핑
// 1. 매각일자 (Sale Date)

// Key: maeGiil
// Value: "20250828" → "2025-08-28"
// 포맷: YYYYMMDD → YYYY-MM-DD

// 2. 사건번호 (Case Number)

// Key: jpDeptNm + saNo + maemulSer
// Value:

// 담당계: jpDeptNm → "경매12계"
// 사건번호: saNo → "2024-123910"
// 물건번호: maemulSer → "(1)"

// 조합: "경매12계" + "2024-123910" + "(1)"

// 3. 물건기본내역 (Property Details)

// Key: printSt
// Value: "서울특별시 관악구 복은7길 26, 2층201호 (신림동,팔로스26)"
// 참고: printSt 필드에 전체 주소 정보가 포함됨

// 4. 면적 정보 (Area Information)

// Key: pjbBuldList 또는 areaList
// Value: "철근콘크리트구조 24.16㎡" → "24.16㎡ (7.31평) | 20.53㎡ (6.21평)"
// 참고:

// 전용면적과 공용면적이 별도로 제공될 수 있음
// 평수 계산: ㎡ ÷ 3.3058

// 5. 감정가 (Appraised Value)

// Key: gamevalAmt
// Value: "271000000" → "271,000,000"
// 포맷: 숫자에 천단위 콤마 추가

// 6. 최저가 (Minimum Price)

// Key: minmaePrice + notifyMinmaePriceRate1
// Value:

// 최저가: "173440000" → "173,440,000"
// 최저가율: "64" → "(64%)"

// 조합: "173,440,000 (64%)"

// 7. 매각금액 (Sale Amount)

// Key: maeAmt + 매각률 계산
// Value:

// 매각금액: "213063500" → "213,063,500"
// 매각률: 매각금액/감정가*100 → "(79%)"

// 조합: "213,063,500(79%)"
