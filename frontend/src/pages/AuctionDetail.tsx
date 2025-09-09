// 디테일 페이지 각각 개별 api 호출
import { useQuery } from "@tanstack/react-query";
import { auctionDetail } from "../../data/auctionDetail/auctionDetail";
import { useParams } from "react-router";
import { getAuctionDetail } from "../api/api";

export default function AuctionDetail() {
  const { docId } = useParams();
  console.log("🚀 ~ AuctionDetail ~ docId:", docId);

  const { data, error } = useQuery({
    queryKey: ["auction-detail", docId],
    queryFn: () => getAuctionDetail(docId as string),
    enabled: !!docId, // docId가 있을 때만 실행
  });
  console.log("🚀 ~ AuctionDetail ~ data:", data);

  if (error) return <div>Error: 뭔가 에러가 났음!</div>;
  if (!data) return <div>데이터가 없습니다</div>;

  // 소재지 adongSdNm adongSggNm adongEmdNm rprsLtnoAddr,
  // 도로명주소
  // 물건종별
  // 사건접수
  // 경매구분
  // 대지권
  // 소유자
  // 감정가
  // 건물면적
  // 채무자
  // 최저가
  // 배동종기일
  // 채권자
  // 보증금
  // 매각조건건

  const {} = data;

  return <div></div>;
}
// const csBaseInfo = auctionData.csBaseInfo;
//   const dspslGdsInfo = auctionData.dspslGdsDxdyInfo;
//   const objctLst = auctionData.gdsDspslObjctLst?.[0] || {};
//   const dstrtDemn = auctionData.dstrtDemnInfo?.[0] || {};

//   // 하드코딩된 값들로 대체
//   const auctionDate = "20250904";
//   const auctionTime = "1000";

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-card rounded-lg shadow-md">
//       {/* Header Section */}
//       <div className="mb-6 p-4 bg-primary text-primary-foreground rounded-lg text-lg font-semibold">
//         {csBaseInfo.userCsNo} {csBaseInfo.cortOfcNm}{" "}
//         {csBaseInfo.cortAuctnJdbnNm}({csBaseInfo.jdbnTelno}) 매각기일{" "}
//         {auctionDate?.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")}(
//         {auctionTime?.replace(/(\d{2})(\d{2})/, "$1:$2")})
//       </div>

//       {/* Address Table */}
//       <table className="w-full mb-6 bg-table border border-border rounded-lg overflow-hidden">
//         <tbody>
//           <tr className="border-b border-border">
//             <td className="px-4 py-3 bg-table-head text-table-head-foreground font-medium w-1/4">
//               소재지:
//             </td>
//             <td className="px-4 py-3 text-table-foreground">
//               {objctLst.adongSdNm} {objctLst.adongSggNm} {objctLst.adongEmdNm}{" "}
//               {objctLst.rprsLtnoAddr} {objctLst.bldNm || ""}{" "}
//               {dspslGdsInfo.bldDtlDts}
//             </td>
//           </tr>
//           <tr className="border-b border-border">
//             <td className="px-4 py-3 bg-table-head text-table-head-foreground font-medium w-1/4">
//               도로명 주소:
//             </td>
//             <td className="px-4 py-3 text-table-foreground">
//               {dspslGdsInfo.storgPlcRdnmAddr?.replace("00014-00000", "14")}{" "}
//               {dspslGdsInfo.bldDtlDts}
//             </td>
//           </tr>

//           {/*  */}
//           <tr className="border-b border-border">
//             <td className="px-3 py-3 bg-table-head text-table-head-foreground font-medium text-center">
//               물건종별
//             </td>
//             <td className="px-3 py-3 text-table-foreground text-center">
//               다세대(빌라)
//             </td>
//             <td className="px-3 py-3 bg-table-head text-table-head-foreground font-medium text-center">
//               사건접수
//             </td>
//             <td className="px-3 py-3 text-table-foreground text-center">
//               {csBaseInfo.csRcptYmd?.replace(
//                 /(\d{4})(\d{2})(\d{2})/,
//                 "$1.$2.$3"
//               )}
//             </td>
//             <td className="px-3 py-3 bg-table-head text-table-head-foreground font-medium text-center">
//               경매구분
//             </td>
//             <td className="px-3 py-3 text-table-foreground text-center">
//               {csBaseInfo.csNm}
//             </td>
//           </tr>
//           <tr className="border-b border-border">
//             <td className="px-3 py-3 bg-table-head text-table-head-foreground font-medium text-center">
//               대지권
//             </td>
//             <td className="px-3 py-3 text-table-foreground text-center">
//               {objctLst.pjbBuldList
//                 ? `${objctLst.pjbBuldList.split("\r\n")[1]} (${(
//                     parseFloat(objctLst.pjbBuldList.split("\r\n")[1]) / 3.3058
//                   ).toFixed(2)}평)`
//                 : "77.08㎡ (23.32평)"}
//             </td>
//             <td className="px-3 py-3 bg-table-head text-table-head-foreground font-medium text-center">
//               소 유 자
//             </td>
//             <td className="px-3 py-3 text-table-foreground text-center">-</td>
//             <td className="px-3 py-3 bg-table-head text-table-head-foreground font-medium text-center">
//               감 정 가
//             </td>
//             <td className="px-3 py-3 text-table-foreground text-center">
//               {objctLst.aeeEvlAmt?.toLocaleString()}
//             </td>
//           </tr>
//           <tr className="border-b border-border">
//             <td className="px-3 py-3 bg-table-head text-table-head-foreground font-medium text-center">
//               건물면적
//             </td>
//             <td className="px-3 py-3 text-table-foreground text-center">
//               {objctLst.pjbBuldList
//                 ? `${objctLst.pjbBuldList.split("\r\n")[2]} (${(
//                     parseFloat(objctLst.pjbBuldList.split("\r\n")[2]) / 3.3058
//                   ).toFixed(2)}평)`
//                 : "115.8㎡ (35.03평)"}
//             </td>
//             <td className="px-3 py-3 bg-table-head text-table-head-foreground font-medium text-center">
//               채 무 자
//             </td>
//             <td className="px-3 py-3 text-table-foreground text-center">-</td>
//             <td className="px-3 py-3 bg-table-head text-table-head-foreground font-medium text-center">
//               최 저 가
//             </td>
//             <td className="px-3 py-3 text-table-foreground text-center">
//               398,080,000
//             </td>
//           </tr>
//           <tr>
//             <td className="px-3 py-3 bg-table-head text-table-head-foreground font-medium text-center">
//               배당종기일
//             </td>
//             <td className="px-3 py-3 text-table-foreground text-center">
//               {dstrtDemn.dstrtDemnLstprdYmd?.replace(
//                 /(\d{4})(\d{2})(\d{2})/,
//                 "$1-$2-$3"
//               ) || "2022-06-30"}
//             </td>
//             <td className="px-3 py-3 bg-table-head text-table-head-foreground font-medium text-center">
//               채 권 자
//             </td>
//             <td className="px-3 py-3 text-table-foreground text-center">
//               ㈜디비저축은행
//             </td>
//             <td className="px-3 py-3 bg-table-head text-table-head-foreground font-medium text-center">
//               보 증 금
//             </td>
//             <td className="px-3 py-3 text-table-foreground text-center">
//               (10%) 39,808,000
//             </td>
//           </tr>
//         </tbody>
//       </table>

//       {/* Property Details Table */}
//       <tbody></tbody>

//       {/* Property Details Table */}
//       <table className="w-full mb-6 bg-table border border-border rounded-lg overflow-hidden">
//         <tbody>
//           <tr className="border-b border-border">
//             <td className="px-3 py-3 bg-table-head text-table-head-foreground font-medium text-center">
//               물건종별
//             </td>
//             <td className="px-3 py-3 text-table-foreground text-center">
//               다세대(빌라)
//             </td>
//             <td className="px-3 py-3 bg-table-head text-table-head-foreground font-medium text-center">
//               사건접수
//             </td>
//             <td className="px-3 py-3 text-table-foreground text-center">
//               {csBaseInfo.csRcptYmd?.replace(
//                 /(\d{4})(\d{2})(\d{2})/,
//                 "$1.$2.$3"
//               )}
//             </td>
//             <td className="px-3 py-3 bg-table-head text-table-head-foreground font-medium text-center">
//               경매구분
//             </td>
//             <td className="px-3 py-3 text-table-foreground text-center">
//               {csBaseInfo.csNm}
//             </td>
//           </tr>
//           <tr className="border-b border-border">
//             <td className="px-3 py-3 bg-table-head text-table-head-foreground font-medium text-center">
//               대지권
//             </td>
//             <td className="px-3 py-3 text-table-foreground text-center">
//               {objctLst.pjbBuldList
//                 ? `${objctLst.pjbBuldList.split("\r\n")[1]} (${(
//                     parseFloat(objctLst.pjbBuldList.split("\r\n")[1]) / 3.3058
//                   ).toFixed(2)}평)`
//                 : "77.08㎡ (23.32평)"}
//             </td>
//             <td className="px-3 py-3 bg-table-head text-table-head-foreground font-medium text-center">
//               소 유 자
//             </td>
//             <td className="px-3 py-3 text-table-foreground text-center">-</td>
//             <td className="px-3 py-3 bg-table-head text-table-head-foreground font-medium text-center">
//               감 정 가
//             </td>
//             <td className="px-3 py-3 text-table-foreground text-center">
//               {objctLst.aeeEvlAmt?.toLocaleString()}
//             </td>
//           </tr>
//           <tr className="border-b border-border">
//             <td className="px-3 py-3 bg-table-head text-table-head-foreground font-medium text-center">
//               건물면적
//             </td>
//             <td className="px-3 py-3 text-table-foreground text-center">
//               {objctLst.pjbBuldList
//                 ? `${objctLst.pjbBuldList.split("\r\n")[2]} (${(
//                     parseFloat(objctLst.pjbBuldList.split("\r\n")[2]) / 3.3058
//                   ).toFixed(2)}평)`
//                 : "115.8㎡ (35.03평)"}
//             </td>
//             <td className="px-3 py-3 bg-table-head text-table-head-foreground font-medium text-center">
//               채 무 자
//             </td>
//             <td className="px-3 py-3 text-table-foreground text-center">-</td>
//             <td className="px-3 py-3 bg-table-head text-table-head-foreground font-medium text-center">
//               최 저 가
//             </td>
//             <td className="px-3 py-3 text-table-foreground text-center">
//               398,080,000
//             </td>
//           </tr>
//           <tr>
//             <td className="px-3 py-3 bg-table-head text-table-head-foreground font-medium text-center">
//               배당종기일
//             </td>
//             <td className="px-3 py-3 text-table-foreground text-center">
//               {dstrtDemn.dstrtDemnLstprdYmd?.replace(
//                 /(\d{4})(\d{2})(\d{2})/,
//                 "$1-$2-$3"
//               ) || "2022-06-30"}
//             </td>
//             <td className="px-3 py-3 bg-table-head text-table-head-foreground font-medium text-center">
//               채 권 자
//             </td>
//             <td className="px-3 py-3 text-table-foreground text-center">
//               ㈜디비저축은행
//             </td>
//             <td className="px-3 py-3 bg-table-head text-table-head-foreground font-medium text-center">
//               보 증 금
//             </td>
//             <td className="px-3 py-3 text-table-foreground text-center">
//               (10%) 39,808,000
//             </td>
//           </tr>
//         </tbody>
//       </table>

//       {/* Sale Conditions */}
//       <div className="p-4 bg-muted rounded-lg border-l-4 border-accent">
//         <span className="font-semibold text-foreground">물건 특기사항:</span>
//         <div className="ml-2 text-muted-foreground mt-2 text-sm leading-relaxed whitespace-pre-line">
//           {dspslGdsInfo.gdsSpcfcRmk}
//         </div>
//       </div>
//     </div>
