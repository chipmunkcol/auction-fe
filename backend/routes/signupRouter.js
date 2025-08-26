import { Router } from "express";
import client from "../lib/pgClient.js";
import bcrypt from 'bcrypt'

const saltRounds = 10;

const router = Router();

router.get('/api/users', async (req, res) => {
  
  client.query('SELECT * FROM topic', (err, dbRes) => {
    if (err) {
      console.error(err);
      res.status(400).send('Database error');
    } else {
      res.status(200).send({
        success: true,
        data: dbRes.rows[0],
      })
    }
  })
})

const signupQuery = `
  INSERT INTO users (user_id, password, phone)
  VALUES ($1, $2, $3)
  RETURNING id, user_id, phone
`

router.post('/api/sign-up', async (req, res) => {
  try {
    const { user_id, password, phone } = req.body;
    if (!user_id || !password || !phone) {
      return res.status(400).json({ success: false, message: '모든 필드를 입력해주세요.' });
    }

    // + user_id 중복 체크 로직
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    client.query(signupQuery, [user_id, hashedPassword, phone]), (err, dbRes) => {
      if (err) {
        console.error(err);
        res.status(400).send('Database error', err);
      } else {
        res.status(200).send({
          success: true,
          data: dbRes.rows[0],
        })
      }
    }
  } catch (error) {
    res.send({
      succes: false,
      error: error.message,
    });
  }
})

export default router;