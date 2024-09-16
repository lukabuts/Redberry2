export default interface LocationCardInterface {
  selectedRegion: number;
  setSelectedRegion: React.Dispatch<React.SetStateAction<number>>;
  selectedCity: number;
  setSelectedCity: React.Dispatch<React.SetStateAction<number>>;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  postIndex: number | undefined;
  setPostIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
  invalidAddress: boolean;
  setInvalidAddress: React.Dispatch<React.SetStateAction<boolean>>;
  invalidPostIndex: boolean;
  setInvalidPostIndex: React.Dispatch<React.SetStateAction<boolean>>;
}
