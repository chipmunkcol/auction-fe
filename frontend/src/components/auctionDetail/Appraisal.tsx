import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAuctionDetail from "../../hooks/useAuctionDetail";
import type { AeeWevlMnpnt } from "../../../data/types/auction";

// 감정평가
const Appraisal = () => {
  const { docId } = useParams();
  const { data, error } = useAuctionDetail({ docId });
  if (!docId) return <div>잘못된 경로입니다</div>;
  if (error) return <div>Error: 뭔가 에러가 났음!</div>;
  if (!data) return <div>데이터가 없습니다</div>;

  const { aeeWevlMnpntLst } = data;

  const itemCodeToTitle = {
    "00083001": "위치 및 주위환경",
    "00083003": "교통상황",
    "00083015": "건물의 구조",
    "00083006": "이용상태",
    "00083017": "설비내역",
    "00083009": "토지의 형상 및 이용상태",
    "00083005": "인접 도로상태등",
    "00083011": "토지이용계획 및 제한상태",
    "00083014": "공부와의 차이",
    "00083026": "기타참고사항(임대관례 및 기타)",
  };

  const formattedData = aeeWevlMnpntLst.map((item) => {
    const title =
      itemCodeToTitle[item.aeeWevlMnpntItmCd as keyof typeof itemCodeToTitle] ||
      "기타";
    const content = item.aeeWevlMnpntCtt;
    return { title, content };
  });

  // const formatedData = (data: AeeWevlMnpnt[]) => {
  //   return data.map((item) => {
  //     const title = itemCodeToTitle[item.aeeWevlMnpntItmCd as keyof typeof itemCodeToTitle] || "기타";
  //     const content = item.aeeWevlMnpntCtt
  //     return { title, content}
  //   })
  // }

  // 최소화하기

  return (
    <div>
      <h1>감정평가 요항</h1>
      <div className="border border-border p-2 h-[150px] overflow-y-auto">
        {formattedData.map((item, index) => (
          <div key={`감정평가요항-${index}`} className="mb-4">
            <h3 className="font-bold mb-1">
              {index + 1}
              {")"} {item.title}
            </h3>
            <p style={{ whiteSpace: "pre-wrap" }}>{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appraisal;
