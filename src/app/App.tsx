import { MainPage } from "@/pages/main-page";
import MoviePage from "@/pages/movie-page/ui/movie-page";
import SearchPage from "@/pages/search-page/ui/search-page";
import { Footer } from "@/shared/components";
import { Navbar } from "@/widgets/navbar";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/search/:query" element={<SearchPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
