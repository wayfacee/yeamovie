import React from "react";
import { MovieCard } from "../movie-card/movie-card";
import { type MovieDtoV13 } from "@/shared/adapters";
import { MovieCardSkeleton } from "../movie-card/movie-card.skeleton";
import { Link } from "react-router-dom";
import { Button } from "@/shared/ui";
import { ChevronRight } from "lucide-react";

interface Props {
  data?: MovieDtoV13[];
  count?: number;
  isLoading: boolean;
  isFetching: boolean;
  className?: string;
}

const getSkeletons = (count = 8) =>
  [...Array(count)].map((_, index) => <MovieCardSkeleton key={index} />);

export const MovieList: React.FC<Props> = React.memo(
  ({ data, count, isLoading, isFetching, className }) => {
    return (
      <div className={className}>
        {data && data.length > 0 && (
          <div className="flex justify-end mb-4">
            <Button className="text-black" variant="link">
              <Link to="/">Смотреть все</Link>
              <ChevronRight />
            </Button>
          </div>
        )}

        {(isLoading || isFetching || data) && (
          <div className="grid justify-self-center">
            <div className={"grid grid-cols-4 gap-11 w-full"}>
              {(isLoading || isFetching) && getSkeletons(count)}

              {data &&
                data.length > 0 &&
                data.map((data) => <MovieCard key={data.id} data={data} />)}
            </div>
          </div>
        )}

        {!isLoading && !isFetching && (!data || data.length === 0) && (
          <div className="flex items-start justify-start">
            <p className="text-start text-base font-medium border-2 py-2 px-5 text-white rounded-3xl bg-gray-600 border-gray-600">
              Данные отсутствуют
            </p>
          </div>
        )}
      </div>
    );
  },
);
