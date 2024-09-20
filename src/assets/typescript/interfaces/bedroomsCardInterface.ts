export default interface BedroomsCardInterface {
  bedrooms: string;
  setBedrooms: React.Dispatch<React.SetStateAction<string>>;
  isBedroomError: boolean;
  setIsBedroomError: React.Dispatch<React.SetStateAction<boolean>>;
}
