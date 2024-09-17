export default interface EstateDetailsInterface {
  price: string;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  invalidPrice: boolean;
  setInvalidPrice: React.Dispatch<React.SetStateAction<boolean>>;
  area: string;
  setArea: React.Dispatch<React.SetStateAction<string>>;
  invalidArea: boolean;
  setInvalidArea: React.Dispatch<React.SetStateAction<boolean>>;
  bedrooms: string;
  setBedrooms: React.Dispatch<React.SetStateAction<string>>;
  invalidBedrooms: boolean;
  setInvalidBedrooms: React.Dispatch<React.SetStateAction<boolean>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  invalidDescription: boolean;
  setInvalidDescription: React.Dispatch<React.SetStateAction<boolean>>;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setImageError: React.Dispatch<React.SetStateAction<boolean>>;
  imageError: boolean;
  image: string;
  imagePreviewUrl: string;
  setImagePreviewUrl: React.Dispatch<React.SetStateAction<string>>;
}
