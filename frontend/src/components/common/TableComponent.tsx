import type { TableProps } from "antd";
import { Table } from "antd";
import React from "react";
import { auctionDetail } from "../../../data/auctionDetail/auctionDetail";

const { gdsDspslDxdyLst } = auctionDetail.data.dma_result;

const 기일종류: Record<string, string> = {
  "01": "매각기일",
  "02": "매각결정기일",
};

const get기일종류 = (sort: string): string => {
  return 기일종류[sort] ?? `알수 없음 (${sort})`;
};

const 기일결과: Record<string, string> = {
  "001": "매각",
  "002": "유찰",
  "003": "최고가매각허가결정",
  "017": "최고가매각허가취소결정",
};

const get기일결과 = (sort: string): string => {
  return 기일결과[sort] ?? `알수 없음 (${sort})`;
};

const numberFormatter = new Intl.NumberFormat("ko-KR");

const columns: TableProps["columns"] = [
  {
    title: "기일",
    dataIndex: "dxdyYmd",
    key: "기일",
    // render: (text) => <a>{text}</a>,
  },
  {
    title: "기일종류",
    dataIndex: "auctnDxdyKndCd",
    key: "기일종류",
    render: (text) => <div>{get기일종류(text)}</div>,
  },
  {
    title: "기일장소",
    dataIndex: "dxdyPlcNm",
    key: "기일장소",
  },
  {
    title: "최저매각가격",
    dataIndex: "tsLwsDspslPrc",
    key: "최저매각가격",
    render: (value) => <div>{numberFormatter.format(value) || ""} </div>,
  },
  {
    title: "기일결과",
    dataIndex: "auctnDxdyRsltCd",
    key: "기일결과",
    render: (text) => <div>{get기일결과(text)}</div>,
  },
];

const data = gdsDspslDxdyLst;

const TableComponent: React.FC = () => (
  <Table
    columns={columns}
    dataSource={data}
    pagination={false}
    rowKey="key" // 각 행의 고유 key (string | (record) => string)
    // ✅ 스타일 & 레이아웃
    title={() => <h2 className="text-base">기일내역</h2>}
    bordered // 테이블에 border 추가
    size="small" // 테이블 크기: "small" | "middle" | "large"
    tableLayout="auto" // 컬럼 너비 고정 ("auto" | "fixed")
    showHeader={true} // 헤더 표시 여부
  />
);

export default TableComponent;
