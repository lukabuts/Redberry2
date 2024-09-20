import PriceCategoryCardInterface from "../../assets/typescript/interfaces/priceCategoryCard";
import FilterPopupWrapper from "../FilterRegionsCardWrappers/FilterPopupWrapper";
import ShowFilteringButtonCard from "../FilterRegionsCardWrappers/ShowFilteringButtonCard";
import UListCard from "./UListCard";
import FilterInputCard from "./FilterInputCard";
import { useContext, useEffect } from "react";
import { validatePriceAndArea } from "../../utils/validatePriceAndAreaFilters";
import { ShownFilterContext } from "../FilteringCard/FilteringCard";

const PriceCategoryCard = ({
  setMinPrice,
  minPrice,
  setMaxPrice,
  maxPrice,
  isPriceError,
  setIsPriceError,
}: PriceCategoryCardInterface) => {
  // Filters
  const shownFilter = useContext(ShownFilterContext);
  // Validate Price
  useEffect(() => {
    validatePriceAndArea(minPrice, maxPrice, setIsPriceError);
  }, [minPrice, maxPrice]);

  // Save Entered Price Info
  useEffect(() => {
    localStorage.setItem("enteredPrices", JSON.stringify([minPrice, maxPrice]));
  }, [minPrice, maxPrice]);

  return (
    <div className="relative">
      <ShowFilteringButtonCard filter="price">
        საფასო კატეგორია
      </ShowFilteringButtonCard>
      {shownFilter === "price" && (
        <FilterPopupWrapper
          isButtonDisabled={isPriceError}
          title="ფასის მიხედვით"
        >
          <div className="flex flex-col gap-6">
            {/* Inputs */}
            <div className="flex gap-4">
              <FilterInputCard
                type="price"
                value={minPrice}
                setValue={setMinPrice}
                placeHolder="მინ. ფასი"
                isError={isPriceError}
              />
              <FilterInputCard
                type="price"
                value={maxPrice}
                setValue={setMaxPrice}
                placeHolder="მაქს. ფასი"
                isError={isPriceError}
              />
            </div>
            {isPriceError && (!!maxPrice.trim() || !!minPrice.trim()) && (
              <span className="text-xs text-errColor">
                ჩაწერე ვალიდური მონაცემები
              </span>
            )}
            {/* Lists */}
            <div className="flex gap-4">
              {/* Min Price */}
              <div className="flex-1">
                <span className="text-sm font-semibold">მინ. ფასი</span>
                <UListCard setValue={setMinPrice} type="price" />
              </div>
              {/* Max Price */}
              <div className="flex-1">
                <span className="text-sm font-semibold">მაქს. ფასი</span>
                <UListCard setValue={setMaxPrice} type="price" />
              </div>
            </div>
          </div>
        </FilterPopupWrapper>
      )}
    </div>
  );
};

export default PriceCategoryCard;
