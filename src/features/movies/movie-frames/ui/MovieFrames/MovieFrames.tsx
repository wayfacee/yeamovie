import { cn } from "@/shared/libs";
import { AppImage, Skeleton } from "@/shared/ui";
import React from "react";
import NotLoadImg from "@/shared/assets/images/not-load-img.png";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

interface Props {
  frame?: string;
  className?: string;
}

export const MovieFrames: React.FC<Props> = React.memo(
  ({ frame, className }) => {
    const [open, setOpen] = React.useState(false);

    // if (!frame) return "load";

    return (
      <div className={cn("flex flex-col items-center gap-12", className)}>
        <h1 className="w-[260px] font-medium text-lg rounded-3xl py-2 px-11 text-white border-slate-900 bg-slate-900">
          Кадры из фильма
        </h1>

        <div className={"grid grid-cols-4 gap-11 w-full"}>
          {[...Array(8)].map((_, index) => (
            <AppImage
              onClick={() => setOpen(true)}
              fallback={<Skeleton className="w-[315px] h-[180px] rounded-xl" />}
              errorFallback={
                <img
                  src={NotLoadImg}
                  alt="not loaded"
                  className="w-[315px] h-[180px] rounded-xl hover:scale-105 transform transition-transform duration-300 ease-in-out"
                />
              }
              src={frame}
              key={index}
              className="w-[315px] h-[180px] rounded-xl hover:scale-105 transform transition-transform duration-300 ease-in-out"
            />
          ))}
        </div>

        {frame && (
          <Lightbox
            plugins={[Thumbnails]}
            open={open}
            close={() => setOpen(false)}
            slides={[...Array(8)].map(() => ({ src: frame }))}
          />
        )}
      </div>
    );
  },
);
