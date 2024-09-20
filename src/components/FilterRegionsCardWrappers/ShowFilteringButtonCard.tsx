import { useContext } from "react";
import dropDownIcon from "../../assets/images/dropdown.svg";
import ShowFilteringButtonCardInterface from "../../assets/typescript/interfaces/showFilteringButtonCardInterface";
import {
  SetShownFilterContext,
  ShownFilterContext,
} from "../FilteringCard/FilteringCard";

const ShowFilteringButtonCard = ({
  filter,
  children,
}: ShowFilteringButtonCardInterface) => {
  // Filters
  const currentFilter = useContext(ShownFilterContext);
  const setShownFilter = useContext(SetShownFilterContext);
  return (
    <button
      onClick={() => {
        if (filter === currentFilter) {
          setShownFilter("");
        } else {
          setShownFilter(filter);
        }
      }}
      className={`showFilterButton flex items-center h-full gap-1 font-bold px-3.5 py-2 transition-colors rounded-md ${currentFilter === filter ? "bg-softGray" : "hover:bg-softGray"}`}
    >
      <span>{children}</span>
      <img
        loading="lazy"
        src={dropDownIcon}
        className={`w-3.5 h-3.5 transition-transform ${currentFilter === filter ? "rotate-180" : "rotate-0"}`}
        alt="Dropdown"
      />
    </button>
  );
};

export default ShowFilteringButtonCard;
