export default interface LocationCardInterface {
  selectedRegion: number;
  setSelectedRegion: React.Dispatch<React.SetStateAction<number>>;
  selectedCity: number;
  setSelectedCity: React.Dispatch<React.SetStateAction<number>>;
}
