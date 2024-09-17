import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import AddAgent from "./components/AddAgent/AddAgent";
import Header from "./components/Header/Header";
import Listing from "./pages/Listing/Listing";
import AddListing from "./pages/AddListing/AddListing";
import React, { createContext, useEffect, useState } from "react";
import regionsType from "./assets/typescript/types/regions";
import axios from "axios";

export const TokenContext = createContext("");
export const IsRegionsInfoLoadingContext = React.createContext<boolean>(false);
export const RegionsContext = React.createContext<regionsType[]>([]);

function App() {
  const token =
    "https://api.real-estate-manager.redberryinternship.ge/api/regions";
  const [isRegionsInfoLoading, setIsRegionsInfoLoading] = useState(false);
  const [regions, setRegions] = useState<regionsType[]>([]);

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
    <div className="font-firago">
      <Router>
        <Header />
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
      </Router>
    </div>
  );
}

export default App;
