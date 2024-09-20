export default interface PriceCategoryCardInterface {
  setMinPrice: React.Dispatch<React.SetStateAction<string>>;
  minPrice: string;
  setMaxPrice: React.Dispatch<React.SetStateAction<string>>;
  maxPrice: string;
  isPriceError: boolean;
  setIsPriceError: React.Dispatch<React.SetStateAction<boolean>>;
}
