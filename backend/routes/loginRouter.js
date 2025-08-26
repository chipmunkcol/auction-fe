import { Router } from "express";
import client from "../lib/pgClient.js";
import bcrypt from 'bcrypt'

const loginRouter = Router();

const userQuery = `SELECT id, user_id, password FROM users WHERE user_id = $1`
loginRouter.post('/login', async (req, res) => {
  const { user_id, password } = req.body;

  const userResult = await client.query(userQuery, [user_id])  

  const user = userResult.rows[0]
  if (userResult.rowCount === 0) {
    return res.status(401).json({ success: false, message: '아이디가 올바르지 않습니다.' });
  }

  const isMatch = await bcrypt.compare(password, user?.password);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: '아이디 또는 비밀번호가 올바르지 않습니다.' })
  }

  return res.status(200).json({
    success: true,
    message: '로그인 성공',
    data: { user_id: user.user_id },
  });
})

export default loginRouter;