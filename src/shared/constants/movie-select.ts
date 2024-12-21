import { MovieSelectProps } from "@/features/movie/movie-select";

export const movieSelectConfig: MovieSelectProps[] = [
  {
    id: 1,
    triggerValue: "Жанры",
    label: "Жанры",
    category: "жанр",
  },
  {
    id: 2,
    triggerValue: "Страны",
    label: "Страны",
    category: "страна",
  },
  {
    id: 3,
    triggerValue: "Год",
    label: "Год",
    items: [
      { name: "2023", slug: "2023" },
      { name: "2022", slug: "2022" },
      { name: "2021", slug: "2021" },
      { name: "2020", slug: "2020" },
      { name: "2019", slug: "2019" },
    ],
  },
  {
    id: 4,
    triggerValue: "Рейтинг",
    label: "Рейтинг",
    items: [
      { name: "от 4", slug: "from-four" },
      { name: "от 6", slug: "from-six" },
      { name: "от 8", slug: "from-eight" },
      { name: "от 9", slug: "from-nine" },
    ],
  },
];
