export default interface RegionsCardProps {
  showRegionFilter: () => void;
  shownFilterPopUP: "region" | "price" | "area" | "bedrooms" | "";
  setSelectedRegions: React.Dispatch<React.SetStateAction<number[]>>;
  selectedRegions: number[];
}
