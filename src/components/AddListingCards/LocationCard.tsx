import React, { useContext, useEffect, useState } from "react";
import { RegionsContext, TokenContext } from "../../App";
import LocationCardInterface from "../../assets/typescript/interfaces/locationCardInterface";
import axios from "axios";
import citiesType from "../../assets/typescript/types/citiesType";
import ValidationCard from "./ValidationCard";

const LocationCard = ({
  selectedRegion,
  setSelectedRegion,
  selectedCity,
  setSelectedCity,
  address,
  setAddress,
  postIndex,
  setPostIndex,
  setInvalidAddress,
  invalidAddress,
  invalidPostIndex,
  setInvalidPostIndex,
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

  // handleAddressChange
  function handleAddressChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    setAddress(inputValue);
    if (inputValue.trim().length < 2 && inputValue.trim().length > 0) {
      setInvalidAddress(true);
    } else {
      setInvalidAddress(false);
    }
  }

  // handlePostIndexChange
  function handlePostIndexChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;

    if (inputValue === "") {
      setPostIndex(undefined);
      setInvalidPostIndex(false);
      return;
    }

    const numericValue = Number(inputValue);

    if (isNaN(numericValue) || numericValue < 0) {
      setInvalidPostIndex(true);
    } else {
      setInvalidPostIndex(false);
      setPostIndex(numericValue);
    }
  }

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
              <label htmlFor="address" className="text-sm font-semibold">
                მისამართი *
              </label>
              <input
                required
                type="text"
                min={2}
                className={`border px-1 py-1.5 text-sm rounded-md focus:outline-none ${
                  invalidAddress
                    ? "border-errColor"
                    : address
                    ? "border-successColor"
                    : "border-slateGray"
                }`}
                id="address"
                onChange={(e) => {
                  handleAddressChange(e);
                }}
                value={address}
              />
            </div>
            <ValidationCard
              isError={invalidAddress}
              validationMsg="მინიმუმ ორი სიმბოლო"
              valueEntered={address}
            />
          </div>
          {/* Post Index */}
          <div className="flex-1">
            <div className="flex flex-col gap-1">
              <label htmlFor="post-index" className="text-sm font-semibold">
                საფოსტო ინდექსი *
              </label>
              <input
                required
                type="number"
                className={`border px-1 py-1.5 text-sm rounded-md focus:outline-none ${
                  invalidPostIndex
                    ? "border-errColor"
                    : postIndex
                    ? "border-successColor"
                    : "border-slateGray"
                }`}
                id="post-index"
                onChange={(e) => {
                  handlePostIndexChange(e);
                }}
                value={postIndex !== undefined ? String(postIndex) : ""}
              />
            </div>
            <ValidationCard
              isError={invalidPostIndex}
              validationMsg="მხოლოდ რიცხვები"
              valueEntered={postIndex}
            />
          </div>
        </div>
        {/* City && Region */}
        <div className="flex gap-5">
          {/* Region */}
          <div className="flex-1">
            <div className="flex flex-col gap-1">
              <label htmlFor="region" className="text-sm font-semibold">
                რეგიონი *
              </label>
              <select
                name="region"
                className={`border px-1 py-1.5 text-sm rounded-md focus:outline-none bg-transparent cursor-pointer ${
                  selectedRegion ? "border-successColor" : "border-slateGray"
                }`}
                onChange={(e) => {
                  setSelectedRegion(Number(e.target.value));
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
              <label htmlFor="city" className="text-sm font-semibold">
                ქალაქი *
              </label>
              <select
                name="city"
                className={`border px-1 py-1.5 text-sm rounded-md focus:outline-none bg-transparent cursor-pointer disabled:cursor-default ${
                  selectedCity ? "border-successColor" : "border-slateGray"
                }`}
                onChange={(e) => {
                  setSelectedCity(Number(e.target.value));
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
