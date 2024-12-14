import { cn } from "@/shared/lib";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Skeleton,
} from "@/shared/ui";
import React from "react";

interface Props {
  withTitle?: boolean;
  className?: string;
}

export const MovieRecommendationsSkeleton: React.FC<Props> = React.memo(
  ({ withTitle = true, className }) => {
    return (
      <div className="flex flex-col justify-center items-center">
        {withTitle ? (
          <Skeleton className="w-[285px] h-7 mb-10" />
        ) : (
          <h3 className="text-xl font-medium mb-10">
            Возможно, вам понравится
          </h3>
        )}

        <div className={cn("flex items-center justify-center", className)}>
          <Carousel className="w-full max-w-7xl">
            <CarouselContent className="flex gap-9 justify-center">
              {[...Array(9)].map((_, index) => (
                <CarouselItem
                  key={index}
                  className="flex-shrink-0 w-full max-w-sm"
                >
                  <Skeleton
                    key={index}
                    className="w-[360px] h-[335px] max-w-sm "
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    );
  },
);
