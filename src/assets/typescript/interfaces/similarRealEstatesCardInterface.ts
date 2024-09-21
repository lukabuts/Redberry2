import { realEstateType } from "../types/realEstateType";

export default interface SimilarRealEstatesCardInterface {
  similarRealEstates: realEstateType[];
  setSimilarRealEstates: React.Dispatch<React.SetStateAction<realEstateType[]>>;
  realEstatesError: string;
  isRealEstatesLoading: boolean;
}
