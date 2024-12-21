import { MovieSelect } from "@/features/movie/movie-select";
import { movieSelectConfig } from "@/shared/constants";
import { cn } from "@/shared/libs";
import React from "react";

interface Props {
  className?: string;
}

export const MovieCategories: React.FC<Props> = React.memo(({ className }) => {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <p className="py-2 px-6 bg-[#080423] rounded-[40px] text-white w-[280px] text-lg font-medium">
        Фильмы по категориям
      </p>

      <div className="flex gap-5">
        {movieSelectConfig.map((item) => (
          <MovieSelect key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
});
