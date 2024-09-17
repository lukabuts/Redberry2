import ValidationCard from "./ValidationCard";
import circlePlusIcon from "../../assets/images/plus_circle.svg";
import trashIcon from "../../assets/images/trash.svg";
import EstateDetailsInterface from "../../assets/typescript/interfaces/estateDetailsInterface";
import { useEffect } from "react";

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
  imagePreviewUrl,
  setImagePreviewUrl,
}: EstateDetailsInterface) => {
  // Handle Description error
  useEffect(() => {
    if (description.length < 5 && description.trim().length > 0) {
      setInvalidDescription(true);
    } else {
      setInvalidDescription(false);
    }
  }, [description]);

  // Handle Invalid Price error
  useEffect(() => {
    validateNumericValue(price, setInvalidPrice);
  }, [price]);

  // Handle Invalid Area error
  useEffect(() => {
    validateNumericValue(area, setInvalidArea);
    console.log(area);
  }, [area]);

  // Validate Numeric values
  function validateNumericValue(
    value: string,
    setInvalidValue: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    const numericValue = Number(value);

    if (isNaN(numericValue) || numericValue < 0) {
      setInvalidValue(true);
    } else {
      setInvalidValue(false);
    }
  }

  // Handle Image change
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

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
                min={0}
                type="number"
                className={`border px-1 py-1.5 text-sm rounded-md focus:outline-none ${
                  invalidPrice
                    ? "border-errColor"
                    : price.trim()
                    ? "border-successColor"
                    : "border-slateGray"
                }`}
                id="price"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                value={price}
              />
            </div>
            <ValidationCard
              isError={invalidPrice}
              valueEntered={price.trim()}
              validationMsg="მხოლოდ დადებითი რიცხვები"
            />
          </div>
          {/* Area */}
          <div className="flex-1">
            <div className="flex flex-col gap-1">
              <label htmlFor="area" className="text-sm font-semibold">
                ფართობი *
              </label>
              <input
                min={0}
                required
                type="number"
                className={`border px-1 py-1.5 text-sm rounded-md focus:outline-none ${
                  invalidArea
                    ? "border-errColor"
                    : area.trim()
                    ? "border-successColor"
                    : "border-slateGray"
                }`}
                id="area"
                onChange={(e) => {
                  setArea(e.target.value);
                }}
                value={area}
              />
            </div>
            <ValidationCard
              isError={invalidArea}
              validationMsg="მხოლოდ დადებითი რიცხვები"
              valueEntered={area.trim()}
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
              min={0}
              required
              type="number"
              className={`border px-1 py-1.5 text-sm rounded-md focus:outline-none ${
                invalidBedrooms
                  ? "border-errColor"
                  : bedrooms.trim()
                  ? "border-successColor"
                  : "border-slateGray"
              }`}
              id="bedroomsCount"
              onChange={(e) => {
                const value = e.target.value;
                setBedrooms(value);
                const numericValue = Number(value);
                if (
                  isNaN(numericValue) ||
                  numericValue < 0 ||
                  !Number.isInteger(numericValue)
                ) {
                  setInvalidBedrooms(true);
                } else {
                  setInvalidBedrooms(false);
                }
              }}
              onInput={() => {
                console.log("hiii");
              }}
              value={bedrooms}
            />
          </div>
          <ValidationCard
            isError={invalidBedrooms}
            validationMsg="მხოლოდ მთელი დადებითი რიცხვები"
            valueEntered={bedrooms.trim()}
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
                : description.trim()
                ? "border-successColor"
                : "border-slateGray"
            }`}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
          ></textarea>
          <ValidationCard
            isError={invalidDescription}
            validationMsg="მინიმუმ ხუთი სიტყვა"
            valueEntered={description.trim()}
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
