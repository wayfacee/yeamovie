export type MovieSelectTypes = "страна" | "жанр" | "год" | "рейтинг";

export interface MovieSelectProps {
  id: number;
  triggerValue: string;
  label: string;
  items?: {
    name: string;
    slug: string;
  }[];
  category?: string;
}