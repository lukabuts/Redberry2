import { useEffect, useState } from "react";
import dropDownImg from "../../assets/images/dropdown.svg";
import RegionsCard from "../filteringCards/RegionsCard";
import { Link } from "react-router-dom";

const FilteringCard = () => {
  const [shownFilterPopUP, setShownFilterPopUP] = useState<
    "region" | "price" | "area" | "bedrooms" | ""
  >("");

  const [selectedRegions, setSelectedRegions] = useState<number[]>(() => {
    const localStorageRegions = localStorage.getItem("selectedRegions");
    return localStorageRegions ? JSON.parse(localStorageRegions) : [];
  });

  function showRegionFilter() {
    if (shownFilterPopUP !== "region") {
      setShownFilterPopUP("region");
    } else {
      setShownFilterPopUP("");
    }
  }

  useEffect(() => {
    localStorage.setItem("selectedRegions", JSON.stringify(selectedRegions));
  }, [selectedRegions]);
  return (
    <>
      <div>
        <div className="flex gap-10 p-1.5 mb-5 border border-lightGray rounded-lg w-fit">
          <RegionsCard
            showRegionFilter={showRegionFilter}
            shownFilterPopUP={shownFilterPopUP}
            setSelectedRegions={setSelectedRegions}
            selectedRegions={selectedRegions}
          />
          <div>
            <button className="flex items-center gap-1 font-bold px-3.5 py-2 hover:bg-softGray transition-colors rounded">
              <span>საფასო კატეგორია</span>
              <img src={dropDownImg} className="w-3.5 h-3.5" alt="Dropdown" />
            </button>
          </div>
          <div>
            <button className="flex items-center gap-1 font-bold px-3.5 py-2 hover:bg-softGray transition-colors rounded">
              <span>ფართობი</span>
              <img src={dropDownImg} className="w-3.5 h-3.5" alt="Dropdown" />
            </button>
          </div>
          <div>
            <button className="flex items-center gap-1 font-bold px-3.5 py-2 hover:bg-softGray transition-colors rounded">
              <span>საძინებლების რაოდენობა</span>
              <img src={dropDownImg} className="w-3.5 h-3.5" alt="Dropdown" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex space-x-4">
        <button className="text-white bg-flameRed py-3.5 px-4 rounded-lg font-medium text-base hover:bg-hoveredFlameRed transition-colors">
          <Link to="/add-listing/">+ ლისტინგის დამატება</Link>
        </button>
        <button className="text-flameRed border border-flameRed py-3.5 px-4 rounded-lg font-medium text-base hover:bg-flameRed hover:text-white transition-colors">
          + აგენტის დამატება
        </button>
      </div>
    </>
  );
};

export default FilteringCard;
