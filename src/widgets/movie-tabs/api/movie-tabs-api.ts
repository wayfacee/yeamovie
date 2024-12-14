import { rtkApi } from "@/shared/api";
import {
  KinopoiskDev,
  type MovieDtoV13,
  MovieQueryBuilder,
  SORT_TYPE,
  SPECIAL_VALUE,
} from "@openmoviedb/kinopoiskdev_client";

const kp = new KinopoiskDev(import.meta.env.VITE_API_KEY);

const movieApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getMovies: build.query<MovieDtoV13[], void>({
      queryFn: async () => {
        try {
          const queryBuilder = new MovieQueryBuilder();

          const query = queryBuilder
            .select([
              "id",
              "name",
              "description",
              "rating",
              "backdrop.url",
              "poster.url",
              "year",
              "genres",
              "countries.name",
            ])
            .filterRange("year", [2010, 2023])
            .filterRange("rating.kp", [7, 10])
            .filterExact("description", SPECIAL_VALUE.NOT_NULL)
            .filterExact("backdrop.url", SPECIAL_VALUE.NOT_NULL)
            .filterExact("poster.url", SPECIAL_VALUE.NOT_NULL)
            .filterExact("isSeries", false)
            // .filterExact("countries.name", "США")
            // .filterExact("countries.name", "Россия")
            // Добавляем сортировку по рейтингу
            .sort("rating.kp", SORT_TYPE.DESC)
            // Добавляем пагинацию и получаем 1 страницу по с 10 фильмами на странице
            .paginate(1, 8)
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
                data: { message: "Данные отсутствуют" },
              },
            };
          }

          // const { docs } = data; // page, limit
          return { data: data?.docs };
        } catch (e) {
          console.log("getMovies", e);
          throw new Error("Ошибка с запросом - getMovies");
        }
      },
    }),
    getSeries: build.query<MovieDtoV13[], void>({
      queryFn: async () => {
        try {
          const queryBuilder = new MovieQueryBuilder();
          const query = queryBuilder
            .select([
              "id",
              "name",
              "description",
              "rating",
              "backdrop.url",
              "poster.url",
              "year",
              "genres",
              "countries.name",
            ])
            .filterRange("year", [2010, 2023])
            .filterRange("rating.kp", [7, 10])
            .filterExact("backdrop.url", SPECIAL_VALUE.NOT_NULL)
            .filterExact("description", SPECIAL_VALUE.NOT_NULL)
            .filterExact("poster.url", SPECIAL_VALUE.NOT_NULL)
            .filterExact("isSeries", true)
            // .filterExact("countries.name", "США")
            // .filterExact("countries.name", "Россия")
            // Добавляем сортировку по рейтингу
            .sort("rating.kp", SORT_TYPE.DESC)
            // Добавляем пагинацию и получаем 1 страницу по с 10 фильмами на странице
            .paginate(1, 8)
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
                data: { message: "Данные отсутствуют" },
              },
            };
          }

          // const { docs } = data; // page, limit
          return { data: data.docs };
        } catch (e) {
          console.log("getSeries", e);
          throw new Error("Ошибка с запросом - getSeries");
        }
      },
    }),
  }),
});
export const {
  useGetMoviesQuery: useMovies,
  useLazyGetSeriesQuery: useSeriesLazy,
} = movieApi;
