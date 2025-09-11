import { Table, type TableProps } from "antd";
import { 현황조사서 } from "../../../data/auctionDetail/현황조사서";
import type {
  InspectionReportData,
  OrdTsLserLtn,
} from "../../../data/types/auction";
import { auctionDetail } from "../../../data/auctionDetail/auctionDetail";

const Tenant = () => {
  const { rgltLandLstAll } = auctionDetail.data.dma_result;
  const { dlt_ordTsLserLtn, dlt_ordTsRlet } = 현황조사서.data;
  dlt_ordTsLserLtn[0].intrpsNm; // 임차인
  dlt_ordTsLserLtn[0].auctnLesUsgCd; // 01: 주거용, 02: 상업용
  dlt_ordTsRlet[0].lesPartCtt; // 점유현황
  dlt_ordTsLserLtn[0].mvinDtlCtt; // 전입일자

  dlt_ordTsLserLtn[0].lesDposDts; // 보증금
  dlt_ordTsLserLtn[0].mmrntAmtDts; // 월세

  const 물건번호 = rgltLandLstAll[0][0].dspslObjctSeq;

  const dataSource = dlt_ordTsLserLtn
    .filter((item) => item.objctSeq === 물건번호)
    .map((item, index) => ({
      key: index,
      임차인: item.intrpsNm,
      점유현황: `${item.auctnLesUsgCd}(01 이면 주거용)  ${item?.lesPartCtt}`,
      전입확정배당: `전입: ${item.mvinDtlCtt} / 확정: ? / 배당: ? `,
      보증금월세환산보증금: `보증금: ? / 월세: ${item.lesDposDts} / 환산보증금: ?`,
      예상배당액예상인수액: `?`,
      대항력: "?",
    }));

  const columns: TableProps["columns"] = [
    {
      title: "임차인",
      dataIndex: "임차인",
    },
    {
      title: "점유현황",
      dataIndex: "점유현황",
    },
    {
      title: "전입/확정/배당",
      dataIndex: "전입확정배당",
    },
    {
      title: "보증금/월세/환산보증금",
      dataIndex: "보증금월세환산보증금",
    },
    {
      title: "예상배당액 예상인수액",
      dataIndex: "예상배당액예상인수액",
    },
    {
      title: "대항력",
      dataIndex: "대항력",
    },
  ];

  return (
    <div>
      <Table
        title={() => (
          <div className="flex justify-between">
            <h2 className="text-xl">임차인 현황</h2>
            <div>말소기준권리: , 배당요구종기</div>
          </div>
        )}
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        bordered
      />
    </div>
  );
};

export default Tenant;
