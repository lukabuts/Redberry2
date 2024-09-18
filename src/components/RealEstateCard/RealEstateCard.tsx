import locationIcon from "../../assets/images/location_marker.svg";
import bedIcon from "../../assets/images/bed.svg";
import areaIcon from "../../assets/images/area.svg";
import postIcon from "../../assets/images/post_code.svg";
import { realEstateType } from "../../assets/typescript/types/realEstateType";
const RealEstateCard = ({ realEstate }: { realEstate: realEstateType }) => {
  return (
    <div className="relative hover:shadow-md transition-all rounded-xl overflow-hidden w-estateCardWidth">
      <div className="h-80 overflow-hidden flex justify-center items-center">
        <img
          loading="lazy"
          src={realEstate.image}
          alt="Real estate image"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="border border-lightGray border-t-0 rounded-b-xl p-5">
        <div>
          <h2 className="font-bold text-2xl">{realEstate.price} ₾</h2>
        </div>
        <div className="flex items-center gap-1 mb-4 mt-1.5">
          <img
            loading="lazy"
            src={locationIcon}
            alt="Location"
            className="w-5 h-5"
          />
          <span className="text-deepBlue opacity-70 text-sm">
            {realEstate.city.name}, {realEstate.address}
          </span>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-1">
            <img
              loading="lazy"
              className="w-5 h-5"
              src={bedIcon}
              alt="Bedroom"
            />
            <span className="text-deepBlue opacity-70 text-sm">
              {realEstate.bedrooms}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <img loading="lazy" className="w-5 h-5" src={areaIcon} alt="Area" />
            <span className="text-deepBlue opacity-70 text-sm">
              {realEstate.area} მ²
            </span>
          </div>
          <div className="flex items-center gap-1">
            <img
              loading="lazy"
              className="w-5 h-5"
              src={postIcon}
              alt="Zip Code"
            />
            <span className="text-deepBlue opacity-70 text-sm">
              {realEstate.zip_code}
            </span>
          </div>
        </div>
      </div>
      <div className="absolute top-6 left-6 bg-deepBlue bg-opacity-50 py-1.5 px-2.5  rounded-3xl">
        <span className="text-white text-xs font-medium">
          {realEstate.is_rental ? "ქირავდება" : "იყიდება"}
        </span>
      </div>
    </div>
  );
};

export default RealEstateCard;
