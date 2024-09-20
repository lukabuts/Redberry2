import { filtersType } from "../types/filtersType";

export interface FilteringCardInterface {
  selectedFilters: filtersType | null;
  setSelectedFilters: React.Dispatch<React.SetStateAction<filtersType | null>>;
  isAnyFilterSelected: boolean;
}
