import { cn } from "@/shared/lib";
import {
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  Skeleton,
} from "@/shared/ui";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

interface Props {
  className?: string;
}

export const MovieCarouselSkeleton: React.FC<Props> = React.memo(
  ({ className }) => {
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
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="h-[600px] flex items-center justify-center"
            >
              <Card className="bg-[#080423] h-full flex items-center justify-center w-full">
                <CardContent className="flex items-center justify-between w-full">
                  <div className="flex flex-col gap-20">
                    <Skeleton className="w-[300px] h-9" />

                    <div className="flex flex-col gap-3">
                      <Skeleton className="w-[600px] h-24" />

                      <Skeleton className="w-[500px] h-20" />
                    </div>

                    <Skeleton className="w-[200px] h-9" />
                  </div>

                  <Skeleton className="bg-secondary rounded-2xl w-1/2" />
                  {/* <p className="rounded-2xl object-cover w-1/2">sdfghjgfdsa</p> */}
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  },
);
