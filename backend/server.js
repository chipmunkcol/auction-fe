import express from 'express'
import sqlite3 from 'sqlite3'
import cors from 'cors'
import axios from 'axios';
import { 공매_URL } from './OpenApi.js';
import signupRouter from './routes/signupRouter.js';
import verifyRouter from './routes/verifyCode.js';
import pgClient from './lib/pgClient.js';
import loginRouter from './routes/loginRouter.js';

const app = express()
const port = 8080

// CORS 설정 - 개발환경용 (관대한 설정)
const corsOptions = {
  origin: [
    '*',
    'http://localhost:3000',  
    'http://localhost:5173',  // Vite 기본 포트
  ],
  credentials: true, // 쿠키, 인증 헤더 허용
  optionsSuccessStatus: 200, // IE11 지원
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With', 
    'Content-Type',
    'Accept',
    'Authorization',
    'Cache-Control'
  ]
};

// CORS 미들웨어 적용
app.use(cors(corsOptions));

// Preflight 요청 처리
app.options('*', cors(corsOptions));
app.use(express.json())


app.use(express.urlencoded({ extended: true }))

// SQLie DB 연결
// const db = new sqlite3.Database("../crowling/auctions.db", (err ) => {
//   if (err) {
//     console.error('DB 연결 실패', err.message)
//   } else {
//     console.log("SQLite DB 연결 성공")
//   }
// })
pgClient.connect();

// Open API
const baseUrl = 'https://apis.data.go.kr/1613000/RTMSDataSvcInduTrade/getRTMSDataSvcInduTrade';
const serviceKey = '723a99bfbb2953d170bc538668482cb82f32793a2565bfbfc79f55299ab58df9'
// app start
app.get('/api', async (req, res) => {
  try {
    const response = await axios.get(`${baseUrl}`, {
      params: {
        serviceKey: serviceKey,
        LAWD_CD: 11110,
        DEAL_YMD: 201512,
        pageNo: 1,
        numOfRows: 10
      }
    })

    const { body } = response.data.response;

    res.json(body);
  } catch (err) {
    console.error('API 호출 에러:', err);
    res.status(500).json({ error: 'API 호출 실패' });
  }
})

app.get("/api/auctions", (req, res) => {
  const sql = "SELECT * FROM auction_listings"
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.json(rows)
  })
})

app.get('/api/public-auctions', async (req, res) => {
  try {
    const params = {
      serviceKey: serviceKey,
      numOfRows: 5,           // 5개 결과
      pageNo: 1,              // 1페이지
      DPSL_MTD_CD: '0001',    // 매각
      BID_MTD_CD: '0001',     // 최고가방식
      BID_DVSN_CD: '0001'     // 인터넷공매
    };

    const response = await axios.get(`${공매_URL.공고목록조회}`, {
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
})

// 인증
app.use(signupRouter)
app.use('/api', verifyRouter)
app.use('/api', loginRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// test
// postgreDB 에 supabase typeorm 적용해서 R (filter)