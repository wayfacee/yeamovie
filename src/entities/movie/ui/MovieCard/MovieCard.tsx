import { cn } from "@/shared/libs";
import { AppImage, Skeleton } from "@/shared/ui";
import React from "react";
import NotLoadImg from "@/shared/assets/images/not-load-img.png";
import { Link } from "react-router-dom";
import { type MovieDtoV13 } from "@/shared/adapters";

interface Props {
  data?: MovieDtoV13;
  className?: string;
}

export const MovieCard: React.FC<Props> = React.memo(({ data, className }) => {
  return (
    <Link
      to={`/movie/${data?.id}`} // надо исп. абсолют. путь. пошта становится /movie/122/movie/231
      className={cn(
        "flex flex-col g-3 w-[315px] hover:scale-105 transform transition-transform duration-300 ease-in-out",
        className,
      )}
    >
      <AppImage
        fallback={<Skeleton className="w-[315px] h-[180px] rounded-xl" />}
        src={data?.backdrop?.url}
        alt={data?.name}
        errorFallback={
          <img
            src={NotLoadImg}
            alt="not loaded"
            className="w-[315px] h-[180px] rounded-xl"
          />
        }
        className="rounded-xl mb-1"
      />

      <div className="flex flex-col">
        <h5 className="font-bold text-lg">{data?.name}</h5>

        <div className="flex flex-row justify-between">
          <p className="text-[#15151547] font-medium">{data?.year}г.</p>
          <p className="text-[#FFD700] font-bold">
            {data?.rating?.kp?.toFixed(1)}
          </p>
        </div>
      </div>
    </Link>
  );
});
