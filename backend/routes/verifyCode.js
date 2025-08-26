import { Router } from "express";
import redisClient from "../lib/redisClient.js";
// import { sendSMS } from "../lib/tailioClient.js";

const router = Router();

// 인증번호 전송 
// 테스트 : tailwo
// 실서비스 : 네이버 or 카카오 알림톡
// 네이버 클라우드 SENS (https://www.ncloud.com/product/applicationService/sens)
// Kakao Biz (알림톡) - 문자보다 저렴, 심사 절차 필요



router.post("/send-code", async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ success: false, message: "번호 필요" });

  const code = generateCode();
  try {
    await redisClient.set(phone, code, {
      expiration: { type: "EX", value: 3 * 60  } // 3분
    });
    // await sendSMS(phone, code);
    res.json({ success: true, message: `인증번호 발송 완료: ${code}` })

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
})

router.post('/verify-code', async (req, res) => {
  const { phone, code } = req.body;

  const savedCode = await redisClient.get(phone)
  if (savedCode === code) {
    redisClient.del(phone);
    return res.json({ success: true, message: '인증 성공' });
  }
  res.status(400).json({ success: false, message: '인증번호 불일치' });
})


// 랜덤 인증번호 생성
function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export default router