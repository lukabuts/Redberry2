import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import AddAgent from "./components/AddAgent/AddAgent";
import Header from "./components/Header/Header";
import Listing from "./pages/Listing/Listing";
import AddListing from "./pages/AddListing/AddListing";
import { createContext } from "react";

export const TokenContext = createContext("");

function App() {
  const token =
    "https://api.real-estate-manager.redberryinternship.ge/api/regions";
  return (
    <div className="font-firago">
      <Router>
        <Header />
        <TokenContext.Provider value={token}>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="add-agent" element={<AddAgent />} />
            </Route>
            <Route path="/real-estate/:id" element={<Listing />} />
            <Route path="/add-listing/" element={<AddListing />} />
          </Routes>
        </TokenContext.Provider>
      </Router>
    </div>
  );
}

export default App;
