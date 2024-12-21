import { memo } from "react";
import { Footer } from "@/widgets/Landing/Footer";
import { Header } from "@/widgets/Landing/Header";
import { AppRouter } from "./providers/router";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-1">
        <AppRouter />
      </div>

      <Footer />
    </div>
  );
};

export default memo(App);
