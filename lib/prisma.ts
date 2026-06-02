import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

// Prisma 7에서는 PrismaClient 생성 시 driver adapter가 필수.
// PrismaPg: pg 라이브러리를 기반으로 Supabase(PostgreSQL)에 연결한다.
//
// DATABASE_URL 형식 (Supabase Transaction Pooler, 포트 6543):
//   postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true

function makePrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL 환경변수가 설정되지 않았습니다. .env.local을 확인하세요.');
  }
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });
}

// Next.js 개발 환경에서 Hot Reload 시 PrismaClient가 중복 생성되어
// 연결 수가 초과(Too many connections)되는 문제를 방지하는 싱글톤 패턴.
// globalThis는 HMR 사이클에서 재설정되지 않으므로 인스턴스가 보존된다.
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma ?? makePrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
