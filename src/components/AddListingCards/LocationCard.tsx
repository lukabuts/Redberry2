import { useContext, useEffect, useState } from "react";
import { RegionsContext, TokenContext } from "../../App";
import LocationCardInterface from "../../assets/typescript/interfaces/locationCardInterface";
import axios from "axios";
import citiesType from "../../assets/typescript/types/citiesType";
import ValidationCard from "./ValidationCard";
import LabelCard from "../TitleCards/LabelCard";
import { validateNumericValue } from "../../utils/validateNumericValues";
import { validateString } from "../../utils/validateStrings";

const LocationCard = ({
  selectedRegion,
  setSelectedRegion,
  selectedCity,
  setSelectedCity,
  address,
  setAddress,
  zipCode,
  setZipCode,
  setInvalidAddress,
  invalidAddress,
  invalidZipCode,
  setInvalidZipCode,
  invalidCity,
  setInvalidCity,
  invalidRegion,
  setInvalidRegion,
}: LocationCardInterface) => {
  const regions = useContext(RegionsContext);
  const token = useContext(TokenContext);

  const [cities, setCities] = useState<citiesType[]>([]);

  // Get Cities
  useEffect(() => {
    axios
      .get("https://api.real-estate-manager.redberryinternship.ge/api/cities", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCities(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  // Validate Address
  useEffect(() => {
    validateString(address, setInvalidAddress, 2);
  }, [address]);

  // Handle Invalid Zipcode
  useEffect(() => {
    validateNumericValue(zipCode, setInvalidZipCode);
  }, [zipCode]);

  return (
    <>
      <div className="mb-5">
        <h2 className=" text-deepBlue text-base font-semibold">მდებარეობა</h2>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-5">
          {/* Address */}
          <div className="flex-1">
            <div className="flex flex-col gap-1">
              <LabelCard HTMLfor="address">მისამართი *</LabelCard>
              <input
                required
                type="text"
                min={2}
                className={`border px-1 py-1.5 text-sm rounded-md focus:outline-none ${
                  invalidAddress && address.trim()
                    ? "border-errColor"
                    : address.trim()
                    ? "border-successColor"
                    : "border-slateGray"
                }`}
                id="address"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                value={address}
              />
            </div>
            <ValidationCard
              isError={invalidAddress && !!address.trim()}
              validationMsg="მინიმუმ ორი სიმბოლო"
              valueEntered={address.trim()}
            />
          </div>
          {/* Zip Code */}
          <div className="flex-1">
            <div className="flex flex-col gap-1">
              <LabelCard HTMLfor="zipCode">საფოსტო ინდექსი *</LabelCard>
              <input
                required
                min={0}
                type="number"
                className={`border px-1 py-1.5 text-sm rounded-md focus:outline-none ${
                  invalidZipCode && zipCode.trim()
                    ? "border-errColor"
                    : zipCode.trim()
                    ? "border-successColor"
                    : "border-slateGray"
                }`}
                id="zipCode"
                onChange={(e) => {
                  setZipCode(e.target.value);
                }}
                value={zipCode}
              />
            </div>
            <ValidationCard
              isError={invalidZipCode && !!zipCode.trim()}
              validationMsg="მხოლოდ რიცხვები"
              valueEntered={zipCode.trim()}
            />
          </div>
        </div>
        {/* City && Region */}
        <div className="flex gap-5">
          {/* Region */}
          <div className="flex-1">
            <div className="flex flex-col gap-1">
              <LabelCard HTMLfor="region">რეგიონი *</LabelCard>
              <select
                name="region"
                className={`border px-1 py-1.5 text-sm rounded-md focus:outline-none bg-transparent cursor-pointer ${
                  invalidRegion
                    ? "border-errColor"
                    : selectedRegion
                    ? "border-successColor"
                    : "border-slateGray"
                }`}
                onChange={(e) => {
                  setSelectedRegion(Number(e.target.value));
                  setInvalidRegion(false);
                }}
                value={selectedRegion}
                required
                id="region"
              >
                <option value="0"></option>
                {regions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* City */}
          <div className="flex-1">
            <div className="flex flex-col gap-1">
              <LabelCard HTMLfor="city">ქალაქი *</LabelCard>
              <select
                name="city"
                className={`border px-1 py-1.5 text-sm rounded-md focus:outline-none bg-transparent cursor-pointer disabled:cursor-default ${
                  invalidCity
                    ? "border-errColor"
                    : selectedCity
                    ? "border-successColor"
                    : "border-slateGray"
                }`}
                onChange={(e) => {
                  setSelectedCity(Number(e.target.value));
                  setInvalidCity(false);
                }}
                value={selectedCity}
                disabled={!selectedRegion}
                required
                id="city"
              >
                <option value="0"></option>
                {cities
                  .filter((city) => city.region_id === selectedRegion)
                  .map((filteredCity) => (
                    <option key={filteredCity.id} value={filteredCity.id}>
                      {filteredCity.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationCard;
