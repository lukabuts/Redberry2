import { useState } from "react";
import DealTypeCard from "../../components/ListingCards/DealTypeCard";
import LocationCard from "../../components/ListingCards/LocationCard";

const AddListing = () => {
  // Rent
  const [isRental, setIsRental] = useState(false);
  // Sale
  const [isForSale, setIsForSale] = useState(false);
  // Location
  const [selectedRegion, setSelectedRegion] = useState<number>(0);
  const [selectedCity, setSelectedCity] = useState<number>(0);
  return (
    <form className="py-14 max-w-4xl mx-auto w-full flex flex-col gap-20">
      <div className="text-center">
        <h1 className="text-deepBlue text-3xl font-bold">ლისტინგის დამატება</h1>
      </div>
      <div>
        <DealTypeCard
          isForSale={isForSale}
          setIsForSale={setIsForSale}
          isRental={isRental}
          setIsRental={setIsRental}
        />
      </div>
      <div>
        <LocationCard
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />
      </div>
    </form>
  );
};

export default AddListing;
