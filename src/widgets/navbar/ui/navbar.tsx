
import { cn } from "@/shared/lib";
import React from "react";
import LogoSvg from "@/shared/assets/images/logo.svg";
import { SearchInput } from "@/shared/components";

interface Props {
  className?: string;
}

export const Navbar: React.FC<Props> = ({ className }) => {
  return (
    <header
      className={cn(
        "flex justify-between items-center px-24 py-3 bg-[#080423]",
        className,
      )}
    >
      <img src={LogoSvg} alt="KinoMonster" />

      <SearchInput />
      <span />
    </header>
  );
};
