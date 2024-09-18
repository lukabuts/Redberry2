import LoadingCard from "../LoadingCard.tsx/LoadingCard";
import locationIcon from "../../assets/images/location_marker.svg";
import bedIcon from "../../assets/images/bed.svg";
import areaIcon from "../../assets/images/area.svg";
import postIcon from "../../assets/images/post_code.svg";
import emailIcon from "../../assets/images/email.svg";
import mobileIcon from "../../assets/images/mobile.svg";
import RealEstateCardInterface from "../../assets/typescript/interfaces/realEstateCardInterface";

const DetailedRealEstateCard = ({
  realEstate,
  realEstateError,
  isRealEstateLoading,
  setShowPopUp,
}: RealEstateCardInterface) => {
  return (
    <div>
      {/* Real Estate */}

      {isRealEstateLoading ? (
        <LoadingCard />
      ) : realEstateError ? (
        <span className="text-errColor"> Error: {realEstateError}</span>
      ) : (
        // Display Real Estate Info
        <div>
          {/*  Real Estate Details */}
          <div className="flex  gap-16 items-center">
            {/* Real Estate Image */}
            <div className="relative overflow-hidden flex justify-center items-center rounded-t-xl w-detailedEstateImgWidth h-detailedEstateHeight flex-1">
              <img
                loading="lazy"
                src={realEstate.image}
                alt="Real estate image"
                className="object-cover w-full h-full"
              />
              {/* Deal Type */}
              <div className="absolute top-6 left-6 bg-deepBlue bg-opacity-50 py-1.5 px-2.5 rounded-xl">
                <span className="text-white text-base font-semibold">
                  {realEstate.is_rental ? "ქირავდება" : "იყიდება"}
                </span>
              </div>
            </div>
            <div className="w-full flex-1">
              {/* Price */}
              <div className="mb-6">
                <h2 className="font-bold text-4xl">{realEstate.price} ₾</h2>
              </div>
              <div className="flex flex-col gap-4 w-max">
                {/* Location */}
                <div className="flex items-center gap-1">
                  <img
                    loading="lazy"
                    src={locationIcon}
                    alt="Location"
                    className="w-5 h-5"
                  />
                  <span className="text-deepBlue opacity-70 text-lg">
                    {realEstate.city.name}, {realEstate.address}
                  </span>
                </div>
                {/* Area */}
                <div className="flex items-center gap-1">
                  <img
                    loading="lazy"
                    className="w-5 h-5"
                    src={areaIcon}
                    alt="Area"
                  />
                  <span className="text-deepBlue opacity-70 text-lg">
                    ფართობი {realEstate.area} მ²
                  </span>
                </div>
                {/* Bedrooms */}
                <div className="flex items-center gap-1">
                  <img
                    loading="lazy"
                    className="w-5 h-5"
                    src={bedIcon}
                    alt="Bedroom"
                  />
                  <span className="text-deepBlue opacity-70 text-lg">
                    საძინებელი {realEstate.bedrooms}
                  </span>
                </div>
                {/* Zip Code */}
                <div className="flex items-center gap-1">
                  <img
                    loading="lazy"
                    className="w-5 h-5"
                    src={postIcon}
                    alt="Zip Code"
                  />
                  <span className="text-deepBlue opacity-70 text-lg">
                    საფოსტო ინდექსი {realEstate.zip_code}
                  </span>
                </div>
              </div>
              {/* Details */}
              <div className="my-10">
                <span className="text-deepBlue opacity-70 text-base">
                  {realEstate.description}
                </span>
              </div>
              {/* Agent Card */}
              <div className=" px-5 py-6 border border-lightGray rounded-lg">
                <div className="flex items-center  gap-3.5">
                  <div className="overflow-hidden flex justify-center items-center rounded-full w-agentAvatarWidth h-agentAvatarHeight">
                    <img
                      loading="lazy"
                      src={realEstate.agent.avatar}
                      alt="Agent Avatar"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="text-base font-medium">
                      {realEstate.agent.name} {realEstate.agent.surname}
                    </p>
                    <span className="text-deepBlue opacity-70 text-sm">
                      აგენტი
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1 mt-4">
                  <div className="flex items-center gap-1">
                    <img
                      loading="lazy"
                      src={emailIcon}
                      alt="Email"
                      className="w-4 h-4"
                    />
                    <span className="text-deepBlue opacity-70 text-sm">
                      {realEstate.agent.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <img
                      loading="lazy"
                      src={mobileIcon}
                      alt="Email"
                      className="w-4 h-4"
                    />
                    <span className="text-deepBlue opacity-70 text-sm">
                      {realEstate.agent.phone}
                    </span>
                  </div>
                </div>
              </div>
              {/* Delete Real Estate Card */}
              <button
                className="p-2.5 border border-darkGray text-xs text-darkGray rounded-md mt-5 hover:text-white hover:bg-darkGray transition-colors"
                onClick={() => {
                  setShowPopUp(true);
                }}
              >
                ლისტინგის წაშლა
              </button>
            </div>
          </div>
          {/* Publish Date */}
          <div className="text-center mt-3">
            <span className="text-deepBlue opacity-70 text-sm">
              გამოქვეყნების თარიღი:{" "}
              {realEstate.created_at
                .split(":")[0]
                .split("T")[0]
                .split("-")
                .reverse()
                .join("/")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailedRealEstateCard;
