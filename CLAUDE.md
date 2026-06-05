# CLAUDE.md

## 필수 문서
@AGENTS.md
@ARCHITECTURE.md
@DESIGN_SYSTEM.md
@CHANGELOG.md

---

## 명령어
pnpm dev          # 개발 서버
pnpm build        # 프로덕션 빌드
pnpm lint         # ESLint
pnpm prisma migrate dev
pnpm prisma generate
pnpm prisma db seed

---

## 환경 변수 (.env.local)
- DATABASE_URL: Supabase Transaction Pooler (6543) — 런타임
- DIRECT_URL: Supabase Direct Connection (5432) — 마이그레이션 전용
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

---

## 핵심 아키텍처 주의사항
- proxy.ts: createServerClient와 getClaims() 사이에 로직 추가 금지 (세션 깨짐)
- Prisma 7: DB URL 설정은 prisma.config.ts에만. schema.prisma 건드리지 말 것.
- 'use client'는 state/이벤트핸들러/브라우저 API가 필요할 때만.

## 언어
모든 응답은 한국어로 작성할 것.

---

## 1. Think Before Coding
**Don't assume. Don't hide confusion. Surface tradeoffs.**
Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First
**Minimum code that solves the problem. Nothing speculative.**
- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.
Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes
**Touch only what you must. Clean up only your own mess.**
When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.
When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.
The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution
**Define success criteria. Loop until verified.**
Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"
For multi-step tasks, state a brief plan:

1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.