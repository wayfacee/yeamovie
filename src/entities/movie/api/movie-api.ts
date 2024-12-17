import { MovieService } from "../lib/movie.service";
import {
  type MovieDtoV13,
  type MeiliMovieEntity,
  type PossibleValueDto,
  IResponse,
} from "@/shared/adapters";
import { rtkApi } from "@/shared/api";

const movieService = new MovieService(import.meta.env.VITE_API_KEY);

export const movieApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getRandomMovies: builder.query<MovieDtoV13[], { paginate?: number }>({
      queryFn: async ({ paginate = 3 }) => {
        try {
          const data = await movieService.getRandomMovies(paginate);
          return { data };
        } catch (e: any) {
          return { error: { status: 500, data: e.message } };
        }
      },
    }),

    getFilteredMovies: builder.query<
      MovieDtoV13[],
      { country: string; genre: string; year: number; rating: number }
    >({
      queryFn: async ({ country, genre, year, rating }) => {
        try {
          const data = await movieService.getFilteredMovies({
            country,
            genre,
            year,
            rating,
          });
          return { data };
        } catch (e: any) {
          console.log("getMovies", e);
          throw new Error("Ошибка с запросом - getFilteredMovies");
        }
      },
    }),

    getMovieById: builder.query<MovieDtoV13 | undefined, { id: number }>({
      queryFn: async ({ id }) => {
        try {
          const data = await movieService.getMovieById(id);
          return { data };
        } catch (error: any) {
          throw new Error("Ошибка с запросом - getMovieById");
        }
      },
    }),
    getMovieByTitle: builder.query<
      MeiliMovieEntity[] | undefined,
      { title: string }
    >({
      queryFn: async ({ title }) => {
        try {
          const data = await movieService.getMovieByTitle(title);
          return { data };
        } catch (error: any) {
          throw new Error("Ошибка с запросом - getMovieByTitle");
        }
      },
    }),

    getCountries: builder.query<IResponse<PossibleValueDto[]>, void>({
      queryFn: async () => {
        try {
          const data = await movieService.getCountries();
          return { data };
        } catch (e: any) {
          console.log("getCountries", e);
          return {
            error: {
              status: 500,
              data: { message: "Ошибка с запросом - getCountries" },
            },
          };
        }
      },
    }),
    getGenres: builder.query<IResponse<PossibleValueDto[]>, void>({
      queryFn: async () => {
        try {
          const data = await movieService.getGenres();
          return { data };
        } catch (e: any) {
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

    getMovies: builder.query<MovieDtoV13[], void>({
      queryFn: async () => {
        try {
          const data = await movieService.getRandomMovies();
          return { data };
        } catch (e: any) {
          console.log("getMovies", e);
          throw new Error("Ошибка с запросом - getMovies");
        }
      },
    }),
    getSeries: builder.query<MovieDtoV13[], void>({
      queryFn: async () => {
        try {
          const data = await movieService.getSeries();
          return { data };
        } catch (e: any) {
          console.log("getSeries", e);
          throw new Error("Ошибка с запросом - getSeries");
        }
      },
    }),
  }),
});

export const {
  useGetRandomMoviesQuery,
  useLazyGetRandomMoviesQuery,
  useGetMovieByIdQuery,
  useGetMovieByTitleQuery,
  useGetCountriesQuery,
  useGetGenresQuery,
  useGetFilteredMoviesQuery,
  useGetMoviesQuery,
  useLazyGetSeriesQuery,
} = movieApi;
