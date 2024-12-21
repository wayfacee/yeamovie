import { cn } from "@/shared/libs";
import React from "react";
import Logo from "@/shared/assets/images/logo.svg";
import { AppImage, Button, Container } from "@/shared/ui";
import { Link } from "react-router-dom";
import { footerItems } from "../model/data/footerItems";

interface Props {
  className?: string;
}

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
          {footerItems.map(({ title, link }) => (
            <Button key={title} variant="ghost" asChild>
              <Link to={link}>{title}</Link>
            </Button>
          ))}
        </div>
      </Container>
    </footer>
  );
});
