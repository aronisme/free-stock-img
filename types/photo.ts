// types/photo.ts
export interface Photo {
  id: string;
  imageUrl: string;
  title?: string;
  description?: string;
  tags?: string[];
  likes?: number;
  downloads?: number;
  liked?: boolean;
  prompt?: string;
}