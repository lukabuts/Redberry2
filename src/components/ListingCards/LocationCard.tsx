import { useContext, useEffect, useState } from "react";
import VectorIcon from "../Icons/VectorIcon";
import { RegionsContext, TokenContext } from "../../App";
import LocationCardInterface from "../../assets/typescript/interfaces/locationCardInterface";
import axios from "axios";
import citiesType from "../../assets/typescript/types/citiesType";

const LocationCard = ({
  selectedRegion,
  setSelectedRegion,
  selectedCity,
  setSelectedCity,
}: LocationCardInterface) => {
  const regions = useContext(RegionsContext);
  const token = useContext(TokenContext);

  const [cities, setCities] = useState<citiesType[]>([]);

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

  return (
    <>
      <div className="mb-5">
        <h2 className=" text-deepBlue text-base font-semibold">მდებარეობა</h2>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-5">
          <div className="flex-1">
            <div className="flex flex-col gap-1">
              <label htmlFor="address" className="text-sm font-semibold">
                მისამართი *
              </label>
              <input
                required
                type="text"
                min={2}
                className="border border-slateGray px-1 py-1.5 text-sm rounded-md"
                id="address"
              />
            </div>
            <div className="flex gap-1 items-center mt-2">
              <VectorIcon stroke="#021526" />
              <span className="text-sm">მინიმუმ ორი სიმბოლო</span>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-1">
              <label htmlFor="post-index" className="text-sm font-semibold">
                საფოსტო ინდექსი *
              </label>
              <input
                required
                type="number"
                className="border border-slateGray px-1 py-1.5 text-sm rounded-md"
                id="post-index"
              />
            </div>
            <div className="flex gap-1 items-center mt-2">
              <VectorIcon stroke="#021526" />
              <span className="text-sm">მხოლოდ რიცხვები</span>
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex-1">
            <div className="flex flex-col gap-1">
              <label htmlFor="region" className="text-sm font-semibold">
                რეგიონი *
              </label>
              <select
                name="region"
                className="border border-slateGray px-1 py-1.5 text-sm rounded-md"
                onChange={(e) => {
                  setSelectedRegion(Number(e.target.value));
                }}
                value={selectedRegion}
                required
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
          <div className="flex-1">
            <div className="flex flex-col gap-1">
              <label htmlFor="city" className="text-sm font-semibold">
                ქალაქი *
              </label>
              <select
                name="region"
                className="border border-slateGray px-1 py-1.5 text-sm rounded-md"
                onChange={(e) => {
                  setSelectedCity(Number(e.target.value));
                }}
                value={selectedCity}
                disabled={!selectedRegion}
                required
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
