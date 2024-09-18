import { detailedRealEstateType } from "../types/detailedRealEstateType";

export default interface RealEstateCardInterface {
  realEstate: detailedRealEstateType;
  realEstateError: string;
  isRealEstateLoading: boolean;
  setShowPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}
