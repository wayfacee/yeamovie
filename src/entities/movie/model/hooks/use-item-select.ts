import React, { Dispatch, SetStateAction } from "react";
import { useSearchParams } from "react-router-dom";
import type { MovieSelectTypes } from "../types/movie.interface";

interface Props {
  items: { name: string; slug: string }[];
  type: MovieSelectTypes;
}

interface ReturnProps {
  items: { name: string; slug: string }[];
  value?: { name: string; slug: string };
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSelectItem: (data: { name: string; slug: string }) => void;
}

const getDefaultValue = (type: MovieSelectTypes): string => {
  const defaultValues: Record<MovieSelectTypes, string> = {
    страна: "Россия",
    жанр: "Драма",
    год: "2020",
    рейтинг: "от 6",
  };
  return defaultValues[type] || "";
};

export const useItemSelect = ({ items, type }: Props): ReturnProps => {
  const [searchParams, setSearchParams] = useSearchParams();
  const param = searchParams.get(type) || getDefaultValue(type);
  const [open, setOpen] = React.useState(false);

  // const param = React.useMemo(
  //   () => searchParams.get(type) || getDefaultValue(type),
  //   [searchParams, type],
  // );
  // const initialValue = React.useMemo(
  //   () => items.find((item) => item.slug === param),
  //   [items, param],
  // );
  const [value, setValue] = React.useState(
    items.find((item) => item.slug === param),
  );

  const onSelectItem = React.useCallback(
    (item: Props["items"][number]) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set(type, item.name || getDefaultValue(type));
      setSearchParams(newParams);
      setValue(item);
      setOpen(false);
    },
    [searchParams, setSearchParams, items, type],
  );

  React.useEffect(() => {
    if (!searchParams.get(type)) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set(type, getDefaultValue(type));
      setSearchParams(newParams);
    }

    // const foundCountry = items.find(
    //   (item) => item.slug.toLowerCase() === param.toLowerCase(),
    // );
    // if (foundCountry) {
    //   setValue(foundCountry);
    // }
  }, [searchParams, setSearchParams, type]);

  return {
    items,
    value,
    open,
    setOpen,
    onSelectItem,
  };
};
