import { useEffect, useState } from "react";
import dropDownImg from "../../assets/images/dropdown.svg";
import RegionsCard from "../filteringCards/RegionsCard";
import { Link } from "react-router-dom";
import NotFilledButtonCard from "../Buttons/NotFilledButtonCard";
import FilledButtonCard from "../Buttons/FilledButtonCard";

const FilteringCard = () => {
  const [selectedRegions, setSelectedRegions] = useState<number[]>(() => {
    const localStorageRegions = localStorage.getItem("selectedRegions");
    return localStorageRegions ? JSON.parse(localStorageRegions) : [];
  });

  useEffect(() => {
    localStorage.setItem("selectedRegions", JSON.stringify(selectedRegions));
  }, [selectedRegions]);
  return (
    <>
      <div>
        <div className="flex gap-10 border border-lightGray rounded-lg w-fit">
          <RegionsCard
            setSelectedRegions={setSelectedRegions}
            selectedRegions={selectedRegions}
          />
          <div>
            <button
              className="flex items-center h-full text-nowrap gap-1 font-bold px-5 py-3.5 hover:bg-softGray transition-colors rounded"
              popovertarget="poppp"
            >
              <span>საფასო კატეგორია</span>
              <img
                loading="lazy"
                src={dropDownImg}
                className="w-3.5 h-3.5"
                alt="Dropdown"
              />
            </button>
            <div id="poppp" popover="">
              HI there
            </div>
          </div>
          <div>
            <button
              className="flex items-center h-full text-nowrap gap-1 font-bold px-3.5 py-2 hover:bg-softGray transition-colors rounded"
              popovertarget="poppp2"
            >
              <span>ფართობი</span>
              <img
                loading="lazy"
                src={dropDownImg}
                className="w-3.5 h-3.5"
                alt="Dropdown"
              />
            </button>
            <div id="poppp2" popover="">
              Hola
            </div>
          </div>
          <div>
            <button className="flex items-center h-full text-nowrap gap-1 font-bold px-3.5 py-2 hover:bg-softGray transition-colors rounded">
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
