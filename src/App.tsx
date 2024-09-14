import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import AddAgent from "./components/AddAgent/AddAgent";
import Header from "./components/Header/Header";
import Listing from "./pages/Listing/Listing";
import AddListing from "./pages/AddListing/AddListing";

function App() {
  return (
    <div className="font-firago">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="add-agent" element={<AddAgent />} />
          </Route>
          <Route path="/real-estate/:id" element={<Listing />} />
          <Route path="/add-listing/" element={<AddListing />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
