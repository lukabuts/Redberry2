export default interface AreaCardInterface {
  setMinArea: React.Dispatch<React.SetStateAction<string>>;
  minArea: string;
  setMaxArea: React.Dispatch<React.SetStateAction<string>>;
  maxArea: string;
  isAreaError: boolean;
  setIsAreaError: React.Dispatch<React.SetStateAction<boolean>>;
}
