import { MovieCard, useLazyGetRandomMoviesQuery } from "@/entities/movie";
import { cn } from "@/shared/libs";
import {
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui";
import React from "react";
import { MovieRecommendationsSkeleton } from "./MovieRecommendations.skeleton";

interface Props {
  className?: string;
}

const MovieRecommendations: React.FC<Props> = React.memo(({ className }) => {
  const [getRandomMovies, { data, isLoading, isFetching }] =
    useLazyGetRandomMoviesQuery();

  React.useEffect(() => {
    getRandomMovies({ paginate: 9 });
  }, []);

  if (isLoading || isFetching)
    return <MovieRecommendationsSkeleton withTitle={false} />;

  return (
    <div className="flex flex-col justify-center items-center">
      <h3 className="text-xl font-medium mb-10">Возможно, вам понравится</h3>
      <div className={cn("flex items-center justify-center", className)}>
        <Carousel className="w-full max-w-7xl">
          <CarouselContent className="flex gap-9 justify-center">
            {/* {(isLoading || isFetching) &&
              [...Array(9)].map((_, index) => (
                <CarouselItem
                  key={index}
                  className="flex-shrink-0 w-full max-w-sm"
                >
                  <Skeleton
                    key={index}
                    className="w-[360px] h-[335px] max-w-sm "
                  />
                </CarouselItem>
              ))} */}

            {data?.map((item, index) => (
              <CarouselItem
                key={index}
                className="flex-shrink-0 w-full max-w-sm"
              >
                <div className="p-1">
                  <Card>
                    <CardContent>
                      <MovieCard
                        data={item}
                        className="flex aspect-square w-full items-center justify-center"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
});

export default MovieRecommendations;
