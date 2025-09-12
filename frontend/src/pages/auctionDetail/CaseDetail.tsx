import React from "react";
import { Descriptions } from "antd";
import { 사건상세조회 } from "../../../data/auctionDetail/사건상세조회/사건상세조회";

const { dma_csBasInf, dlt_rletCsDspslObjctLst } = 사건상세조회.data;

const CaseDetail: React.FC = () => (
  <div className="p-8">
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">경매사건검색</h1>
      <div className="border-b " />
    </div>
    <div className="pt-10">
      <Descriptions
        bordered // 테이블 스타일의 border 표시
        // column={1} // 한 행에 몇 개의 Item을 배치할지 (기본 3)
        size="small" // 크기: default | middle | small
        layout="horizontal" // 레이아웃: horizontal | vertical
        labelStyle={{ fontWeight: "bold", width: 150 }} // 라벨 영역 스타일 커스터마이즈
        contentStyle={{ color: "#333" }} // 값 영역 스타일 커스터마이즈
        title={<h2 className="text-xl">사건기본내역</h2>} // 상단 제목 (옵션)
        column={2} // 한 행에 몇 개의 Item을 배치할지 (기본 3)
      >
        <Descriptions.Item label="사건번호">
          {dma_csBasInf.cortOfcNm} {dma_csBasInf.userCsNo}
        </Descriptions.Item>
        <Descriptions.Item label="사건명">
          {dma_csBasInf.csNm}
        </Descriptions.Item>
        {/* 중복/병합/이송 */}
        <Descriptions.Item
          label="중복/병합/이송"
          // style={{ backgroundColor: "pink" }}
          span={"filled"}
        >
          ?
        </Descriptions.Item>
        {/* 접수일자 */}

        <Descriptions.Item label="접수일자">
          {dma_csBasInf.csRcptYmd}
        </Descriptions.Item>
        {/* 개시결정일자 */}
        <Descriptions.Item label="개시결정일자">
          {dma_csBasInf.csCmdcYmd}
        </Descriptions.Item>
        {/* 담당계 */}
        <Descriptions.Item label="담당계" span={"filled"}>
          전화: {dma_csBasInf.jdbnTelno} {dma_csBasInf.execrCsTelno} (경매절차
          관련 문의) <br />
          (민사집행법 제90조, 제268조 및 부동산등에 대한 경매절차 처리지침
          제53조제1항에 따라, 경매절차의 이해관계인이 아닌 일반인에게는
          법원경매정보 홈페이지에 기재된 내용 외에는 정보의 제공이 제한될 수
          있습니다.)
        </Descriptions.Item>
        {/* 청구금액 */}
        <Descriptions.Item label="청구금액">
          {dma_csBasInf.clmAmt}원
        </Descriptions.Item>
        {/* 사건항고/정지여부 */}
        <Descriptions.Item label="사건항고/정지여부">
          {dma_csBasInf.auctnSuspStatCd === "03" ? "정지" : ""}
        </Descriptions.Item>
        {/* 종국결과 */}
        <Descriptions.Item label="종국결과">
          {dlt_rletCsDspslObjctLst[0].ultmtNm}
        </Descriptions.Item>
        {/* 종국일자 */}
        <Descriptions.Item label="종국일자">
          {dma_csBasInf.csUltmtYmd || "-"}
        </Descriptions.Item>
      </Descriptions>
    </div>
  </div>
);
export default CaseDetail;
