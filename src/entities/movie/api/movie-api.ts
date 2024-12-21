import { MovieService } from "../lib/movie.service";
import {
  type MovieDtoV13,
  type MeiliMovieEntity,
  type PossibleValueDto,
  IResponse,
} from "@/shared/adapters";
import { rtkApi } from "@/shared/api";
import { toast } from "@/shared/hooks";

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

      onQueryStarted: async (_, { queryFulfilled }) => {
        // _ - arg
        try {
          await queryFulfilled;
          toast({
            title: "Фильмы успешно загружены!",
          });
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Фильмов с такими данными нет!",
            description: "Попробуйте выбрать другие параметры...",
          });
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

      onQueryStarted: async (_, { queryFulfilled }) => {
        // _ - arg
        try {
          await queryFulfilled;
          toast({
            title: "Фильмы успешно загружены!",
          });
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Фильмов с таким названием нет!",
            description: "Попробуйте ввести другое название...",
          });
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
          const data = await movieService.getMovies();
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
  useGetFilteredMoviesQuery,
  useGetMovieByIdQuery,
  useGetMovieByTitleQuery,
  useGetCountriesQuery,
  useGetGenresQuery,
  useGetMoviesQuery,
  useLazyGetSeriesQuery,
} = movieApi;
