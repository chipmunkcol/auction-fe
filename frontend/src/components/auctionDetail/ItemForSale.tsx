import { Table } from "antd";
import type { TableProps } from "antd/lib";
import { 부동산표시목록 } from "../../../data/auctionDetail/부동산표시목록";
import type { OrdTsCurstExmnRgltLandLst } from "../../../data/types/auction";
import { auctionDetail } from "../../../data/auctionDetail/auctionDetail";

const ItemForSale = () => {
  const { dlt_ordTsCurstExmnRgltLandLst, dlt_ordTsCurstExmnRletLst } =
    부동산표시목록.data;
  const { aeeWevlMnpntLst } = auctionDetail.data.dma_result;

  const 건물의구조 = aeeWevlMnpntLst.find((v) => v.aeeWevlMnpntDtlSeq === 3);
  const [, 층수, 사용승인일] = (건물의구조?.aeeWevlMnpntCtt ?? "").split("\n");

  const {
    rletDvsDts,
    rgltLandEmdNm,
    rgltLandLtnoAddr,
    landArDts,
    rgltRateNmrtVal,
  } = dlt_ordTsCurstExmnRgltLandLst[0] as OrdTsCurstExmnRgltLandLst;

  const dataSource = [
    {
      rletDvsDts: rletDvsDts === "전유" ? "대지권" : "",
      rletIndctDts: `${rgltLandEmdNm} ${rgltLandLtnoAddr}`,
      landArDts: landArDts,
      rgltRateNmrtVal: rgltRateNmrtVal,
    },
    {
      rletDvsDts: rletDvsDts === "전유" ? "건물" : "",
      rletIndctDts: dlt_ordTsCurstExmnRletLst[0].bldDtlDts,
      landArDts: `${층수} / ${사용승인일}`,
      rgltRateNmrtVal: "",
    },
  ];

  const columns: TableProps<OrdTsCurstExmnRgltLandLst>["columns"] = [
    {
      title: "구분",
      key: "구분", // rletDvsDts
      dataIndex: "rletDvsDts",
    },
    {
      title: "소재지",
      key: "소재지", // rletIndctDts
      dataIndex: "rletIndctDts",
    },
    {
      title: "용도/구조/면적 등",
      key: "용도/구조/면적 등", // landArDts, rgltRateNmrtVal, landLdcgDts
      render: (_, record) => (
        <div>{`${record.landArDts} 중 ${record.rgltRateNmrtVal}㎡`}</div>
      ),
    },
    {
      title: "감정가(원)",
      key: "감정가(원)",
      render: () => <div>감정평가서 내용</div>,
      onCell: () => ({
        style: { backgroundColor: "pink" },
      }),
    },
    {
      title: "비고",
      key: "비고",
    },
  ];

  return (
    <div>
      <h1>매각물건현황황</h1>
      <div>
        <Table
          title={() => (
            <h2>
              {"["}매각물건현황{"]"}
            </h2>
          )}
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

export default ItemForSale;
