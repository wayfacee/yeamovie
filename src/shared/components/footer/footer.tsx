import { cn } from "@/shared/lib";
import React from "react";
import Logo from "../../assets/images/logo.svg";
import { AppImage, Button } from "@/shared/ui";
import { Link } from "react-router-dom";
import { Container } from "../container";

interface Props {
  className?: string;
}

const items = [
  {
    title: "Главная",
    link: "/",
  },
  {
    title: "Популярные фильмы",
    link: "/#movie-tabs",
  },
  {
    title: "Популярные сериалы",
    link: "/#movie-tabs",
  },
];

export const Footer: React.FC<Props> = React.memo(({ className }) => {
  return (
    <footer
      className={cn(
        "px-14 bg-[#080423] h-[200px] text-center text-white text-base flex items-center",
        className,
      )}
    >
      <Container className="flex justify-between items-center w-full">
        <AppImage src={Logo} alt="KinoMonster" />

        <div className="flex flex-row gap-10">
          {items.map(({ title, link }) => (
            <Button key={title} variant="ghost" asChild>
              <Link to={link}>{title}</Link>
            </Button>
          ))}
        </div>
      </Container>
    </footer>
  );
});
