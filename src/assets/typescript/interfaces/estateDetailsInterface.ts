export default interface EstateDetailsInterface {
  price: number | undefined;
  setPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
  invalidPrice: boolean;
  setInvalidPrice: React.Dispatch<React.SetStateAction<boolean>>;
  area: number | undefined;
  setArea: React.Dispatch<React.SetStateAction<number | undefined>>;
  invalidArea: boolean;
  setInvalidArea: React.Dispatch<React.SetStateAction<boolean>>;
  bedrooms: number | undefined;
  setBedrooms: React.Dispatch<React.SetStateAction<number | undefined>>;
  invalidBedrooms: boolean;
  setInvalidBedrooms: React.Dispatch<React.SetStateAction<boolean>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  invalidDescription: boolean;
  setInvalidDescription: React.Dispatch<React.SetStateAction<boolean>>;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  setImageError: React.Dispatch<React.SetStateAction<boolean>>;
  imageError: boolean;
  image: File | null;
}
