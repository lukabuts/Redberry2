import { useContext, useEffect, useState } from "react";
import DealTypeCard from "../../components/AddListingCards/DealTypeCard";
import LocationCard from "../../components/AddListingCards/LocationCard";
import EstateDetails from "../../components/AddListingCards/EstateDetails";
import SelectAgentCard from "../../components/AddListingCards/SelectAgentCard";
import MainTitleCard from "../../components/TitleCards/MainTitleCard";
import UploadImageCard from "../../components/UploadImageCard/UploadImageCard";
import NotFilledButtonCard from "../../components/Buttons/NotFilledButtonCard";
import { useNavigate } from "react-router";
import FilledButtonCard from "../../components/Buttons/FilledButtonCard";
import LoadingCard from "../../components/LoadingCard.tsx/LoadingCard";
import { base64ToFile } from "../../utils/imageUtils";
import axios from "axios";
import { TokenContext } from "../../App";
import { AddRealEstateType } from "../../assets/typescript/types/AddRealEstateType";

const AddListing = () => {
  // Token
  const token = useContext(TokenContext);
  // Saved inserted details
  const detailsFromLocalStorage = localStorage.getItem("addListingDetails");
  const savedInsertedDetails: AddRealEstateType =
    detailsFromLocalStorage && detailsFromLocalStorage !== "undefined"
      ? JSON.parse(detailsFromLocalStorage)
      : null;
  // isRental
  const [isRental, setIsRental] = useState(
    savedInsertedDetails?.is_rental || false
  );
  // isForSale
  const [isForSale, setIsForSale] = useState<boolean>(
    savedInsertedDetails?.is_for_sale || true
  );
  // Address
  const [address, setAddress] = useState(savedInsertedDetails?.address || "");
  const [invalidAddress, setInvalidAddress] = useState(true);
  // Zip Code
  const [zipCode, setZipCode] = useState<string>(
    savedInsertedDetails?.zip_code || ""
  );
  const [invalidZipCode, setInvalidZipCode] = useState<boolean>(true);
  // Selected City
  const [selectedRegion, setSelectedRegion] = useState<number>(
    savedInsertedDetails?.region_id || 0
  );
  const [invalidCity, setInvalidCity] = useState<boolean>(false);

  // Selected Region
  const [selectedCity, setSelectedCity] = useState<number>(
    savedInsertedDetails?.city_id || 0
  );
  const [invalidRegion, setInvalidRegion] = useState<boolean>(false);

  // Price
  const [price, setPrice] = useState<string>(savedInsertedDetails?.price || "");
  const [invalidPrice, setInvalidPrice] = useState(true);
  // Area
  const [area, setArea] = useState<string>(savedInsertedDetails?.area || "");
  const [invalidArea, setInvalidArea] = useState(true);
  // Bedrooms
  const [bedrooms, setBedrooms] = useState<string>(
    savedInsertedDetails?.bedrooms || ""
  );
  const [invalidBedrooms, setInvalidBedrooms] = useState(true);
  // Description
  const [description, setDescription] = useState(
    savedInsertedDetails?.description || ""
  );
  const [invalidDescription, setInvalidDescription] = useState(true);
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
  const [invalidAgent, setInvalidAgent] = useState<boolean>(false);
  // Inserted Details
  const [insertedEstateDetails, setInsertedEstateDetails] =
    useState<AddRealEstateType>();

  // IsEvrithingValidated
  const [isEverithingValidated, setIsEverithingValidated] = useState(true);

  // isListingCreating
  const [isListingCreating, setIsListingCreating] = useState(false);

  // Setting inserted estate datails
  useEffect(() => {
    const details: AddRealEstateType = {
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
    if (!isListingCreating) {
      navigate("/");
      localStorage.removeItem("addListingDetails");
      setInsertedEstateDetails(undefined);
    }
  }

  // Validating Every Value
  useEffect(() => {
    if (
      invalidAddress ||
      invalidArea ||
      invalidBedrooms ||
      invalidDescription ||
      invalidPrice ||
      invalidZipCode ||
      !imageName ||
      imageError ||
      !image
    ) {
      setIsEverithingValidated(false);
    } else {
      setIsEverithingValidated(true);
    }
  }, [
    invalidAddress,
    invalidArea,
    invalidBedrooms,
    invalidDescription,
    invalidPrice,
    invalidZipCode,
    imageName,
    imageError,
    image,
    selectedAgent,
    selectedRegion,
    selectedCity,
  ]);

  // Creating new Listing
  function createNewListing() {
    if (
      selectedAgent <= 0 ||
      selectedRegion <= 0 ||
      selectedCity <= 0 ||
      !isEverithingValidated
    ) {
      if (selectedAgent <= 0) {
        setInvalidAgent(true);
      }
      if (selectedRegion <= 0) {
        setInvalidRegion(true);
      }
      if (selectedCity <= 0) {
        setInvalidCity(true);
      }
      setIsEverithingValidated(false);
      return;
    }
    setIsListingCreating(true);

    try {
      const payload = {
        image: base64ToFile(image, imageName),
        address,
        region_id: selectedRegion,
        description,
        city_id: selectedCity,
        zip_code: zipCode,
        price,
        area,
        bedrooms,
        is_rental: isRental ? 1 : 0,
        agent_id: selectedAgent,
      };

      axios
        .post(
          "https://api.real-estate-manager.redberryinternship.ge/api/real-estates",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
            },
          }
        )
        .then((data) => {
          console.log("Upload success:", data);
        })
        .catch((err) => {
          if (err.response) {
            console.error("Error response:", err.response.data);
          } else {
            console.error("Error uploading agent:", err.message);
          }
        });
    } catch (error) {
      console.error("Error processing the image:", error);
    }

    setIsListingCreating(false);
    handleCancelOperation();
  }

  return (
    <>
      <form
        className="py-14 max-w-4xl mx-auto w-full flex flex-col gap-20"
        onSubmit={(e) => {
          e.preventDefault();
          createNewListing();
        }}
      >
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
            invalidCity={invalidCity}
            setInvalidCity={setInvalidCity}
            invalidRegion={invalidRegion}
            setInvalidRegion={setInvalidRegion}
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
            invalidAgent={invalidAgent}
            setInvalidAgent={setInvalidAgent}
          />
        </div>
        <div className="flex gap-7 justify-end mt-2">
          <div onClick={handleCancelOperation}>
            <NotFilledButtonCard>გაუქმება</NotFilledButtonCard>
          </div>
          <div>
            <FilledButtonCard disabled={!isEverithingValidated}>
              დაამატე ლისტინგი
            </FilledButtonCard>
          </div>
        </div>
      </form>
      {isListingCreating && <LoadingCard />}
    </>
  );
};

export default AddListing;
