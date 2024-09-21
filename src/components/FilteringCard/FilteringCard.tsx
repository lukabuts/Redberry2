import React, { createContext, useContext, useEffect, useState } from "react";
import RegionsCard from "../filteringCards/RegionsCard";
import { Link } from "react-router-dom";
import NotFilledButtonCard from "../Buttons/NotFilledButtonCard";
import FilledButtonCard from "../Buttons/FilledButtonCard";
import PriceCategoryCard from "../filteringCards/PriceCategoryCard";
import AreaCard from "../filteringCards/AreaCard";
import BedroomCard from "../filteringCards/BedroomCard";
import { filtersType } from "../../assets/typescript/types/filtersType";
import { RegionsContext, SetIsAddAgentShownContext } from "../../App";
import ShowSelectedFiltersCard from "../filteringCards/ShowSelectedFiltersCard";
import { FilteringCardInterface } from "../../assets/typescript/interfaces/filteringCardInterface";
import PlusIcon from "../Icons/PlusIcon";

export const ShownFilterContext = React.createContext<
  "region" | "price" | "area" | "bedrooms" | ""
>("");
export const SetShownFilterContext = React.createContext<
  React.Dispatch<
    React.SetStateAction<"region" | "price" | "area" | "bedrooms" | "">
  >
>(() => {});
export const SaveSelectedFiltersContext = createContext<() => void>(() => {});

const FilteringCard = ({
  selectedFilters,
  setSelectedFilters,
  isAnyFilterSelected,
}: FilteringCardInterface) => {
  // setIsAddAgentShown
  const setIsAddAgentShown = useContext(SetIsAddAgentShownContext);
  // Filtering Types
  const [shownFilter, setShownFilter] = useState<
    "region" | "price" | "area" | "bedrooms" | ""
  >("");
  // Regions
  const regions = useContext(RegionsContext);
  // Selected Regions

  const [selectedRegions, setSelectedRegions] = useState<number[]>(() => {
    const localStorageRegions = localStorage.getItem("enteredRegions");
    return localStorageRegions ? JSON.parse(localStorageRegions) : [];
  });
  // Price
  const localStoragePrices = localStorage.getItem("enteredPrices");
  const [minPrice, setMinPrice] = useState(
    localStoragePrices ? JSON.parse(localStoragePrices)[0] : ""
  );
  const [maxPrice, setMaxPrice] = useState(
    localStoragePrices ? JSON.parse(localStoragePrices)[1] : ""
  );
  const [isPriceError, setIsPriceError] = useState(false);
  // Area
  const localStorageAreas = localStorage.getItem("enteredAreas");
  const [minArea, setMinArea] = useState(
    localStorageAreas ? JSON.parse(localStorageAreas)[0] : ""
  );
  const [maxArea, setMaxArea] = useState(
    localStorageAreas ? JSON.parse(localStorageAreas)[1] : ""
  );
  const [isAreaError, setIsAreaError] = useState(false);
  // Bedrooms
  const [bedrooms, setBedrooms] = useState(() => {
    const localStorageBedrooms = localStorage.getItem("enteredBedrooms");
    return localStorageBedrooms ? JSON.parse(localStorageBedrooms) : "";
  });
  const [isBedroomError, setIsBedroomError] = useState(false);

  function saveSelectedFilters() {
    // Set Selected Filters
    const filters: filtersType = selectedFilters || {
      maxArea: "",
      minArea: "",
      bedrooms: "",
      maxPrice: "",
      minPrice: "",
      selectedRegions: [],
    };
    if (shownFilter === "area" && !isAreaError) {
      filters.maxArea = maxArea;
      filters.minArea = minArea;
    } else if (shownFilter === "bedrooms" && !isBedroomError) {
      filters.bedrooms = bedrooms;
    } else if (shownFilter === "price" && !isPriceError) {
      filters.maxPrice = maxPrice;
      filters.minPrice = minPrice;
    } else if (shownFilter === "region") {
      filters.selectedRegions = selectedRegions;
    }
    setSelectedFilters({ ...filters });

    // Close PopUp
    setShownFilter("");
  }

  useEffect(() => {
    // Set Selected Filters to LocalStorage
    localStorage.setItem("filters", JSON.stringify(selectedFilters));
  }, [selectedFilters]);
  return (
    <ShownFilterContext.Provider value={shownFilter}>
      <SetShownFilterContext.Provider value={setShownFilter}>
        <SaveSelectedFiltersContext.Provider value={saveSelectedFilters}>
          <div className="flex justify-between  items-center">
            {/* Filters */}
            <div className="flex gap-6 border border-lightGray rounded-lg w-fit p-1.5">
              <RegionsCard
                setSelectedRegions={setSelectedRegions}
                selectedRegions={selectedRegions}
              />
              <PriceCategoryCard
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                isPriceError={isPriceError}
                setIsPriceError={setIsPriceError}
              />
              <AreaCard
                minArea={minArea}
                setMinArea={setMinArea}
                maxArea={maxArea}
                setMaxArea={setMaxArea}
                isAreaError={isAreaError}
                setIsAreaError={setIsAreaError}
              />
              <BedroomCard
                bedrooms={bedrooms}
                setBedrooms={setBedrooms}
                isBedroomError={isBedroomError}
                setIsBedroomError={setIsBedroomError}
              />
            </div>

            {/* Navigation Buttons */}
            <div className="flex space-x-4">
              <Link to="/add-listing">
                <FilledButtonCard>
                  <div className="flex items-center gap-1">
                    <PlusIcon />
                    <span>ლისტინგის დამატება</span>
                  </div>
                </FilledButtonCard>
              </Link>

              <NotFilledButtonCard
                onClick={() => {
                  setIsAddAgentShown(true);
                }}
              >
                <div className="flex items-center gap-1 add-agent-div">
                  <PlusIcon />
                  <span>აგენტის დამატება</span>
                </div>
              </NotFilledButtonCard>
            </div>
          </div>
          {/* Show Selected Filters */}
          {selectedFilters && isAnyFilterSelected && (
            <div className="mt-4 flex gap-2 overflow-x-auto">
              {/* Show Regions */}
              {regions
                .filter((region) =>
                  selectedFilters.selectedRegions.includes(region.id)
                )
                .map((selectedRegion) => (
                  <ShowSelectedFiltersCard
                    key={selectedRegion.id}
                    onClick={() => {
                      const filteredSelectedEstates = selectedFilters;
                      filteredSelectedEstates.selectedRegions =
                        filteredSelectedEstates.selectedRegions.filter(
                          (region) => region !== selectedRegion.id
                        );
                      setSelectedFilters({ ...filteredSelectedEstates });
                    }}
                  >
                    {selectedRegion.name}
                  </ShowSelectedFiltersCard>
                ))}
              {selectedFilters.minPrice && selectedFilters.maxPrice && (
                <ShowSelectedFiltersCard
                  onClick={() => {
                    const filteredSelectedEstates = selectedFilters;
                    filteredSelectedEstates.maxPrice = "";
                    filteredSelectedEstates.minPrice = "";
                    setSelectedFilters({ ...filteredSelectedEstates });
                  }}
                >
                  {selectedFilters.minPrice}₾ - {selectedFilters.maxPrice}₾
                </ShowSelectedFiltersCard>
              )}
              {selectedFilters.minArea && selectedFilters.maxArea && (
                <ShowSelectedFiltersCard
                  onClick={() => {
                    const filteredSelectedEstates = selectedFilters;
                    filteredSelectedEstates.maxArea = "";
                    filteredSelectedEstates.minArea = "";
                    setSelectedFilters({ ...filteredSelectedEstates });
                  }}
                >
                  {selectedFilters.minArea}მ<sup>2</sup> -{" "}
                  {selectedFilters.maxArea}მ<sup>2</sup>
                </ShowSelectedFiltersCard>
              )}
              {selectedFilters.bedrooms && (
                <ShowSelectedFiltersCard
                  onClick={() => {
                    const filteredSelectedEstates = selectedFilters;
                    filteredSelectedEstates.bedrooms = "";
                    setSelectedFilters({ ...filteredSelectedEstates });
                  }}
                >
                  {selectedFilters.bedrooms}
                </ShowSelectedFiltersCard>
              )}
              {/* Clear Filters */}
              <button
                className="text-sm font-semibold ml-2"
                onClick={() => {
                  setSelectedFilters(null);
                }}
              >
                გასუფთავება
              </button>
            </div>
          )}
        </SaveSelectedFiltersContext.Provider>
      </SetShownFilterContext.Provider>
    </ShownFilterContext.Provider>
  );
};

export default FilteringCard;
