export type AnimalCategory = 'dog' | 'cat';
export type ProductCategory = 'food' | 'treats' | 'supplies' | 'supplements';

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  badges: ('NEW' | 'BEST' | 'HIT')[];
  category: string; // 화면에 표시할 카테고리 레이블
}

export interface CircularRecommendation {
  id: string;
  label: string;
  imageUrl: string;
  bgColor: string;
}
