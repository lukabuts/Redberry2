import ValidationCard from "./ValidationCard";
import circlePlusIcon from "../../assets/images/plus_circle.svg";
import trashIcon from "../../assets/images/trash.svg";
import EstateDetailsInterface from "../../assets/typescript/interfaces/estateDetailsInterface";
import { useState } from "react";

const EstateDetails = ({
  price,
  setPrice,
  setInvalidPrice,
  invalidPrice,
  area,
  setArea,
  invalidArea,
  setInvalidArea,
  bedrooms,
  setBedrooms,
  invalidBedrooms,
  setInvalidBedrooms,
  description,
  setDescription,
  invalidDescription,
  setInvalidDescription,
  setImage,
  setImageError,
  imageError,
  image,
}: EstateDetailsInterface) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  // Handle Numeric values Change
  function handleNumericValueChange(
    e: React.ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<React.SetStateAction<number | undefined>>,
    setInvalidValue: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    const inputValue = e.target.value;

    if (inputValue === "") {
      setValue(undefined);
      setInvalidValue(false);
      return;
    }

    const numericValue = Number(inputValue);

    if (isNaN(numericValue) || numericValue < 0) {
      setInvalidValue(true);
    } else {
      setInvalidValue(false);
      setValue(numericValue);
    }
  }

  // Handle Description Change
  function handleDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const inputValue = e.target.value;
    setDescription(inputValue);
    if (inputValue.trim().length < 5 && inputValue.trim().length > 0) {
      setInvalidDescription(true);
    } else {
      setInvalidDescription(false);
    }
  }

  // Handle Image Change
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > 1) {
      setImageError(true);
      return;
    }

    if (file.type.startsWith("image")) {
      setImage(file);
      setImageError(false);
      const imageUrl = URL.createObjectURL(file);
      setImagePreviewUrl(imageUrl);
    } else {
      setImageError(true);
      setImage(null);
      setImagePreviewUrl("");
    }
  }

  function removeImage() {
    console.log("TRYING");

    setImage(null);
    setImageError(false);
  }
  return (
    <>
      <div className="mb-5">
        <h2 className=" text-deepBlue text-base font-semibold">
          ბინის დეტალები
        </h2>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-5">
          {/* Price */}
          <div className="flex-1">
            <div className="flex flex-col gap-1">
              <label htmlFor="price" className="text-sm font-semibold">
                ფასი *
              </label>
              <input
                required
                type="number"
                className={`border px-1 py-1.5 text-sm rounded-md focus:outline-none ${
                  invalidPrice
                    ? "border-errColor"
                    : price
                    ? "border-successColor"
                    : "border-slateGray"
                }`}
                id="price"
                onChange={(e) => {
                  handleNumericValueChange(e, setPrice, setInvalidPrice);
                }}
                value={price !== undefined ? String(price) : ""}
              />
            </div>
            <ValidationCard
              isError={invalidPrice}
              valueEntered={price}
              validationMsg="მხოლოდ რიცხვები"
            />
          </div>
          {/* Area */}
          <div className="flex-1">
            <div className="flex flex-col gap-1">
              <label htmlFor="area" className="text-sm font-semibold">
                ფართობი *
              </label>
              <input
                required
                type="number"
                className={`border px-1 py-1.5 text-sm rounded-md focus:outline-none ${
                  invalidArea
                    ? "border-errColor"
                    : area
                    ? "border-successColor"
                    : "border-slateGray"
                }`}
                id="area"
                onChange={(e) => {
                  handleNumericValueChange(e, setArea, setInvalidArea);
                }}
                value={area !== undefined ? String(area) : ""}
              />
            </div>
            <ValidationCard
              isError={invalidArea}
              validationMsg="მხოლოდ რიცხვები"
              valueEntered={area}
            />
          </div>
        </div>
        {/* Bedrooms */}
        <div className="w-1/2 pr-2.5">
          <div className="flex flex-col gap-1">
            <label htmlFor="bedroomsCount" className="text-sm font-semibold">
              საძინებლების რაოდენობა *
            </label>
            <input
              required
              type="number"
              className={`border px-1 py-1.5 text-sm rounded-md focus:outline-none ${
                invalidBedrooms
                  ? "border-errColor"
                  : bedrooms
                  ? "border-successColor"
                  : "border-slateGray"
              }`}
              id="bedroomsCount"
              onChange={(e) => {
                handleNumericValueChange(e, setBedrooms, setInvalidBedrooms);
                if (!Number.isInteger(Number(e.target.value))) {
                  setInvalidBedrooms(true);
                }
              }}
              value={bedrooms !== undefined ? String(bedrooms) : ""}
            />
          </div>
          <ValidationCard
            isError={invalidBedrooms}
            validationMsg="მხოლოდ მთელი რიცხვები"
            valueEntered={bedrooms}
          />
        </div>
        {/* Description */}
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-sm font-semibold">
            აღწერა *
          </label>
          <textarea
            id="description"
            className={`border px-1 py-1.5 text-sm rounded-md focus:outline-none h-32 ${
              invalidDescription
                ? "border-errColor"
                : description
                ? "border-successColor"
                : "border-slateGray"
            }`}
            onChange={(e) => {
              handleDescriptionChange(e);
            }}
            value={description}
          ></textarea>
          <ValidationCard
            isError={invalidDescription}
            validationMsg="მინიმუმ ხუთი სიტყვა"
            valueEntered={description}
          />
        </div>
        {/* Upload Photo */}
        <div className="flex flex-col gap-1">
          <label htmlFor="upload-photo" className="text-sm font-semibold">
            ატვირთე ფოტო *
          </label>
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
                  src={imagePreviewUrl}
                  alt="Uploaded Image"
                  className="object-contain w-full h-full rounded-md"
                />
                <button
                  className="absolute -bottom-2 -right-2 z-20 w-6 h-6"
                  type="button"
                  onClick={removeImage}
                >
                  <img src={trashIcon} alt="Trash" className="w-6 h-6" />
                </button>
              </div>
            ) : (
              <img src={circlePlusIcon} alt="Plus" className="w-6 h-6" />
            )}
          </div>
          <ValidationCard
            isError={imageError}
            validationMsg="სურათის მოცულობა არ უნდა აღემატებოდეს 1 MB-ს"
            valueEntered={image}
          />
        </div>
      </div>
    </>
  );
};

export default EstateDetails;
