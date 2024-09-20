import { useContext, useEffect } from "react";
import BedroomsCardInterface from "../../assets/typescript/interfaces/bedroomsCardInterface";
import FilterPopupWrapper from "../FilterRegionsCardWrappers/FilterPopupWrapper";
import ShowFilteringButtonCard from "../FilterRegionsCardWrappers/ShowFilteringButtonCard";
import { ShownFilterContext } from "../FilteringCard/FilteringCard";

const BedroomCard = ({
  bedrooms,
  setBedrooms,
  isBedroomError,
  setIsBedroomError,
}: BedroomsCardInterface) => {
  // Filters
  const shownFilter = useContext(ShownFilterContext);
  // Validate Bedrooms
  useEffect(() => {
    const numValue = Number(bedrooms);

    if (isNaN(numValue) || numValue <= 0 || !Number.isInteger(numValue)) {
      setIsBedroomError(true);
    } else {
      setIsBedroomError(false);
    }
  }, [bedrooms]);
  // Save Entered Bedrooms Info
  useEffect(() => {
    localStorage.setItem("enteredBedrooms", JSON.stringify(bedrooms));
  }, [bedrooms]);

  return (
    <div className="relative">
      <ShowFilteringButtonCard filter="bedrooms">
        საძინებლების რაოდენობა
      </ShowFilteringButtonCard>
      {shownFilter === "bedrooms" && (
        <FilterPopupWrapper
          title="საძინებლების რაოდენობა"
          isButtonDisabled={isBedroomError}
        >
          <div className="flex flex-col gap-6">
            <input
              type="number"
              className={`p-2.5 mr-2 text-sm focus:outline-none border rounded-md w-10 removeDefaultInputStyles ${
                isBedroomError && bedrooms.trim()
                  ? "border-errColor"
                  : bedrooms.trim()
                    ? "border-successColor"
                    : "border-slateGray"
              }`}
              value={bedrooms}
              onChange={(e) => {
                setBedrooms(e.target.value);
              }}
            />
            {isBedroomError && !!bedrooms.trim() && (
              <span className="text-xs text-errColor">
                ჩაწერე ვალიდური მონაცემები
              </span>
            )}
          </div>
        </FilterPopupWrapper>
      )}
    </div>
  );
};

export default BedroomCard;
