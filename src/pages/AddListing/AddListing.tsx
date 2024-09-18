import { useEffect, useState } from "react";
import DealTypeCard from "../../components/AddListingCards/DealTypeCard";
import LocationCard from "../../components/AddListingCards/LocationCard";
import EstateDetails from "../../components/AddListingCards/EstateDetails";
import SelectAgentCard from "../../components/AddListingCards/SelectAgentCard";
import { realEstateType } from "../../assets/typescript/types/realEstateType";
import MainTitleCard from "../../components/TitleCards/MainTitleCard";
import UploadImageCard from "../../components/UploadImageCard/UploadImageCard";
import NotFilledButtonCard from "../../components/Buttons/NotFilledButtonCard";
import { useNavigate } from "react-router";
import FilledButtonCard from "../../components/Buttons/FilledButtonCard";

const AddListing = () => {
  // Saved inserted details
  const detailsFromLocalStorage = localStorage.getItem("addListingDetails");
  const savedInsertedDetails: realEstateType =
    detailsFromLocalStorage && detailsFromLocalStorage !== "undefined"
      ? JSON.parse(detailsFromLocalStorage)
      : null;
  // isRental
  const [isRental, setIsRental] = useState(
    savedInsertedDetails?.is_rental || false
  );
  // isForSale
  const [isForSale, setIsForSale] = useState(
    savedInsertedDetails?.is_for_sale || false
  );
  // Address
  const [address, setAddress] = useState(savedInsertedDetails?.address || "");
  const [invalidAddress, setInvalidAddress] = useState(false);
  // Zip Code
  const [zipCode, setZipCode] = useState<string>(
    savedInsertedDetails?.zip_code || ""
  );
  const [invalidZipCode, setInvalidZipCode] = useState<boolean>(false);
  // Selected City
  const [selectedRegion, setSelectedRegion] = useState<number>(
    savedInsertedDetails?.region_id || 0
  );
  // Selected Region
  const [selectedCity, setSelectedCity] = useState<number>(
    savedInsertedDetails?.city_id || 0
  );
  // Price
  const [price, setPrice] = useState<string>(savedInsertedDetails?.price || "");
  const [invalidPrice, setInvalidPrice] = useState(false);
  // Area
  const [area, setArea] = useState<string>(savedInsertedDetails?.area || "");
  const [invalidArea, setInvalidArea] = useState(false);
  // Bedrooms
  const [bedrooms, setBedrooms] = useState<string>(
    savedInsertedDetails?.bedrooms || ""
  );
  const [invalidBedrooms, setInvalidBedrooms] = useState(false);
  // Description
  const [description, setDescription] = useState(
    savedInsertedDetails?.description || ""
  );
  const [invalidDescription, setInvalidDescription] = useState(false);
  // Image
  const [image, setImage] = useState<string>(savedInsertedDetails?.image || "");
  const [imageError, setImageError] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>(
    savedInsertedDetails?.imagePreviewUrl || ""
  );
  const [imageName, setImageName] = useState(
    savedInsertedDetails?.imageName || ""
  );
  // SelectedAgent
  const [selectedAgent, setSelectedAgent] = useState<number>(
    savedInsertedDetails?.agent_id || 0
  );

  // Inserted Details
  const [insertedEstateDetails, setInsertedEstateDetails] =
    useState<realEstateType>();

  // Setting inserted estate datails
  useEffect(() => {
    const details: realEstateType = {
      address: address,
      region_id: selectedRegion,
      image: image,
      city_id: selectedCity,
      agent_id: selectedAgent,
      is_rental: isRental,
      description: description,
      zip_code: zipCode,
      price: price,
      area: area,
      bedrooms: bedrooms,
      is_for_sale: isForSale,
      imagePreviewUrl: imagePreviewUrl,
      imageName: imageName,
    };

    setInsertedEstateDetails(details);
  }, [
    address,
    image,
    selectedRegion,
    selectedCity,
    selectedAgent,
    isRental,
    description,
    zipCode,
    price,
    area,
    bedrooms,
    isForSale,
    imagePreviewUrl,
    imageName,
  ]);

  // Saving Details in localstorage
  useEffect(() => {
    localStorage.setItem(
      "addListingDetails",
      JSON.stringify(insertedEstateDetails)
    );
  }, [insertedEstateDetails]);

  const navigate = useNavigate();

  // Handle Cancel Operation
  function handleCancelOperation() {
    navigate("/");
    localStorage.removeItem("addListingInfo");
  }

  return (
    <form className="py-14 max-w-4xl mx-auto w-full flex flex-col gap-20">
      <MainTitleCard>ლისტინგის დამატება</MainTitleCard>
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
          zipCode={zipCode}
          setZipCode={setZipCode}
          setInvalidAddress={setInvalidAddress}
          invalidAddress={invalidAddress}
          invalidZipCode={invalidZipCode}
          setInvalidZipCode={setInvalidZipCode}
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
        />
        {/* Upload Photo */}
        <div className="flex flex-col gap-1 mt-5">
          <UploadImageCard
            setImage={setImage}
            setImageError={setImageError}
            imageError={imageError}
            image={image}
            imagePreviewUrl={imagePreviewUrl}
            setImagePreviewUrl={setImagePreviewUrl}
            setImageName={setImageName}
          />
        </div>
      </div>

      <div>
        <SelectAgentCard
          selectedAgent={selectedAgent}
          setSelectedAgent={setSelectedAgent}
        />
      </div>
      <div className="flex gap-7 justify-end mt-2">
        <div onClick={handleCancelOperation}>
          <NotFilledButtonCard>გაუქმება</NotFilledButtonCard>
        </div>
        <div>
          <FilledButtonCard>დაამატე ლისტინგი</FilledButtonCard>
        </div>
      </div>
    </form>
  );
};

export default AddListing;
