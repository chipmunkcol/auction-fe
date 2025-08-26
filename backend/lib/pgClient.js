import { Client } from 'pg';

//POSTGRESQL 접속정보
const pgClient = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '1234',
  port: 5432,
});

export default pgClient;