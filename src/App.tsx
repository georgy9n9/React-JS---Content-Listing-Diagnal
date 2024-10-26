import { useEffect } from "react";

import "./App.scss";
import ListingGrid from "./components/ListingGrid";
import Navbar from "./components/Navbar";
import { NavbarShadeImg } from "./utils/images";

const App = () => {
  // Setting the navbar background image on app mount
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--navbar-shade",
      `url(${NavbarShadeImg})`
    );
  }, []);

  return (
    <>
      <Navbar />
      <ListingGrid />
    </>
  );
};

export default App;
