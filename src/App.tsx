import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import AddAgent from "./pages/AddAgent/AddAgent";
import Header from "./components/Header/Header";
import Listing from "./pages/Listing/Listing";
import AddListing from "./pages/AddListing/AddListing";
import React, { useEffect, useState } from "react";
import regionsType from "./assets/typescript/types/regions";
import axios from "axios";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

export const TokenContext = React.createContext("");
export const IsRegionsInfoLoadingContext = React.createContext<boolean>(false);
export const RegionsContext = React.createContext<regionsType[]>([]);

function App() {
  const location = useLocation();
  const token = "9d0865a9-c373-437a-b5a2-8ae953972b5c";
  // Regions
  const [isRegionsInfoLoading, setIsRegionsInfoLoading] = useState(false);
  const [regions, setRegions] = useState<regionsType[]>([]);

  // Get Regions
  useEffect(() => {
    setIsRegionsInfoLoading(true);
    axios
      .get(
        "https://api.real-estate-manager.redberryinternship.ge/api/regions",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setRegions(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsRegionsInfoLoading(false);
      });
  }, []);
  // Get Real Estates
  useEffect(() => {}, [location.pathname]);

  return (
    <div className="font-firago">
      <Header />
      <ScrollToTop />
      <TokenContext.Provider value={token}>
        <IsRegionsInfoLoadingContext.Provider value={isRegionsInfoLoading}>
          <RegionsContext.Provider value={regions}>
            <Routes>
              <Route path="/" element={<Home />}>
                <Route path="add-agent" element={<AddAgent />} />
              </Route>
              <Route path="/real-estates/:id" element={<Listing />} />
              <Route path="/add-listing/" element={<AddListing />} />
            </Routes>
          </RegionsContext.Provider>
        </IsRegionsInfoLoadingContext.Provider>
      </TokenContext.Provider>
    </div>
  );
}

export default App;
