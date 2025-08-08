import React from "react";
import DiscoverSection from "./components/DiscoverSection";
import SearchComponent from "./components/SearchComponent";

export default function Home() {
  return (
    <div>
      <SearchComponent />
      <DiscoverSection />
    </div>
  );
}
