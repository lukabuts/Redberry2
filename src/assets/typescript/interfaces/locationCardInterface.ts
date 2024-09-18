export default interface LocationCardInterface {
  selectedRegion: number;
  setSelectedRegion: React.Dispatch<React.SetStateAction<number>>;
  selectedCity: number;
  setSelectedCity: React.Dispatch<React.SetStateAction<number>>;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  zipCode: string;
  setZipCode: React.Dispatch<React.SetStateAction<string>>;
  invalidAddress: boolean;
  setInvalidAddress: React.Dispatch<React.SetStateAction<boolean>>;
  invalidZipCode: boolean;
  setInvalidZipCode: React.Dispatch<React.SetStateAction<boolean>>;
  invalidCity: boolean;
  setInvalidCity: React.Dispatch<React.SetStateAction<boolean>>;
  invalidRegion: boolean;
  setInvalidRegion: React.Dispatch<React.SetStateAction<boolean>>;
}
