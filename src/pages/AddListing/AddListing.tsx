import { useState } from "react";
import DealTypeCard from "../../components/AddListingCards/DealTypeCard";
import LocationCard from "../../components/AddListingCards/LocationCard";
import EstateDetails from "../../components/AddListingCards/EstateDetails";
import SelectAgentCard from "../../components/AddListingCards/SelectAgentCard";
import ActionButtonsCard from "../../components/AddListingCards/ActionButtonsCard";

const AddListing = () => {
  // isRental
  const [isRental, setIsRental] = useState(false);
  // isForSale
  const [isForSale, setIsForSale] = useState(false);
  // Address
  const [address, setAddress] = useState("");
  const [invalidAddress, setInvalidAddress] = useState(false);
  // Post Index
  const [postIndex, setPostIndex] = useState<number | undefined>(undefined);
  const [invalidPostIndex, setInvalidPostIndex] = useState<boolean>(false);
  // Selected City
  const [selectedRegion, setSelectedRegion] = useState<number>(0);
  // Selected Region
  const [selectedCity, setSelectedCity] = useState<number>(0);
  // Price
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [invalidPrice, setInvalidPrice] = useState(false);
  // Area
  const [area, setArea] = useState<number | undefined>(undefined);
  const [invalidArea, setInvalidArea] = useState(false);
  // Bedrooms
  const [bedrooms, setBedrooms] = useState<number | undefined>(undefined);
  const [invalidBedrooms, setInvalidBedrooms] = useState(false);
  // Description
  const [description, setDescription] = useState("");
  const [invalidDescription, setInvalidDescription] = useState(false);
  // Image
  const [image, setImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState(false);
  // SelectedAgent
  const [selectedAgent, setSelectedAgent] = useState<number | undefined>(
    undefined
  );

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
          address={address}
          setAddress={setAddress}
          postIndex={postIndex}
          setPostIndex={setPostIndex}
          setInvalidAddress={setInvalidAddress}
          invalidAddress={invalidAddress}
          invalidPostIndex={invalidPostIndex}
          setInvalidPostIndex={setInvalidPostIndex}
        />
      </div>
      <div>
        <EstateDetails
          price={price}
          invalidPrice={invalidPrice}
          setPrice={setPrice}
          setInvalidPrice={setInvalidPrice}
          area={area}
          setArea={setArea}
          invalidArea={invalidArea}
          setInvalidArea={setInvalidArea}
          bedrooms={bedrooms}
          setBedrooms={setBedrooms}
          setInvalidBedrooms={setInvalidBedrooms}
          invalidBedrooms={invalidBedrooms}
          description={description}
          setDescription={setDescription}
          invalidDescription={invalidDescription}
          setInvalidDescription={setInvalidDescription}
          setImage={setImage}
          setImageError={setImageError}
          imageError={imageError}
          image={image}
        />
      </div>
      <div>
        <SelectAgentCard
          selectedAgent={selectedAgent}
          setSelectedAgent={setSelectedAgent}
        />
      </div>
      <div className="flex gap-7 justify-end mt-2">
        <ActionButtonsCard />
      </div>
    </form>
  );
};

export default AddListing;
