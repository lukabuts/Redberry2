import { useContext, useEffect } from "react";
import RegionsCardInterface from "../../assets/typescript/interfaces/regionsCardInterface";
import { RegionsContext } from "../../App";
import ShowFilteringButtonCard from "../FilterRegionsCardWrappers/ShowFilteringButtonCard";
import FilterRegionsCardWrapper from "../FilterRegionsCardWrappers/FilterPopupWrapper";
import { ShownFilterContext } from "../FilteringCard/FilteringCard";

const RegionsCard = ({
  setSelectedRegions,
  selectedRegions,
}: RegionsCardInterface) => {
  // Regions
  const regions = useContext(RegionsContext);
  // Filters
  const shownFilter = useContext(ShownFilterContext);
  // Save Entered Regions Info in LocalStorage
  useEffect(() => {
    localStorage.setItem("enteredRegions", JSON.stringify(selectedRegions));
  }, [selectedRegions]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, id: number) {
    if (
      !selectedRegions.find((regId) => regId === id) &&
      e.target.checked === true
    ) {
      setSelectedRegions([...selectedRegions, id]);
    }
    if (
      selectedRegions.find((regId) => regId === id) &&
      e.target.checked === false
    ) {
      const filteredRegions = selectedRegions.filter((regId) => regId !== id);
      setSelectedRegions(filteredRegions);
    }
  }
  return (
    <div className="relative">
      <ShowFilteringButtonCard filter="region">რეგიონი</ShowFilteringButtonCard>
      {shownFilter === "region" && (
        <FilterRegionsCardWrapper
          title="რეგიონის მიხედვით"
          isButtonDisabled={selectedRegions.length === 0}
        >
          <div className="grid grid-cols-3 w-max gap-x-14 gap-y-2">
            {regions.map((region) => (
              <button key={region.id} className="shrink-0 py-1">
                <label
                  htmlFor={String(region.id)}
                  className="cursor-pointer flex gap-2 items-center"
                >
                  <input
                    type="checkbox"
                    name="region"
                    value={region.name}
                    id={String(region.id)}
                    className="w-5 h-5 bg-softGray rounded-sm accent-successColor"
                    onChange={(e) => {
                      handleChange(e, region.id);
                    }}
                    checked={selectedRegions.some(
                      (regId) => regId === region.id
                    )}
                  />
                  <span className="text-deepBlue">{region.name}</span>
                </label>
              </button>
            ))}
          </div>
        </FilterRegionsCardWrapper>
      )}
    </div>
  );
};

export default RegionsCard;
