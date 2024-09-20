import { useContext, useEffect } from "react";
import AreaCardInterface from "../../assets/typescript/interfaces/areaCardInterface";
import FilterPopupWrapper from "../FilterRegionsCardWrappers/FilterPopupWrapper";
import ShowFilteringButtonCard from "../FilterRegionsCardWrappers/ShowFilteringButtonCard";
import FilterInputCard from "./FilterInputCard";
import UListCard from "./UListCard";
import { validatePriceAndArea } from "../../utils/validatePriceAndAreaFilters";
import { ShownFilterContext } from "../FilteringCard/FilteringCard";

const AreaCard = ({
  setMinArea,
  minArea,
  setMaxArea,
  maxArea,
  isAreaError,
  setIsAreaError,
}: AreaCardInterface) => {
  // Filters
  const shownFilter = useContext(ShownFilterContext);
  // Validate Area
  useEffect(() => {
    validatePriceAndArea(minArea, maxArea, setIsAreaError);
  }, [minArea, maxArea]);
  // Save Entered Area Info
  useEffect(() => {
    localStorage.setItem("enteredAreas", JSON.stringify([minArea, maxArea]));
  }, [minArea, maxArea]);

  return (
    <div className="relative">
      <ShowFilteringButtonCard filter="area">ფართობი</ShowFilteringButtonCard>
      {shownFilter === "area" && (
        <FilterPopupWrapper
          title="ფართობის მიხედვით"
          isButtonDisabled={isAreaError}
        >
          <div className="flex flex-col gap-6">
            {/* Inputs */}
            <div className="flex gap-4">
              <FilterInputCard
                type="area"
                value={minArea}
                setValue={setMinArea}
                placeHolder="მინ. ფართობი"
                isError={isAreaError}
              />
              <FilterInputCard
                type="area"
                value={maxArea}
                setValue={setMaxArea}
                placeHolder="მაქს. ფართობი"
                isError={isAreaError}
              />
            </div>
            {isAreaError && (!!maxArea.trim() || !!minArea.trim()) && (
              <span className="text-xs text-errColor">
                ჩაწერე ვალიდური მონაცემები
              </span>
            )}
            {/* Lists */}
            <div className="flex gap-4">
              {/* Min area */}
              <div className="flex-1">
                <span className="text-sm font-semibold">მინ. ფართობი</span>
                <UListCard setValue={setMinArea} type="area" />
              </div>
              {/* Max area */}
              <div className="flex-1">
                <span className="text-sm font-semibold">მაქს. ფართობი</span>
                <UListCard setValue={setMaxArea} type="area" />
              </div>
            </div>
          </div>
        </FilterPopupWrapper>
      )}
    </div>
  );
};

export default AreaCard;
