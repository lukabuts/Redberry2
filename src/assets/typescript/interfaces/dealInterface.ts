export default interface DealTypeInterface {
  isRental: boolean;
  setIsRental: React.Dispatch<React.SetStateAction<boolean>>;
  isForSale: boolean;
  setIsForSale: React.Dispatch<React.SetStateAction<boolean>>;
}
