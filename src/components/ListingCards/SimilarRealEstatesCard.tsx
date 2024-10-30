import { Link } from "react-router-dom";
import RealEstateCard from "../../components/RealEstateCard/RealEstateCard";
import SimilarRealEstatesCardInterface from "../../assets/typescript/interfaces/similarRealEstatesCardInterface";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState } from "react";
import { Swiper as SwiperType } from "swiper";
import ArrowIcon from "../Icons/ArrowIcon";

const SimilarRealEstatesCard = ({
  isRealEstatesLoading,
  realEstatesError,
  similarRealEstates,
}: SimilarRealEstatesCardInterface) => {
  // State to hold the swiper instance
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  return (
    <div className="mb-14 mt-16 mx-36">
      <h3 className="text-deepblue font-bold text-3xl mb-10">
        ბინები მსგავს ლოკაციაზე
      </h3>
      {isRealEstatesLoading ? (
        <span className="text-deepBlue opacity-70 text-lg">იტვირთება...</span>
      ) : realEstatesError ? (
        <span className="text-errColor">Error: {realEstatesError}</span>
      ) : similarRealEstates.length === 0 ? (
        <span className="text-deepBlue opacity-70 text-lg">
          ბინები მსგავს ლოკაციაზე არ მოიძებნა
        </span>
      ) : (
        <>
          {/* Swiper */}
          <Swiper
            spaceBetween={20}
            slidesPerView={4}
            onSwiper={(swiper) => {
              setSwiperInstance(swiper);
            }}
            loop={true}
          >
            {similarRealEstates.map((estate, index) => (
              <SwiperSlide key={index}>
                <Link to={`/real-estates/${estate.id}`}>
                  <RealEstateCard realEstate={estate} />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Scroll Swiper Buttons */}
          {swiperInstance && similarRealEstates.length > 4 && (
            <div className="absolute top-1/2 left-0 px-16 -translate-y-1/2 w-full flex justify-between mt-4">
              <button
                onClick={() => swiperInstance.slidePrev()}
                className="disabled:text-red-500"
              >
                <ArrowIcon />
              </button>
              <button
                className="rotate-180"
                onClick={() => swiperInstance.slideNext()}
              >
                <ArrowIcon />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SimilarRealEstatesCard;
