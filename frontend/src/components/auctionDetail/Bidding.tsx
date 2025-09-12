import { Table, type TableProps } from "antd";
import { 기일내역 } from "../../../data/auctionDetail/사건상세조회/기일내역";
import type { DspslGdsInfo } from "../../../data/types/auction";

const Bidding = () => {
  const 기일Data: DspslGdsInfo[] = 기일내역.data.dlt_dxdyDtsLst;

  const columns: TableProps<DspslGdsInfo>["columns"] = [
    // {
    //   title: "구분",
    //   key: "구분",
    //   dataIndex: 'dxdyRslt'
    //   render: (value, _, index) => {
    //     if (index === 0) return <div>신건</div>
    //     return <div>{value === '변경' ? "" : value === ''  }</div>
    //   },
    //   onCell: () => ({
    //     style: { backgroundColor: "var(--table-head)" },
    //   }),
    // },
    {
      title: "입찰기일",
      key: "입찰기일",
      dataIndex: "dxdyTime",
      render: (text) => <div>{text.split("(")?.[0]}</div>,
    },
    {
      title: "최저매각가격",
      key: "최저매각가격",
      dataIndex: "tsLwsDspslPrc",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "결과",
      key: "결과",
      dataIndex: "dxdyRslt",
      render: (text) => <div>{text ? text : "예정"}</div>,
    },
  ];

  return (
    <div className="flex ">
      <div className="flex-2 p-2 border-r border-border">이미지</div>
      <div className="flex-1 p-2">
        <Table
          title={() => (
            <h2>
              {"["}입찰진행내용{"]"}
            </h2>
          )}
          bordered
          size="small"
          pagination={false}
          columns={columns}
          dataSource={기일Data}
        />
      </div>
    </div>
  );
};

export default Bidding;
