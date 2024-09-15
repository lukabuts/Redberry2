import regionsType from "../types/regions";

export default interface RegionsCardProps {
  showRegionFilter: () => void;
  isRegionsInfoLoading: boolean;
  shownFilterPopUP: "region" | "price" | "area" | "bedrooms" | "";
  regions: regionsType[];
  setSelectedRegions: React.Dispatch<React.SetStateAction<number[]>>;
  selectedRegions: number[];
}
