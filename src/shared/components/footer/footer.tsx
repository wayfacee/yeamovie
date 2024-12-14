import { cn } from "@/shared/lib";
import React from "react";
import Logo from "../../assets/images/logo.svg";
import { AppImage, Button } from "@/shared/ui";
import { Link } from "react-router-dom";

interface Props {
  className?: string;
}

export const Footer: React.FC<Props> = React.memo(({ className }) => {
  const items = React.useMemo(
    () => [
      {
        title: "Главная",
        link: "/",
      },
      {
        title: "Популярные фильмы",
        link: "/",
      },
      {
        title: "Популярные сериалы",
        link: "/",
      },
    ],
    [],
  );

  return (
    <div
      className={cn(
        "px-14 flex flex-row justify-between items-center text-center bg-[#080423] text-white text-base h-[200px]",
        className,
      )}
    >
      <AppImage src={Logo} alt="KinoMonster" />

      <div className="flex flex-row gap-10">
        {items.map(({ title, link }) => (
          <Button  key={title} variant="ghost" asChild>
            <Link to={link}>{title}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
});
