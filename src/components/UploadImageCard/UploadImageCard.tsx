import LabelCard from "../TitleCards/LabelCard";
import ValidationCard from "../AddListingCards/ValidationCard";
import circlePlusIcon from "../../assets/images/plus_circle.svg";
import trashIcon from "../../assets/images/trash.svg";
import UploadImageCardInterface from "../../assets/typescript/interfaces/uploadImageCardInterface";
const UploadImageCard = ({
  setImage,
  setImageError,
  imageError,
  image,
  imagePreviewUrl,
  setImagePreviewUrl,
  setImageName,
}: UploadImageCardInterface) => {
  // Handle Image change
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      setImageError(true);
      return;
    }

    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > 1) {
      setImageError(true);
      return;
    }

    if (file.type.startsWith("image")) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.addEventListener("load", () => {
        const result = reader.result as string;
        setImage(result);

        const imageUrl = URL.createObjectURL(file);
        setImagePreviewUrl(imageUrl);
        setImageName(file.name);

        setImageError(false);
      });

      reader.addEventListener("error", () => {
        setImageError(true);
        setImage("");
        setImagePreviewUrl("");
      });
    } else {
      setImageError(true);
      setImage("");
      setImagePreviewUrl("");
    }
  }
  function removeImage() {
    setImage("");
    setImagePreviewUrl("");
    setImageError(false);
  }
  return (
    <>
      <LabelCard HTMLfor="upload-photo">ატვირთე ფოტო *</LabelCard>
      <div
        className={`relative flex items-center justify-center rounded-lg border-dashed border w-full h-32 p-4 ${
          imageError
            ? "border-errColor"
            : image
            ? "border-successColor"
            : "border-slateGray "
        }`}
      >
        <input
          type="file"
          id="upload-photo"
          accept="img*"
          className="absolute top-0 left-0 w-full h-full rounded-lg opacity-0 cursor-pointer z-10"
          onChange={(e) => {
            handleImageChange(e);
          }}
          disabled={!!image}
          value={""}
        />
        {image ? (
          <div className="relative max-h-28 h-full">
            <img
              loading="lazy"
              src={imagePreviewUrl}
              alt="Uploaded Image"
              className="object-contain w-full h-full rounded-md"
            />
            <button
              className="absolute -bottom-2 -right-2 z-20 w-6 h-6"
              type="button"
              onClick={removeImage}
            >
              <img
                loading="lazy"
                src={trashIcon}
                alt="Trash"
                className="w-6 h-6"
              />
            </button>
          </div>
        ) : (
          <img
            loading="lazy"
            src={circlePlusIcon}
            alt="Plus"
            className="w-6 h-6"
          />
        )}
      </div>
      <ValidationCard
        isError={imageError}
        validationMsg="სურათის მოცულობა არ უნდა აღემატებოდეს 1 MB-ს"
        valueEntered={image}
      />
    </>
  );
};

export default UploadImageCard;
