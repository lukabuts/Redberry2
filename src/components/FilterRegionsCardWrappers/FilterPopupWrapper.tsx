import { useContext, useEffect, useRef } from "react";
import FilledButtonCard from "../Buttons/FilledButtonCard";
import { IsRegionsInfoLoadingContext } from "../../App";
import FilterPopupWrapperInterface from "../../assets/typescript/interfaces/filterPopupWrapperInterface";
import {
  SaveSelectedFiltersContext,
  SetShownFilterContext,
} from "../FilteringCard/FilteringCard";

const FilterPopupWrapper = ({
  children,
  title,
  isButtonDisabled,
}: FilterPopupWrapperInterface) => {
  // Filters
  const setShownFilter = useContext(SetShownFilterContext);
  // Is Regions Loading
  const isRegionsInfoLoading = useContext(IsRegionsInfoLoadingContext);
  // Save Selected Filters
  const saveSelectedFilters = useContext(SaveSelectedFiltersContext);
  // Wrapper Ref
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const showFilterButtons = document.querySelectorAll(".showFilterButton");

      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        let clickedOnButton = false;

        for (const showFilterButton of showFilterButtons) {
          if (showFilterButton.contains(event.target as Node)) {
            clickedOnButton = true;
            break;
          }
        }

        if (!clickedOnButton) {
          setShownFilter("");
        }
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="absolute flex flex-col left-0 mt-5 border border-lightGray bg-white p-6 rounded-lg z-10"
    >
      {isRegionsInfoLoading ? (
        <span>Loading...</span>
      ) : (
        <>
          <div className="mb-6">
            <p className="text-deepBlue font-bold text-base">{title}</p>
          </div>
          {children}
          <div className="self-end mt-6">
            <FilledButtonCard
              onClick={saveSelectedFilters}
              disabled={isButtonDisabled}
            >
              არჩევა
            </FilledButtonCard>
          </div>
        </>
      )}
    </div>
  );
};

export default FilterPopupWrapper;
