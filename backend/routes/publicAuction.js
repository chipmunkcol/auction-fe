import { Router } from "express";
import { 공매_URL } from "../OpenApi.js";
import axios from "axios";

const publicAuctionRouter = Router();

publicAuctionRouter.get('/public-auctions', async (req, res) => {

  try {
    const params = {
      serviceKey: process.env.OPENAPI_SERVICEKEY,
      numOfRows: 5,           // 5개 결과
      pageNo: 1,              // 1페이지
      DPSL_MTD_CD: '0001',    // 매각
      BID_MTD_CD: '0001',     // 최고가방식
      BID_DVSN_CD: '0001'     // 인터넷공매
    };

    const response = await axios.get(`${공매_URL.공고목록조회}`, {
      params,
      // timeout: 10000
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
})

export default publicAuctionRouter