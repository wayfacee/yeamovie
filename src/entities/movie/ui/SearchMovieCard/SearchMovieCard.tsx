import { cn } from "@/shared/libs";
import { AppImage, Button, Skeleton } from "@/shared/ui";
import { type MeiliMovieEntity } from "@/shared/adapters";
import React from "react";
import { Link } from "react-router-dom";
import NotLoadImg from "@/shared/assets/images/not-loaded.png";
import cl from "./SearchMovieCard.module.scss";

interface Props {
  data: MeiliMovieEntity;
  className?: string;
}

export const SearchMovieCard: React.FC<Props> = React.memo(
  ({ data, className }) => {
    const [active, setActive] = React.useState(false);
    const { id, poster, name, description, rating, year, genres, countries } =
      data;

    let newRating = rating.toFixed(1);
    if (Number(newRating) === 0) newRating = "6.4";

    return (
      <div className={cn("flex items-center gap-12", className)}>
        <AppImage
          fallback={<Skeleton className="w-[480px] h-full rounded-xl" />}
          src={poster}
          alt={name}
          errorFallback={
            <img
              src={NotLoadImg}
              alt="Image not loaded..."
              className={`w-[480px] h-full rounded-xl ${cl.animate}`}
            />
          }
          className={`w-[480px] h-full rounded-xl ${cl.animate}`}
        />

        <div>
          <div className="flex justify-between items-center mb-7">
            <h1 className="text-7xl font-bold w-[600px]">{name}</h1>

            <div className="flex flex-col gap-2">
              <p className="text-xl font-bold text-[#FFD233]">
                Кинопоиск {newRating}/10
              </p>
            </div>
          </div>

          <p className="text-lg mb-6 w-[800px]">{description}</p>

          <dl className="grid grid-cols-[max-content_auto] gap-x-12 gap-y-5 text-lg text-gray-500 mb-16">
            <dt className="font-medium">Жанр:</dt>
            <dd>{genres?.map((genre) => genre).join(", ") || "Неизвестно"}</dd>

            <dt className="font-medium">Страна:</dt>
            <dd>
              {countries?.map((country) => country).join(", ") || "Неизвестно"}
            </dd>

            <dt className="font-medium">Год:</dt>
            <dd>{year || "Неизвестно"}</dd>

            {/* <dt className="font-bold">Режиссер:</dt> */}
            {/* <dd>{director?.name || "Неизвестно"}</dd> */}

            {/* <dt className="font-medium w-52">В главных ролях:</dt>
            <dd>
              {persons
                ?.slice(0, 3)
                .map((person) => person.name)
                .join(", ") || "Неизвестно"}
            </dd> */}
          </dl>

          <div className="flex gap-5 items-center">
            <Button asChild className={`w-[200px] ${cl.animate}`}>
              <Link to={`/movie/${id}`}>Смотреть</Link>
            </Button>

            <Button
              variant={active ? "secondary" : "outline"}
              onClick={() => setActive(!active)}
              className={`w-[210px] ${cl.animate}`}
            >
              {active ? "Удалить из избранного" : "В избранное"}
            </Button>
          </div>
        </div>
      </div>
    );
  },
);
