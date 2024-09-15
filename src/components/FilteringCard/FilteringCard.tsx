import { useContext, useEffect, useState } from "react";
import dropDownImg from "../../assets/images/dropdown.svg";
import { TokenContext } from "../../App";
import axios from "axios";
import regionsType from "../../assets/typescript/types/regions";
import RegionsCard from "../filteringCards/RegionsCard";

const FilteringCard = () => {
  const [shownFilterPopUP, setShownFilterPopUP] = useState<
    "region" | "price" | "area" | "bedrooms" | ""
  >("");
  const [isRegionsInfoLoading, setIsRegionsInfoLoading] = useState(false);
  const [regions, setRegions] = useState<regionsType[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<number[]>(() => {
    const localStorageRegions = localStorage.getItem("selectedRegions");
    return localStorageRegions ? JSON.parse(localStorageRegions) : [];
  });
  const token = useContext(TokenContext);

  function showRegionFilter() {
    if (shownFilterPopUP !== "region") {
      setShownFilterPopUP("region");
    } else {
      setShownFilterPopUP("");
    }
    if (regions.length > 0) return;
    showRegions();
  }

  function showRegions() {
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
        console.log(res.data);
        setRegions(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsRegionsInfoLoading(false);
      });
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
            isRegionsInfoLoading={isRegionsInfoLoading}
            shownFilterPopUP={shownFilterPopUP}
            regions={regions}
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
          + ლისტინგის დამატება
        </button>
        <button className="text-flameRed border border-flameRed py-3.5 px-4 rounded-lg font-medium text-base hover:bg-flameRed hover:text-white transition-colors">
          + აგენტის დამატება
        </button>
      </div>
    </>
  );
};

export default FilteringCard;
