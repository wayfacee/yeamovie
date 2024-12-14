import { rtkApi } from "@/shared/api";
import {
  type IResponse,
  KinopoiskDev,
  type MovieDtoV13,
  MovieQueryBuilder,
  type PossibleValueDto,
  SORT_TYPE,
  SPECIAL_VALUE,
} from "@openmoviedb/kinopoiskdev_client";

const kp = new KinopoiskDev(import.meta.env.VITE_API_KEY);

interface Props {
  country: string;
  genre: string;
  year: number;
  rating: number;
}

const movieApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getRandomMovie: build.query<MovieDtoV13, void>({
      queryFn: async () => {
        const queryBuilder = new MovieQueryBuilder();

        try {
          const baseQuery = queryBuilder
            .select([
              "id",
              "name",
              "description",
              "year",
              "alternativeName",
              "description",
              "backdrop.url",
            ])
            .filterExact("backdrop.url", SPECIAL_VALUE.NOT_NULL)
            .filterExact("isSeries", false)
            .filterExact("description", SPECIAL_VALUE.NOT_NULL);

          const firstQuery = baseQuery.paginate(1, 1).build();

          const firstRes = await kp.movie.getByFilters(firstQuery);

          if (firstRes.data) {
            const { pages } = firstRes.data;
            const randomPage = Math.floor(Math.random() * pages) + 1;
            const query = baseQuery.paginate(randomPage, 1).build();

            const { data, /* error, */ message } =
              await kp.movie.getByFilters(query);

            if (data) {
              return { data: data.docs[0] };
            }
            return { error: { status: 500, data: message } };
          }

          return { error: { status: 500, data: firstRes.message } };
        } catch (e: any) {
          return { error: { status: 500, data: e.message } };
        }
      },
    }),
    getRandomMovies: build.query<MovieDtoV13[], { paginate?: number }>({
      queryFn: async ({ paginate = 3 }) => {
        const queryBuilder = new MovieQueryBuilder();

        try {
          const baseQuery = queryBuilder
            .select([
              "id",
              "name",
              "description",
              "year",
              "alternativeName",
              "description",
              "backdrop.url",
            ])
            .filterExact("backdrop.url", SPECIAL_VALUE.NOT_NULL)
            .filterExact("description", SPECIAL_VALUE.NOT_NULL)
            .filterExact("alternativeName", SPECIAL_VALUE.NOT_NULL);

          // Выполняем первый запрос, чтобы узнать общее количество страниц
          const firstQuery = baseQuery.paginate(1, 3).build();
          const firstRes = await kp.movie.getByFilters(firstQuery);

          if (firstRes.data) {
            const { pages } = firstRes.data;

            // Генерируем 3 случайных страницы
            const randomPages = Array.from(
              { length: paginate || 3 },
              () => Math.floor(Math.random() * pages) + 1,
            );

            // Выполняем запросы для 3 случайных страниц
            const moviePromises = randomPages.map((page) => {
              const query = baseQuery.paginate(page, 1).build();
              return kp.movie.getByFilters(query);
            });

            const results = await Promise.all(moviePromises);

            // Составляем массив фильмов
            const movies = results
              .map((res) => res.data?.docs[0])
              .filter((movie): movie is MovieDtoV13 => !!movie);

            if (movies.length > 0) {
              return { data: movies };
            }

            return { error: { status: 500, data: "Failed to fetch movies." } };
          }

          return { error: { status: 500, data: firstRes.message } };
        } catch (e: any) {
          return { error: { status: 500, data: e.message } };
        }
      },
    }),
    getCountries: build.query<IResponse<PossibleValueDto[]>, void>({
      queryFn: async () => {
        try {
          const data =
            await kp.movie.getPossibleValuesByField("countries.name");
          return { data };
        } catch (e) {
          console.log("getGenres", e);
          return {
            error: {
              status: 500,
              data: { message: "Ошибка с запросом - getGenres" },
            },
          };
        }
      },
    }),
    getGenres: build.query<IResponse<PossibleValueDto[]>, void>({
      queryFn: async () => {
        try {
          const data = await kp.movie.getPossibleValuesByField("genres.name");
          return { data };
        } catch (e) {
          console.log("getGenres", e);
          return {
            error: {
              status: 500,
              data: { message: "Ошибка с запросом - getGenres" },
            },
          };
        }
      },
    }),
    getFilteredMovies: build.query<MovieDtoV13[], Props>({
      queryFn: async ({ country, genre, year, rating }) => {
        try {
          const queryBuilder = new MovieQueryBuilder();

          const query = queryBuilder
            .select([
              "id",
              "name",
              "description",
              "rating",
              "backdrop.url",
              "year",
              "genres",
              "countries.name",
            ])
            .filterRange("year", [year, 2024])
            .filterRange("rating.kp", [rating, 10])
            .filterExact("backdrop.url", SPECIAL_VALUE.NOT_NULL)
            .filterExact("isSeries", false)
            .filterExact("countries.name", country)
            .filterExact("genres.name", genre)
            .sort("rating.kp", SORT_TYPE.DESC)
            .paginate(1, 4)
            .build();

          const { data, error, message } = await kp.movie.getByFilters(query);

          if (error) {
            console.log(error, message);
            return { error: { status: 500, data: message } };
          }

          if (!data || !data.docs) {
            return {
              error: {
                status: 500,
                data: { message: "Данные отсутствуют getFilteredMovies" },
              },
            };
          }

          return { data: data.docs };
        } catch (e) {
          console.log("getMovies", e);
          throw new Error("Ошибка с запросом - getFilteredMovies");
        }
      },
    }),
    getMovieById: build.query<MovieDtoV13, { id: number }>({
      queryFn: async ({ id }) => {
        try {
          const { data, error, message } = await kp.movie.getById(id);

          if (error) {
            console.log(error, message);
            return { error: { status: 500, data: message } };
          }

          if (!data) {
            return {
              error: {
                status: 500,
                data: { message: "Данные отсутствуют" },
              },
            };
          }

          return { data };
        } catch (e) {
          console.log("getMovieById", e);
          throw new Error("Ошибка с запросом - getMovieById");
        }
      },
    }),
  }),
});
export const {
  useGetRandomMovieQuery: useRandomMovie,
  useGetRandomMoviesQuery: useRandomMovies,
  useLazyGetRandomMoviesQuery: useLazyRandomMovies,
  useGetCountriesQuery: useCountries,
  useGetGenresQuery: useGenres,
  useGetFilteredMoviesQuery: useFilteredMovies,
  useGetMovieByIdQuery: useMovieById,
} = movieApi;
