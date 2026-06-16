import { createClient } from '@supabase/supabase-js';

// ── 브라우저 전용 ───────────────────────────────────────────────────────────

export async function convertToWebP(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('canvas context 생성 실패'));
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error('WebP 변환 실패'));
          resolve(blob);
        },
        'image/webp',
        0.85,
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('이미지 로드 실패'));
    };
    img.src = objectUrl;
  });
}

// ── 서버 전용 ──────────────────────────────────────────────────────────────

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) throw new Error('Supabase 환경변수가 설정되지 않았습니다.');
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function uploadReviewImage(blob: Blob, userId: string): Promise<string> {
  const supabase = getAdminClient();
  const timestamp = Date.now();
  const path = `${userId}/${timestamp}.webp`;

  const { error } = await supabase.storage
    .from('review-images')
    .upload(path, blob, { contentType: 'image/webp', upsert: false });

  if (error) throw new Error(`이미지 업로드 실패: ${error.message}`);

  const { data } = supabase.storage.from('review-images').getPublicUrl(path);
  return data.publicUrl;
}

export async function deleteReviewImage(url: string): Promise<void> {
  const supabase = getAdminClient();
  const marker = '/review-images/';
  const idx = url.indexOf(marker);
  if (idx === -1) return;
  const path = url.slice(idx + marker.length);
  await supabase.storage.from('review-images').remove([path]);
}
