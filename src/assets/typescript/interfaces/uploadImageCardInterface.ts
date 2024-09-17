export default interface UploadImageCardInterface {
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setImageError: React.Dispatch<React.SetStateAction<boolean>>;
  imageError: boolean;
  image: string;
  imagePreviewUrl: string;
  setImagePreviewUrl: React.Dispatch<React.SetStateAction<string>>;
}
