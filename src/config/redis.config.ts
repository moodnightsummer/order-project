import * as session from 'express-session';
// import * as connectRedis from 'connect-redis';
import redis from 'redis';

function sessions(path) {
  // redis@v4
  const redisClient = redis.createClient({
    legacyMode: true,
    url: path,
  });
  redisClient.connect().catch(console.error);

  const sessionOptions: session.SessionOptions = {
    secret: process.env.REDIS_SECRET,
    saveUninitialized: false, // 세션이 저장되기 전 uninitialized 상태로 미리 만들어 저장
    resave: false, // 세션을 언제나 저장할지 설정함
    proxy: true,
    // cookie: { // 세션 쿠키 설정 (세션 관리 시 클라이언트에 보내는 쿠키)
  };

  return sessionOptions;
}

export default sessions;
