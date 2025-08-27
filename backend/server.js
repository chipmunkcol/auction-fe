import dotenv from 'dotenv'
import axios from 'axios';
import cors from 'cors';
import express from 'express';
import pgClient from './lib/pgClient.js';
import loginRouter from './routes/loginRouter.js';
import signupRouter from './routes/signupRouter.js';
import verifyRouter from './routes/verifyCode.js';
import publicAuctionRouter from './routes/publicAuction.js';

dotenv.config()

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

// 공매
app.use('/api', publicAuctionRouter)

// 인증
app.use(signupRouter)
app.use('/api', verifyRouter)
app.use('/api', loginRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// test
// postgreDB 에 supabase typeorm 적용해서 R (filter)