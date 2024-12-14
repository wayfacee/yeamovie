import { rtkApi } from "@/shared/api";
import {
  KinopoiskDev,
  type MeiliMovieEntity,
  MovieQueryBuilder,
} from "@openmoviedb/kinopoiskdev_client";

const kp = new KinopoiskDev(import.meta.env.VITE_API_KEY);

const movieApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getMovieByTitle: build.query<MeiliMovieEntity[], { title: string }>({
      queryFn: async ({ title }) => {
        try {
          const queryBuilder = new MovieQueryBuilder();

          const query = queryBuilder.query(title).paginate(1, 3).build();

          const { data, error, message } =
            await kp.movie.getBySearchQuery(query);

          if (error) {
            console.log(error, message);
            return { error: { status: 500, data: message } };
          }

          if (!data || !data.docs) {
            return {
              error: {
                status: 404,
                data: { message: "Данные отсутствуют getMovieByTitle" },
              },
            };
          }

          return { data: data.docs };
        } catch (e) {
          console.log("getMovieByTitle", e);
          throw new Error("Ошибка с запросом - getMovieByTitle");
        }
      },
    }),
  }),
});
export const { useGetMovieByTitleQuery: useMovieSearch } = movieApi;
