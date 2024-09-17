import ValidationCard from "./ValidationCard";
import EstateDetailsInterface from "../../assets/typescript/interfaces/estateDetailsInterface";
import { useEffect } from "react";
import LabelCard from "../TitleCards/LabelCard";

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
              <LabelCard HTMLfor="price">ფასი *</LabelCard>
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
              <LabelCard HTMLfor="area">ფართობი *</LabelCard>
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
            <LabelCard HTMLfor="bedroomsCount">
              საძინებლების რაოდენობა *
            </LabelCard>
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
          <LabelCard HTMLfor="description">აღწერა *</LabelCard>
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
      </div>
    </>
  );
};

export default EstateDetails;
