import {
  KinopoiskDev,
  MovieQueryBuilder,
  SPECIAL_VALUE,
  SORT_TYPE,
} from "@/shared/adapters";
import type {
  MovieDtoV13,
  PossibleValueDto,
  IResponse,
  MeiliMovieEntity,
} from "@/shared/adapters";

export class MovieService {
  private kp: KinopoiskDev;

  constructor(apiKey: string) {
    this.kp = new KinopoiskDev(apiKey);
  }

  // async getRandomMovie(): Promise<MovieDtoV13 | null> {
  //   const queryBuilder = new MovieQueryBuilder();
  //   const baseQuery = queryBuilder
  //     .select(["id", "name", "description", "year", "backdrop.url"])
  //     .filterExact("backdrop.url", SPECIAL_VALUE.NOT_NULL)
  //     .filterExact("isSeries", false)
  //     .filterExact("description", SPECIAL_VALUE.NOT_NULL);

  //   const firstQuery = baseQuery.paginate(1, 1).build();
  //   const firstRes = await this.kp.movie.getByFilters(firstQuery);

  //   if (firstRes.data) {
  //     const randomPage = Math.floor(Math.random() * firstRes.data.pages) + 1;
  //     const query = baseQuery.paginate(randomPage, 1).build();
  //     const { data } = await this.kp.movie.getByFilters(query);

  //     return data?.docs[0] || null;
  //   }

  //   return null;
  // }

  async getRandomMovies(paginate: number = 3): Promise<MovieDtoV13[]> {
    const queryBuilder = new MovieQueryBuilder();
    const baseQuery = queryBuilder
      .select([
        "id",
        "name",
        "description",
        "year",
        "alternativeName",
        "backdrop.url",
      ])
      .filterExact("backdrop.url", SPECIAL_VALUE.NOT_NULL)
      .filterExact("description", SPECIAL_VALUE.NOT_NULL)
      .filterExact("alternativeName", SPECIAL_VALUE.NOT_NULL);

    // Выполняем первый запрос, чтобы узнать общее количество страниц
    const firstQuery = baseQuery.paginate(1, 3).build();
    const firstRes = await this.kp.movie.getByFilters(firstQuery);

    if (firstRes.data) {
      const { pages } = firstRes.data;

      // Генерируем 3 случайных страницы
      const randomPages = Array.from(
        { length: paginate },
        () => Math.floor(Math.random() * pages) + 1,
      );

      // Выполняем запросы для случайных страниц
      const moviePromises = randomPages.map((page) => {
        const query = baseQuery.paginate(page, 1).build();
        return this.kp.movie.getByFilters(query);
      });

      const results = await Promise.all(moviePromises);

      // Составляем массив фильмов
      const movies = results
        .map((res) => res.data?.docs[0])
        .filter((movie): movie is MovieDtoV13 => !!movie);

      return movies;
    }

    return [];
  }

  // Получить фильмы по фильтрам
  async getFilteredMovies({
    country,
    genre,
    year,
    rating,
  }: {
    country: string;
    genre: string;
    year: number;
    rating: number;
  }): Promise<MovieDtoV13[]> {
    const queryBuilder = new MovieQueryBuilder();
    const query = queryBuilder
      .select(["id", "name", "description", "rating", "year", "backdrop.url"])
      .filterExact("countries.name", country)
      .filterExact("genres.name", genre)
      .filterRange("year", [year, 2024])
      .filterRange("rating.kp", [rating, 10])
      .filterExact("backdrop.url", SPECIAL_VALUE.NOT_NULL)
      .paginate(1, 4)
      .sort("rating.kp", SORT_TYPE.DESC)
      .build();

    const result = await this.kp.movie.getByFilters(query);
    return result.data?.docs || [];
  }

  async getMovieById(id: number): Promise<MovieDtoV13 | undefined> {
    const { data } = await this.kp.movie.getById(id);

    if (data) return data;
  }

  async getMovieByTitle(
    title: string,
  ): Promise<MeiliMovieEntity[] | undefined> {
    const queryBuilder = new MovieQueryBuilder();
    const query = queryBuilder.query(title).paginate(1, 3).build();
    const { data } = await this.kp.movie.getBySearchQuery(query);
    return data?.docs || undefined;
  }

  // Получить список стран
  async getCountries(): Promise<IResponse<PossibleValueDto[]>> {
    return this.kp.movie.getPossibleValuesByField("countries.name");
  }

  // Получить список жанров
  async getGenres(): Promise<IResponse<PossibleValueDto[]>> {
    return this.kp.movie.getPossibleValuesByField("genres.name");
  }

  async getMovies(): Promise<MovieDtoV13[]> {
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

    const { data } = await this.kp.movie.getByFilters(query);

    return data?.docs || [];
  }

  async getSeries(): Promise<MovieDtoV13[]> {
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

    const { data } = await this.kp.movie.getByFilters(query);

    return data?.docs || [];
  }
}