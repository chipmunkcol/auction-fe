import { useQuery } from "@tanstack/react-query";
import { Descriptions } from "antd";
import { useParams } from "react-router";
import { getAuctionDetail } from "../../api/api";
import { 사건상세조회 } from "../../../data/사건상세조회/사건상세조회";

const BaseInfo = () => {
  const { docId } = useParams();
  // console.log("🚀 ~ AuctionDetail ~ docId:", docId);

  const { data, error } = useQuery({
    queryKey: ["auction-detail", docId],
    queryFn: () => getAuctionDetail(docId as string),
    enabled: !!docId, // docId가 있을 때만 실행
  });
  // console.log("🚀 ~ AuctionDetail ~ data:", data);

  if (error) return <div>Error: 뭔가 에러가 났음!</div>;
  if (!data) return <div>데이터가 없습니다</div>;

  const {
    csBaseInfo,
    gdsDspslObjctLst,
    rgltLandLstAll,
    dspslGdsDxdyInfo,
    dstrtDemnInfo,
  } = data;
  const { dlt_rletCsIntrpsLst } = 사건상세조회.data;

  const 소유자 = dlt_rletCsIntrpsLst.filter(
    (v) => v.auctnIntrpsDvsCd === "0001558"
  )[0]?.intrpsNm;
  const 채무자 = dlt_rletCsIntrpsLst.filter(
    (v) => v.auctnIntrpsDvsCd === "0001558"
  )[0]?.intrpsNm;

  const 채권자 = dlt_rletCsIntrpsLst.filter(
    (v) => v.auctnIntrpsDvsCd === "0001527"
  )[0]?.intrpsNm;

  return (
    <Descriptions
      bordered
      title={csBaseInfo.userCsNo}
      extra={`${csBaseInfo.cortOfcNm} ${csBaseInfo.cortAuctnJdbnNm}`}
      size="small"
      labelStyle={{ fontWeight: "bold", backgroundColor: "var(--table-head)" }}
      contentStyle={{ backgroundColor: "var(--card)" }}
    >
      <Descriptions.Item label="소재지" span={"filled"}>
        {gdsDspslObjctLst[0].adongEmdNm} {gdsDspslObjctLst[0].rdnmSggNm}{" "}
        {gdsDspslObjctLst[0].adongEmdNm} {gdsDspslObjctLst[0].rprsLtnoAddr} ,
        {gdsDspslObjctLst[0].bldDtlDts} {gdsDspslObjctLst[0].rdnmRefcAddr}
      </Descriptions.Item>
      <Descriptions.Item label="도로명주소" span={"filled"}>
        {gdsDspslObjctLst[0].userPrintSt}
      </Descriptions.Item>
      <Descriptions.Item label="물건종별">
        {gdsDspslObjctLst[0].sclDspslGdsLstUsgCd === "20104"
          ? "아파트"
          : gdsDspslObjctLst[0].sclDspslGdsLstUsgCd}
      </Descriptions.Item>
      <Descriptions.Item label="사건접수">
        {csBaseInfo.csRcptYmd}
      </Descriptions.Item>
      <Descriptions.Item label="경매구분">{csBaseInfo.csNm}</Descriptions.Item>
      <Descriptions.Item label="대지권">
        {rgltLandLstAll[0][0].rgltRateNmrtVal}㎡
      </Descriptions.Item>
      <Descriptions.Item label="소유자">{소유자}</Descriptions.Item>
      <Descriptions.Item label="감정가">
        {dspslGdsDxdyInfo.aeeEvlAmt}
      </Descriptions.Item>
      <Descriptions.Item label="건물면적">
        {gdsDspslObjctLst[0].pjbBuldList}
      </Descriptions.Item>
      <Descriptions.Item label="채무자">{채무자}</Descriptions.Item>
      <Descriptions.Item label="최저가">
        {dspslGdsDxdyInfo.fstPbancLwsDspslPrc}
      </Descriptions.Item>
      <Descriptions.Item label="배당종기일">
        {dstrtDemnInfo[0].dstrtDemnLstprdYmd}
      </Descriptions.Item>
      <Descriptions.Item label="채권자">{채권자}</Descriptions.Item>
      <Descriptions.Item label="보증금">
        {dspslGdsDxdyInfo.fstPbancLwsDspslPrc * 0.1}
      </Descriptions.Item>
      <Descriptions.Item label="매각조건" span={"filled"}>
        {"?"}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default BaseInfo;
