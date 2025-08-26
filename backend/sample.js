// Node.js Express 서버를 사용한 OnBid API 호출 예시
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// 미들웨어 설정
app.use(express.json());

// OnBid API 설정
const ONBID_CONFIG = {
  baseURL: 'http://openapi.onbid.co.kr/openapi/services/UtlinsttPblsalThingInquireSvc',
  serviceKey: '723a99bfbb2953d170bc538668482cb82f32793a2565bfbfc79f55299ab58df9'
};

// 1. 이용기관공고목록조회 (getPublicSaleAnnouncement)
app.get('/api/announcements', async (req, res) => {
  try {
    const params = {
      serviceKey: ONBID_CONFIG.serviceKey,
      numOfRows: req.query.numOfRows || 10,
      pageNo: req.query.pageNo || 1,
      DPSL_MTD_CD: req.query.DPSL_MTD_CD || '0001', // 0001: 매각, 0002: 임대(대부)
      BID_MTD_CD: req.query.BID_MTD_CD,           // 0001: 최고가방식, 0002: 호가방식 등
      BID_DVSN_CD: req.query.BID_DVSN_CD,         // 0001: 인터넷공매, 0002: 현장공매
      PRPT_DVSN_CD: req.query.PRPT_DVSN_CD,       // 재산구분코드
      SIDO: req.query.SIDO,                       // 물건소재지(시도)
      SGK: req.query.SGK,                         // 물건소재지(시군구)
      ORG_NM: req.query.ORG_NM,                   // 기관명
      FROM_ANNOUNCE_DATE: req.query.FROM_ANNOUNCE_DATE, // YYYYMMDD
      TO_ANNOUNCE_DATE: req.query.TO_ANNOUNCE_DATE      // YYYYMMDD
    };

    // 빈 값 제거
    Object.keys(params).forEach(key => {
      if (!params[key]) delete params[key];
    });

    const response = await axios.get(`${ONBID_CONFIG.baseURL}/getPublicSaleAnnouncement`, {
      params,
      timeout: 10000
    });

    res.json({
      success: true,
      data: response.data
    });

  } catch (error) {
    console.error('API 호출 오류:', error.message);
    res.status(500).json({
      success: false,
      error: error.message,
      details: error.response?.data || null
    });
  }
});

// 2. 이용기관공매물건목록조회 (getPublicSaleObject)
app.get('/api/objects', async (req, res) => {
  try {
    const params = {
      serviceKey: ONBID_CONFIG.serviceKey,
      numOfRows: req.query.numOfRows || 10,
      pageNo: req.query.pageNo || 1,
      DPSL_MTD_CD: req.query.DPSL_MTD_CD || '0001', // 필수 파라미터
      CTGR_HIRK_ID: req.query.CTGR_HIRK_ID,         // 카테고리상위ID
      SIDO: req.query.SIDO,                         // 물건소재지(시도)
      SGK: req.query.SGK,                           // 물건소재지(시군구)
      GOODS_PRICE_FROM: req.query.GOODS_PRICE_FROM, // 감정가하한
      GOODS_PRICE_TO: req.query.GOODS_PRICE_TO,     // 감정가상한
      OPEN_PRICE_FROM: req.query.OPEN_PRICE_FROM,   // 최저입찰가하한
      OPEN_PRICE_TO: req.query.OPEN_PRICE_TO,       // 최저입찰가상한
      CLTR_NM: req.query.CLTR_NM,                   // 물건명
      PBCT_BEGN_DTM: req.query.PBCT_BEGN_DTM,      // 입찰일자From (YYYYMMDD)
      PBCT_CLS_DTM: req.query.PBCT_CLS_DTM          // 입찰일자To (YYYYMMDD)
    };

    // 빈 값 제거
    Object.keys(params).forEach(key => {
      if (!params[key]) delete params[key];
    });

    const response = await axios.get(`${ONBID_CONFIG.baseURL}/getPublicSaleObject`, {
      params,
      timeout: 10000
    });

    res.json({
      success: true,
      data: response.data
    });

  } catch (error) {
    console.error('API 호출 오류:', error.message);
    res.status(500).json({
      success: false,
      error: error.message,
      details: error.response?.data || null
    });
  }
});

// 3. 이용기관통합공고목록조회 (getPublicSaleList)
app.get('/api/integrated-announcements', async (req, res) => {
  try {
    const params = {
      serviceKey: ONBID_CONFIG.serviceKey,
      numOfRows: req.query.numOfRows || 10,
      pageNo: req.query.pageNo || 1,
      DPSL_MTD_CD: req.query.DPSL_MTD_CD,           // 처분방식코드
      PLNM_KIND_CD: req.query.PLNM_KIND_CD,         // 공고종류코드
      CTGR_HIRK_ID: req.query.CTGR_HIRK_ID,         // 카테고리상위ID
      ORG_NM: req.query.ORG_NM,                     // 기관명
      PLNM_NM: req.query.PLNM_NM,                   // 공고명
      FROM_ANNOUNCE_DATE: req.query.FROM_ANNOUNCE_DATE,
      TO_ANNOUNCE_DATE: req.query.TO_ANNOUNCE_DATE,
      PBCT_BEGN_DTM: req.query.PBCT_BEGN_DTM,
      PBCT_CLS_DTM: req.query.PBCT_CLS_DTM
    };

    // 빈 값 제거
    Object.keys(params).forEach(key => {
      if (!params[key]) delete params[key];
    });

    const response = await axios.get(`${ONBID_CONFIG.baseURL}/getPublicSaleList`, {
      params,
      timeout: 10000
    });

    res.json({
      success: true,
      data: response.data
    });

  } catch (error) {
    console.error('API 호출 오류:', error.message);
    res.status(500).json({
      success: false,
      error: error.message,
      details: error.response?.data || null
    });
  }
});

// 4. 이용기관마감임박공고목록조회 (getPublicDeadlineAnnouncementList)
app.get('/api/deadline-announcements', async (req, res) => {
  try {
    const params = {
      serviceKey: ONBID_CONFIG.serviceKey,
      numOfRows: req.query.numOfRows || 10,
      pageNo: req.query.pageNo || 1,
      DPSL_MTD_CD: req.query.DPSL_MTD_CD,
      PLNM_KIND_CD: req.query.PLNM_KIND_CD,
      CTGR_HIRK_ID: req.query.CTGR_HIRK_ID,
      ORG_NM: req.query.ORG_NM,
      PLNM_NM: req.query.PLNM_NM,
      FROM_ANNOUNCE_DATE: req.query.FROM_ANNOUNCE_DATE,
      TO_ANNOUNCE_DATE: req.query.TO_ANNOUNCE_DATE,
      PBCT_BEGN_DTM: req.query.PBCT_BEGN_DTM,
      PBCT_CLS_DTM: req.query.PBCT_CLS_DTM
    };

    // 빈 값 제거
    Object.keys(params).forEach(key => {
      if (!params[key]) delete params[key];
    });

    const response = await axios.get(`${ONBID_CONFIG.baseURL}/getPublicDeadlineAnnouncementList`, {
      params,
      timeout: 10000
    });

    res.json({
      success: true,
      data: response.data
    });

  } catch (error) {
    console.error('API 호출 오류:', error.message);
    res.status(500).json({
      success: false,
      error: error.message,
      details: error.response?.data || null
    });
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`OnBid API 서버가 http://localhost:${port} 에서 실행 중입니다.`);
  console.log('\n사용 가능한 엔드포인트:');
  console.log('GET /api/announcements - 이용기관공고목록조회');
  console.log('GET /api/objects - 이용기관공매물건목록조회');
  console.log('GET /api/integrated-announcements - 이용기관통합공고목록조회');
  console.log('GET /api/deadline-announcements - 이용기관마감임박공고목록조회');
  
  console.log('\n예시 호출:');
  console.log(`curl "http://localhost:${port}/api/announcements?DPSL_MTD_CD=0001&pageNo=1&numOfRows=5"`);
  console.log(`curl "http://localhost:${port}/api/objects?DPSL_MTD_CD=0001&SIDO=서울특별시"`);
});

// 에러 처리 미들웨어
app.use((error, req, res, next) => {
  console.error('서버 에러:', error);
  res.status(500).json({
    success: false,
    error: '내부 서버 오류가 발생했습니다.',
    details: process.env.NODE_ENV === 'development' ? error.message : null
  });
});

module.exports = app;