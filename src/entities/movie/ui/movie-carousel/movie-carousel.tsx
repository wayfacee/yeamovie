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

  // if (true) return <MovieCarouselSkeleton className={className} />;
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
            className="h-[700px] flex items-center justify-center"
          >
            <Card className="bg-[#080423] h-full flex items-center justify-center w-full">
              <CardContent className="flex items-center justify-between text-white w-full">
                <div className="flex flex-col gap-20 max-w-[600px]">
                  <h3 className="text-3xl font-bold truncate">
                    {item?.alternativeName}
                  </h3>

                  <div className="flex flex-col gap-3">
                    <h1 className="text-[60px] font-bold leading-tight">
                      {item?.name} ({item?.year})
                    </h1>

                    <p className="text-lg line-clamp-3 max-w-[500px]">
                      {item?.description
                        ? item?.description
                        : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex fugit aliquam animi veniam, cum enim quod, officia doloremque recusandae doloribus perspiciatis magni assumenda velit numquam nam! Porro dolorum blanditiis error."}
                    </p>
                  </div>

                  <Button asChild className="max-w-[200px]">
                    <Link to={`/movie/${item?.id}`}>Смотреть</Link>
                  </Button>
                </div>

                <AppImage
                  errorFallback={
                    <img
                      src={NotLoadImg}
                      alt="not loaded"
                      // className="rounded-2xl object-cover w-1/2"
                      className="rounded-2xl object-cover w-full max-w-[400px]"
                    />
                  }
                  // className="rounded-2xl object-cover w-1/2"
                  className="rounded-2xl object-cover w-1/2"
                  fallback={
                    <Skeleton className="rounded-2xl object-cover w-1/2 h-[444px]" />
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
