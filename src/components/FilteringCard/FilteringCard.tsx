import { useEffect, useState } from "react";
import dropDownImg from "../../assets/images/dropdown.svg";
import RegionsCard from "../filteringCards/RegionsCard";
import { Link } from "react-router-dom";
import NotFilledButtonCard from "../Buttons/NotFilledButtonCard";
import FilledButtonCard from "../Buttons/FilledButtonCard";

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
        <div className="flex gap-10 p-1.5 border border-lightGray rounded-lg w-fit">
          <RegionsCard
            showRegionFilter={showRegionFilter}
            shownFilterPopUP={shownFilterPopUP}
            setSelectedRegions={setSelectedRegions}
            selectedRegions={selectedRegions}
          />
          <div>
            <button className="flex items-center gap-1 font-bold px-3.5 py-2 hover:bg-softGray transition-colors rounded">
              <span>საფასო კატეგორია</span>
              <img
                loading="lazy"
                src={dropDownImg}
                className="w-3.5 h-3.5"
                alt="Dropdown"
              />
            </button>
          </div>
          <div>
            <button className="flex items-center gap-1 font-bold px-3.5 py-2 hover:bg-softGray transition-colors rounded">
              <span>ფართობი</span>
              <img
                loading="lazy"
                src={dropDownImg}
                className="w-3.5 h-3.5"
                alt="Dropdown"
              />
            </button>
          </div>
          <div>
            <button className="flex items-center gap-1 font-bold px-3.5 py-2 hover:bg-softGray transition-colors rounded">
              <span>საძინებლების რაოდენობა</span>
              <img
                loading="lazy"
                src={dropDownImg}
                className="w-3.5 h-3.5"
                alt="Dropdown"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="flex space-x-4">
        <Link to="/add-listing">
          <FilledButtonCard>+ ლისტინგის დამატება</FilledButtonCard>
        </Link>

        <Link to={"/add-agent"}>
          <NotFilledButtonCard>+ აგენტის დამატება</NotFilledButtonCard>
        </Link>
      </div>
    </>
  );
};

export default FilteringCard;
