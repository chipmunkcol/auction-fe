import React from 'react';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import { auctionDetail } from '../../../data/auctionDetail';

const { csBaseInfo, gdsDspslObjctLst, rgltLandLstAll, bldSdtrDtlLstAll } = auctionDetail.data.dma_result;


const DescTableCompeont: React.FC = () => 
  <Descriptions 
    bordered   // 테이블 스타일의 border 표시
    // column={1} // 한 행에 몇 개의 Item을 배치할지 (기본 3)
    size="small" // 크기: default | middle | small
    layout="horizontal" // 레이아웃: horizontal | vertical
    labelStyle={{ fontWeight: "bold" }} // 라벨 영역 스타일 커스터마이즈
    contentStyle={{ color: "#333" }}   // 값 영역 스타일 커스터마이즈
    title={csBaseInfo.userCsNo} // 상단 제목 (옵션)
    extra={`${csBaseInfo.cortOfcNm} ${csBaseInfo.cortAuctnJdbnNm}`} // 우측 상단 extra 버튼/텍스트 (옵션)
  >
    <Descriptions.Item label="소재지" span={'filled'}>
      {gdsDspslObjctLst[0].userPrintSt}
    </Descriptions.Item>
    <Descriptions.Item label="물건종별">아파트</Descriptions.Item>
    <Descriptions.Item label="사건접수">{csBaseInfo.csRcptYmd}</Descriptions.Item>
    <Descriptions.Item label="경매구분">{csBaseInfo.csNm}</Descriptions.Item>
    <Descriptions.Item label="대지권">{rgltLandLstAll[0][0].rgltRateNmrtVal}㎡</Descriptions.Item>
    <Descriptions.Item label="소유자">오동환</Descriptions.Item>
    <Descriptions.Item label="감정가">{csBaseInfo.clmAmt}</Descriptions.Item>
</Descriptions>
;

export default DescTableCompeont;