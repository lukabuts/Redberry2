import { Routes, Route } from "react-router-dom";
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
export const IsAddAgentShownContext = React.createContext<boolean>(false);
export const SetIsAddAgentShownContext = React.createContext<
  React.Dispatch<React.SetStateAction<boolean>>
>(() => {});

function App() {
  const token = "9d0865a9-c373-437a-b5a2-8ae953972b5c";
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
                {isAddAgentShown && <AddAgent />}
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/real-estates/:id" element={<Listing />} />
                  <Route path="/add-listing/" element={<AddListing />} />
                </Routes>
              </SetIsAddAgentShownContext.Provider>
            </IsAddAgentShownContext.Provider>
          </RegionsContext.Provider>
        </IsRegionsInfoLoadingContext.Provider>
      </TokenContext.Provider>
    </div>
  );
}

export default App;
