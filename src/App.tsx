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
import { realEstateType } from "./assets/typescript/types/realEstateType";

export const TokenContext = React.createContext("");
export const IsRegionsInfoLoadingContext = React.createContext<boolean>(false);
export const RegionsContext = React.createContext<regionsType[]>([]);
export const RealEstatesContext = React.createContext<realEstateType[]>([]);
export const IsRealEstatesLoadingContext = React.createContext<boolean>(false);
export const RealEstatesErrorContext = React.createContext<string>("");

function App() {
  const location = useLocation();
  const token = "9d0865a9-c373-437a-b5a2-8ae953972b5c";
  // Regions
  const [isRegionsInfoLoading, setIsRegionsInfoLoading] = useState(false);
  const [regions, setRegions] = useState<regionsType[]>([]);
  // Real estates
  const [realEstates, setRealEstates] = useState<realEstateType[]>([]);
  const [isRealEstatesLoading, setIsRealEstatesLoading] = useState(false);
  const [realEstatesError, setRealEstatesError] = useState("");
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
  useEffect(() => {
    console.log("changes");

    setIsRealEstatesLoading(true);
    axios
      .get(
        "https://api.real-estate-manager.redberryinternship.ge/api/real-estates",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setRealEstates(res.data);
      })
      .catch((err) => {
        console.log(err);
        setRealEstatesError(err.message);
      })
      .finally(() => {
        setIsRealEstatesLoading(false);
      });
  }, [location]);
  return (
    <div className="font-firago">
      <Header />
      <ScrollToTop />
      <TokenContext.Provider value={token}>
        <IsRegionsInfoLoadingContext.Provider value={isRegionsInfoLoading}>
          <RegionsContext.Provider value={regions}>
            <RealEstatesContext.Provider value={realEstates}>
              <IsRealEstatesLoadingContext.Provider
                value={isRealEstatesLoading}
              >
                <RealEstatesErrorContext.Provider value={realEstatesError}>
                  <Routes>
                    <Route path="/" element={<Home />}>
                      <Route path="add-agent" element={<AddAgent />} />
                    </Route>
                    <Route path="/real-estates/:id" element={<Listing />} />
                    <Route path="/add-listing/" element={<AddListing />} />
                  </Routes>
                </RealEstatesErrorContext.Provider>
              </IsRealEstatesLoadingContext.Provider>
            </RealEstatesContext.Provider>
          </RegionsContext.Provider>
        </IsRegionsInfoLoadingContext.Provider>
      </TokenContext.Provider>
    </div>
  );
}

export default App;
