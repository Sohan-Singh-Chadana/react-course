import React, { useState } from "react";
import SearchBar from "./SearchBar";
import SelectMenu from "./SelectMenu";
import CountriesList from "./CountriesList";
import { useTheme } from "../hook/useTheme.js";

const Home = () => {
  const [query, setQuery] = useState("");
  const [isDark] = useTheme();
  return (
    <main className={`${isDark ? "dark" : ""}`}>
      <div className="search-filter-container">
        <SearchBar setQuery={setQuery} />
        <SelectMenu />
      </div>

      <CountriesList query={query} />
    </main>
  );
};

export default Home;
