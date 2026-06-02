// Prisma 7 설정 파일
//
// datasource.url : 마이그레이션 CLI(prisma migrate) 전용 연결 URL.
//   Supabase Transaction Pooler(pgbouncer)는 DDL을 지원하지 않으므로
//   마이그레이션에는 Direct Connection(DIRECT_URL)을 사용한다.
//
// 런타임 쿼리 연결(PrismaClient)은 lib/prisma.ts의 PrismaPg 어댑터가 담당한다.
//   → lib/prisma.ts에서 DATABASE_URL (Transaction Pooler, 포트 6543) 사용.
//
// 참고: https://pris.ly/d/config-datasource

import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: './prisma/schema.prisma',

  datasource: {
    // DIRECT_URL이 없으면(로컬 개발 초기) undefined → generate만 실행 시 문제없음
    url: process.env.DIRECT_URL,
  },

  migrations: {
    // Prisma 7: seed 커맨드는 prisma.config.ts에서 관리 (package.json 아님)
    seed: 'tsx prisma/seed.ts',
  },
});
