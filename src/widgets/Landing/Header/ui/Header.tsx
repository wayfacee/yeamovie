import { cn } from "@/shared/libs";
import React from "react";
import LogoSvg from "@/shared/assets/images/logo.svg";
import { Container } from "@/shared/ui";
import { SearchInput } from "@/features/movie/search-input";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header
      className={cn("bg-[#080423] sticky top-0 shadow-lg z-10", className)}
    >
      <Container className="flex justify-between items-center px-24 py-3 ">
        <img src={LogoSvg} alt="KinoMonster" />

        <SearchInput />
        <span />
      </Container>
    </header>
  );
};
