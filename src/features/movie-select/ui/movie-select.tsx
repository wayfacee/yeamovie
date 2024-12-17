import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui";
import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/shared/lib";
import { MovieSelectSkeleton } from "./movie-select.skeleton";
import { useMovieSelect } from "../model/hooks/use-movie-select";
import type { MovieSelectProps, MovieSelectTypes } from "../model/types/movie.interface";
import { useItemSelect } from "../model/hooks/use-item-select";

interface Props {
  data: MovieSelectProps;
}

export const MovieSelect: React.FC<Props> = React.memo(({ data }) => {
  const {
    categoryItems,
    label,
    category,
    triggerValue,
    isLoadingCountries,
    isLoadingGenres,
  } = useMovieSelect(data);

  const { open, items, setOpen, value, onSelectItem } = useItemSelect({
    items: categoryItems || [],
    type: category
      ? (category as MovieSelectTypes)
      : (label.toLowerCase() as MovieSelectTypes),
  });

  if (isLoadingCountries || isLoadingGenres) {
    return <MovieSelectSkeleton />;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between text-black"
          style={{ color: "black" }}
        >
          {value?.name || triggerValue}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={triggerValue} />
          <CommandList>
            <CommandEmpty>Не найдено</CommandEmpty>
            <CommandGroup>
              {items?.map(({ name, slug }) => (
                <CommandItem
                  key={slug}
                  value={name}
                  onSelect={() => onSelectItem({ name, slug })}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value?.name === name ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
});
