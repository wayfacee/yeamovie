import { cn } from "@/shared/lib";
import { AppImage, Skeleton } from "@/shared/ui";
import { type MovieDtoV13 } from "@openmoviedb/kinopoiskdev_client";
import React from "react";
import { MovieDetailsSkeleton } from "./movie-details.skeleton";

interface Props {
  data: MovieDtoV13;
  isLoading: boolean;
  className?: string;
}

export const MovieDetails: React.FC<Props> = React.memo(
  ({ data, isLoading, className }) => {
    const {
      name,
      year,
      description,
      genres,
      rating,
      poster,
      countries,
      persons,
    } = data;

    if (isLoading) {
      return <MovieDetailsSkeleton className={className} />;
    }

    return (
      <div className={cn("flex text-start", className)}>
        <div className="flex flex-col gap-6 mr-10">
          <AppImage
            className="w-[480px] h-[650px] rounded"
            src={poster?.url}
            fallback={<Skeleton className="w-[480px] h-[650px] rounded" />}
          />

          <div className="flex flex-col gap-6">
            <p className="text-xl font-bold">Смотреть на:</p>
            <div className="flex flex-row gap-5">
              {[...Array(4)].map((_, index) => (
                <Skeleton key={index} className="w-24 h-16" />
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center">
            <h1 className="mb-7 text-7xl font-bold w-[600px]">{name}</h1>
            <div className="flex flex-col gap-2">
              <p className="text-xl font-bold text-[#FFD233]">
                Кинопоиск {rating?.kp?.toFixed(1)}/10
              </p>
            </div>
          </div>
          
          <p className="text-lg w-[800px] mb-12">
            {description
              ? description
              : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet amet animi earum maiores qui nihil recusandae, eaque enim repudiandae expedita autem consequatur quaerat harum nobis nisi, iure tempore similique! Quis?"}
          </p>

          <h1 className="text-5xl font-bold mb-5">О фильме</h1>

          <dl className="grid grid-cols-[max-content_auto] gap-x-28 gap-y-5 text-lg text-gray-500">
            <dt className="font-medium">Жанр:</dt>
            <dd>
              {genres?.map((genre) => genre.name).join(", ") || "Неизвестно"}
            </dd>

            <dt className="font-medium">Страна:</dt>
            <dd>
              {countries?.map((country) => country.name).join(", ") ||
                "Неизвестно"}
            </dd>

            <dt className="font-medium">Год:</dt>
            <dd>{year || "Неизвестно"}</dd>

            {/* <dt className="font-bold">Режиссер:</dt> */}
            {/* <dd>{director?.name || "Неизвестно"}</dd> */}

            <dt className="font-medium w-52">В главных ролях:</dt>
            <dd>
              {persons
                ?.slice(0, 3)
                .map((person) => person.name)
                .join(", ") || "Неизвестно"}
            </dd>
          </dl>
        </div>
      </div>
    );
  },
);
