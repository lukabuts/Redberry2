import MainTitleCard from "../../components/TitleCards/MainTitleCard";
import { useContext, useEffect, useState } from "react";
import AgentFullNameCard from "../../components/AddAgentCards/AgentFullNameCard";
import ContactInfoCard from "../../components/AddAgentCards/ContactInfoCard";
import UploadImageCard from "../../components/UploadImageCard/UploadImageCard";
import { addAgentType } from "../../assets/typescript/types/addAgentType";
import NotFilledButtonCard from "../../components/Buttons/NotFilledButtonCard";
import FilledButtonCard from "../../components/Buttons/FilledButtonCard";
import axios from "axios";
import { SetIsAddAgentShownContext, TokenContext } from "../../App";
import { base64ToFile } from "../../utils/imageUtils";
import LoadingCard from "../../components/LoadingCard.tsx/LoadingCard";
import PopUpWrapper from "../../components/PopUpWrapper/PopUpWrapper";

const AddAgent = () => {
  // token
  const token = useContext(TokenContext);

  // setIsAddAgentShown
  const setIsAddAgentShown = useContext(SetIsAddAgentShownContext);

  // Saved inserted details
  const detailsFromLocalStorage = localStorage.getItem("addAgentDetails");
  const savedAgentDetails: addAgentType =
    detailsFromLocalStorage && detailsFromLocalStorage !== "undefined"
      ? JSON.parse(detailsFromLocalStorage)
      : null;
  // Agent Name
  const [agentName, setagentName] = useState(savedAgentDetails?.name || "");
  const [invalidAgentName, setInvalidAgentName] = useState(true);

  // Agent Surname
  const [agentSurname, setAgentSurname] = useState(
    savedAgentDetails?.surname || ""
  );
  const [invalidAgentSurname, setInvalidAgentSurname] = useState(true);

  // Agent Email
  const [agentEmail, setAgentEmail] = useState(savedAgentDetails?.email || "");
  const [invalidAgentEmail, setInvalidAgentEmail] = useState(true);

  // Agent Mobile Number
  const [agentMobileNumber, setAgentMobileNumber] = useState(
    savedAgentDetails?.phone || ""
  );
  const [invalidAgentMobileNumber, setInvalidAgentMobileNumber] =
    useState(true);
  const [numberStartsWithFive, setNumberStartsWithFive] = useState(false);

  // Avatar
  const [agentAvatar, setAgentAvatar] = useState<string>(
    savedAgentDetails?.avatar || ""
  );
  const [agentAvatarError, setAgentAvatarError] = useState(false);
  const [agentAvatarPreviewUrl, setAgentAvatarPreviewUrl] = useState<string>(
    savedAgentDetails?.avatarPreviewUrl || ""
  );
  const [imageName, setImageName] = useState(
    savedAgentDetails?.imageName || ""
  );

  // Inserted Details
  const [insertedAgentDetails, setInsertedAgentDetails] =
    useState<addAgentType>();

  // IsEvrithingValidated
  const [isEverithingValidated, setIsEverithingValidated] = useState(true);

  // isAgentCreating
  const [isAgentCreating, setIsAgentCreating] = useState(false);

  // Setting inserted estate datails
  useEffect(() => {
    const details: addAgentType = {
      name: agentName,
      surname: agentSurname,
      email: agentEmail,
      phone: agentMobileNumber,
      avatar: agentAvatar,
      avatarPreviewUrl: agentAvatarPreviewUrl,
      imageName: imageName,
    };

    setInsertedAgentDetails(details);
  }, [
    agentName,
    agentSurname,
    agentEmail,
    agentMobileNumber,
    agentAvatar,
    agentAvatarPreviewUrl,
    imageName,
    agentAvatarError,
  ]);

  // Saving Details in localstorage
  useEffect(() => {
    localStorage.setItem(
      "addAgentDetails",
      JSON.stringify(insertedAgentDetails)
    );
  }, [insertedAgentDetails]);

  // Closing The dialog
  function exitAddAgentDialog() {
    if (!isAgentCreating) {
      setIsAddAgentShown(false);
      localStorage.removeItem("addAgentDetails");
      setInsertedAgentDetails(undefined);
    }
  }

  // Validating Every Value
  useEffect(() => {
    if (
      invalidAgentEmail ||
      invalidAgentMobileNumber ||
      invalidAgentName ||
      invalidAgentSurname ||
      !numberStartsWithFive ||
      agentAvatarError ||
      !imageName ||
      !agentAvatar
    ) {
      setIsEverithingValidated(false);
    } else {
      setIsEverithingValidated(true);
    }
  }, [
    invalidAgentEmail,
    invalidAgentMobileNumber,
    invalidAgentName,
    invalidAgentSurname,
    numberStartsWithFive,
    agentAvatarError,
    imageName,
    agentAvatar,
  ]);

  // Creating New Agent
  function createAgent() {
    if (!isEverithingValidated) {
      return;
    }
    setIsAgentCreating(true);
    const formData = new FormData();
    try {
      const fileImage = base64ToFile(agentAvatar, imageName);
      formData.append("name", agentName);
      formData.append("surname", agentSurname);
      formData.append("email", agentEmail);
      formData.append("phone", agentMobileNumber);
      formData.append("avatar", fileImage);

      axios
        .post(
          "https://api.real-estate-manager.redberryinternship.ge/api/agents",
          formData,
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
        })
        .finally(() => {
          setIsAgentCreating(false);
          exitAddAgentDialog();
        });
    } catch (error) {
      console.error("Error processing the image:", error);
    }
  }

  return (
    <PopUpWrapper exitDialog={exitAddAgentDialog}>
      <div className="flex gap-16 flex-col bg-white px-28 py-24 rounded-lg w-full max-w-5xl">
        <form
          onClick={(e) => {
            e.stopPropagation();
          }}
          onSubmit={(e) => {
            e.preventDefault();
            createAgent();
          }}
        >
          <div>
            <MainTitleCard>აგენტის დამატება</MainTitleCard>
          </div>
          <div className="flex flex-col gap-5">
            {/* Agent Name And Surname */}
            <div className="flex gap-5">
              <AgentFullNameCard
                agentName={agentName}
                setagentName={setagentName}
                invalidAgentName={invalidAgentName}
                setInvalidAgentName={setInvalidAgentName}
                agentSurname={agentSurname}
                setAgentSurname={setAgentSurname}
                invalidAgentSurname={invalidAgentSurname}
                setInvalidAgentSurname={setInvalidAgentSurname}
              />
            </div>
            {/* Contact Info */}
            <div className="flex gap-5">
              <ContactInfoCard
                agentEmail={agentEmail}
                setagentEmail={setAgentEmail}
                invalidAgentEmail={invalidAgentEmail}
                setInvalidAgentEmail={setInvalidAgentEmail}
                agentMobileNumber={agentMobileNumber}
                setAgentMobileNumber={setAgentMobileNumber}
                invalidAgentMobileNumber={invalidAgentMobileNumber}
                setInvalidAgentMobileNumber={setInvalidAgentMobileNumber}
                numberStartsWithFive={numberStartsWithFive}
                setNumberStartsWithFive={setNumberStartsWithFive}
              />
            </div>
            {/* Upload Photo */}
            <div className="flex flex-col gap-1">
              <UploadImageCard
                setImage={setAgentAvatar}
                setImageError={setAgentAvatarError}
                imageError={agentAvatarError}
                image={agentAvatar}
                imagePreviewUrl={agentAvatarPreviewUrl}
                setImagePreviewUrl={setAgentAvatarPreviewUrl}
                setImageName={setImageName}
              />
            </div>
          </div>
          <div className="flex space-x-4 justify-end">
            <div onClick={exitAddAgentDialog}>
              <NotFilledButtonCard>გაუქმება</NotFilledButtonCard>
            </div>

            <FilledButtonCard disabled={!isEverithingValidated}>
              დაამატე აგენტი
            </FilledButtonCard>
          </div>
        </form>
      </div>
      {isAgentCreating && <LoadingCard />}
    </PopUpWrapper>
  );
};

export default AddAgent;
