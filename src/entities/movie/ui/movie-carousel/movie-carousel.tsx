import React from "react";
import { AppImage, Card, CardContent, Skeleton } from "@/shared/ui";
import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib";
import { Link } from "react-router-dom";
import { useRandomMovies } from "../../api/movie-api";
import NotLoadImg from "@/shared/assets/images/not-load-img.png";
import { MovieCarouselSkeleton } from "./movie-carousel.skeleton";

interface Props {
  className?: string;
}

export const MovieCarousel: React.FC<Props> = React.memo(({ className }) => {
  const { data, isLoading } = useRandomMovies({});

  if (isLoading) return <MovieCarouselSkeleton className={className} />;

  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      className={cn(className)}
    >
      <CarouselContent>
        {data?.map((item, index) => (
          <CarouselItem
            key={index}
            className="h-[600px] flex items-center justify-center"
          >
            <Card className="bg-[#080423] h-full flex items-center justify-center">
              <CardContent className="flex items-center justify-between text-white">
                <div className="flex flex-col gap-20">
                  <h3 className="text-3xl font-bold">
                    {item?.alternativeName}
                  </h3>

                  <div className="flex flex-col gap-3">
                    <h1 className="text-[60px] font-bold">
                      {item?.name} ({item?.year})
                    </h1>

                    <p className="text-lg h-20 w-[500px] overflow-hidden text-ellipsis line-clamp-3">
                      {item?.description}
                    </p>
                  </div>

                  <Button asChild className="w-[200px]">
                    <Link to={`/movie/${item?.id}`}>
                      Смотреть
                    </Link>
                  </Button>
                </div>

                <AppImage
                  errorFallback={
                    <img
                      src={NotLoadImg}
                      alt="not loaded"
                      className="rounded-2xl object-cover w-1/2"
                    />
                  }
                  className="rounded-2xl object-cover w-1/2"
                  fallback={
                    <Skeleton className="rounded-2xl object-cover w-1/2" />
                  }
                  src={item?.backdrop?.url}
                  alt={item?.name}
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
});
