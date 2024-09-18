import { realEstateType } from "../types/realEstateType";

export default interface SimilarRealEstatesCardInterface {
  similarRealEstates: realEstateType[];
  realEstatesError: string;
  isRealEstatesLoading: boolean;
}
