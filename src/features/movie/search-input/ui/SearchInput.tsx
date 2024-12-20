import { cn } from "@/shared/libs/utils";
import { Search } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useClickAway } from "react-use";
import { AppImage } from "../../../../shared/ui";
import NotLoadImg from "@/shared/assets/images/not-load-img.png";
import { useGetMovieByTitleQuery } from "@/entities/movie";

interface Props {
  className?: string;
}

// мог сделать переисп., но остановился на этом :)
export const SearchInput: React.FC<Props> = ({ className }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const ref = React.useRef(null);
  const { data: movies } = useGetMovieByTitleQuery({
    title: searchQuery,
  });

  // был ли клик вне области
  useClickAway(ref, () => {
    setFocused(false);
  });

  const onClickItem = () => {
    setFocused(false);
    setSearchQuery("");
  };

  return (
    <>
      {focused && (
        <div
          onClick={() => setFocused(false)}
          className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30"
        />
      )}

      <div
        ref={ref}
        id="search-input"
        className={cn(
          "flex rounded-2xl max-w-[400px] flex-1 justify-between relative h-10 z-30 ",
          className,
        )}
      >
        <Search className="absolute top-1/2 translate-y-[-50%] right-5 h-5 text-gray-400" />
        <input
          className="rounded-[60px] outline-none w-full bg-gray-100 pl-5"
          type="text"
          placeholder="Поиск..."
          onFocus={() => setFocused(true)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {movies && movies.length > 0 && (
          <div
            className={cn(
              "absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
              focused && "visible opacity-100 top-12",
            )}
          >
            {movies.map((movie) => (
              <Link
                onClick={onClickItem}
                key={movie.id}
                className="flex items-center gap-3 px-3 py-2 hover:bg-primary/10 cursor-pointer"
                to={`/search/${movie.name}`}
              >
                <AppImage
                  className="rounded-sm h-8 w-8"
                  src={movie.poster}
                  errorFallback={
                    <img
                      src={NotLoadImg}
                      className="rounded-sm h-8 w-8"
                      alt="Image didn't load"
                    />
                  }
                  alt={movie.name}
                />
                <span>{movie.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
