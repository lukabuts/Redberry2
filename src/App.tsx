import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Listing from "./pages/Listing/Listing";
import AddListing from "./pages/AddListing/AddListing";
import React, { useEffect, useState } from "react";
import regionsType from "./assets/typescript/types/regions";
import axios from "axios";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import NotFound from "./pages/NotFound/NotFound";
import { HelmetProvider } from "react-helmet-async";
import AddAgentCard from "./components/AddAgentCard/AddAgentCard";

export const TokenContext = React.createContext("");
export const IsRegionsInfoLoadingContext = React.createContext<boolean>(false);
export const RegionsContext = React.createContext<regionsType[]>([]);
export const IsAddAgentShownContext = React.createContext<boolean>(false);
export const SetIsAddAgentShownContext = React.createContext<
  React.Dispatch<React.SetStateAction<boolean>>
>(() => {});

function App() {
  const token = "9d105f7a-1bb6-4d2a-aafb-74f8f9ea17c5";
  // Regions
  const [isRegionsInfoLoading, setIsRegionsInfoLoading] = useState(false);
  const [regions, setRegions] = useState<regionsType[]>([]);
  // Is Add Agent Shown
  const [isAddAgentShown, setIsAddAgentShown] = useState(false);

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

  return (
    <div
      className={`font-firago h-screen ${isAddAgentShown ? "overflow-y-hidden" : " overflow-y-auto"}`}
    >
      <Header />
      <ScrollToTop />
      <TokenContext.Provider value={token}>
        <IsRegionsInfoLoadingContext.Provider value={isRegionsInfoLoading}>
          <RegionsContext.Provider value={regions}>
            <IsAddAgentShownContext.Provider value={isAddAgentShown}>
              <SetIsAddAgentShownContext.Provider value={setIsAddAgentShown}>
                {isAddAgentShown && <AddAgentCard />}
                <HelmetProvider>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/real-estates/:id" element={<Listing />} />
                    <Route path="/add-listing/" element={<AddListing />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </HelmetProvider>
              </SetIsAddAgentShownContext.Provider>
            </IsAddAgentShownContext.Provider>
          </RegionsContext.Provider>
        </IsRegionsInfoLoadingContext.Provider>
      </TokenContext.Provider>
    </div>
  );
}

export default App;
