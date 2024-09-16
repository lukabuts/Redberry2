export default interface RegionsCardInterface {
  showRegionFilter: () => void;
  shownFilterPopUP: "region" | "price" | "area" | "bedrooms" | "";
  setSelectedRegions: React.Dispatch<React.SetStateAction<number[]>>;
  selectedRegions: number[];
}
