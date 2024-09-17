import { useNavigate } from "react-router";
import MainTitleCard from "../../components/TitleCards/MainTitleCard";
import { useContext, useEffect, useState } from "react";
import AgentFullNameCard from "../../components/AddAgentCards/AgentFullNameCard";
import ContactInfoCard from "../../components/AddAgentCards/ContactInfoCard";
import UploadImageCard from "../../components/UploadImageCard/UploadImageCard";
import { addAgentType } from "../../assets/typescript/types/addAgentType";
import NotFilledButtonCard from "../../components/Buttons/NotFilledButtonCard";
import FilledButtonCard from "../../components/Buttons/FilledButtonCard";
import axios from "axios";
import { TokenContext } from "../../App";

const AddAgent = () => {
  // token
  const token = useContext(TokenContext);
  // Saved inserted details
  const detailsFromLocalStorage = localStorage.getItem("addAgentDetails");
  const savedAgentDetails: addAgentType =
    detailsFromLocalStorage && detailsFromLocalStorage !== "undefined"
      ? JSON.parse(detailsFromLocalStorage)
      : null;
  // Agent Name
  const [agentName, setagentName] = useState(savedAgentDetails?.name || "");
  const [invalidAgentName, setInvalidAgentName] = useState(false);

  // Agent Surname
  const [agentSurname, setAgentSurname] = useState(
    savedAgentDetails?.surname || ""
  );
  const [invalidAgentSurname, setInvalidAgentSurname] = useState(false);

  // Agent Email
  const [agentEmail, setAgentEmail] = useState(savedAgentDetails?.email || "");
  const [invalidAgentEmail, setInvalidAgentEmail] = useState(false);

  // Agent Mobile Number
  const [agentMobileNumber, setAgentMobileNumber] = useState(
    savedAgentDetails?.phone || ""
  );
  const [invalidAgentMobileNumber, setInvalidAgentMobileNumber] =
    useState(false);

  // Avatar
  const [agentAvatar, setAgentAvatar] = useState<string>(
    savedAgentDetails?.avatar || ""
  );
  const [agentAvatarError, setAgentAvatarError] = useState(false);
  const [agentAvatarPreviewUrl, setAgentAvatarPreviewUrl] = useState<string>(
    savedAgentDetails?.avatarPreviewUrl || ""
  );

  // Inserted Details
  const [insertedAgentDetails, setInsertedAgentDetails] =
    useState<addAgentType>();

  // Setting inserted estate datails
  useEffect(() => {
    const details: addAgentType = {
      name: agentName,
      surname: agentSurname,
      email: agentEmail,
      phone: agentMobileNumber,
      avatar: agentAvatar,
      avatarPreviewUrl: agentAvatarPreviewUrl,
    };

    setInsertedAgentDetails(details);
  }, [
    agentName,
    agentSurname,
    agentEmail,
    agentMobileNumber,
    agentAvatar,
    agentAvatarPreviewUrl,
  ]);

  // Saving Details in localstorage
  useEffect(() => {
    localStorage.setItem(
      "addAgentDetails",
      JSON.stringify(insertedAgentDetails)
    );
  }, [insertedAgentDetails]);

  // Closing The dialog
  const navigate = useNavigate();
  function exitAddAgentDialog() {
    navigate("/");
    localStorage.removeItem("addAgentDetails");
    setInsertedAgentDetails(undefined);
  }

  // Creating New Agent
  function createAgent() {
    const formData = new FormData();
    formData.append("name", agentName);
    formData.append("surname", agentSurname);
    formData.append("email", agentEmail);
    formData.append("phone", agentMobileNumber);
    formData.append("avatar", agentAvatar);

    axios
      .post("https://api.blog.redberryinternship.ge/api/agents", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("Error uploading blog:", err);
      });
  }
  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-deepBlue/35 backdrop-blur-sm"
      onClick={exitAddAgentDialog}
    >
      <form
        className="flex gap-16 flex-col bg-white px-28 py-24 rounded-lg w-full max-w-5xl"
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
            />
          </div>
        </div>
        <div className="flex space-x-4 justify-end">
          <div onClick={exitAddAgentDialog}>
            <NotFilledButtonCard>გაუქმება</NotFilledButtonCard>
          </div>

          <FilledButtonCard>დაამატე აგენტი</FilledButtonCard>
        </div>
      </form>
    </div>
  );
};

export default AddAgent;
