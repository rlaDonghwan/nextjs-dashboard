const postgres = require("postgres");
require("dotenv").config(); // .env 파일에서 환경 변수 로드

// PostgreSQL 데이터베이스 연결 설정
const db = postgres(process.env.POSTGRES_URL, {
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  ssl: false, // 원격 DB는 true
});

console.log("DB 연결 성공");
module.exports = { db };
