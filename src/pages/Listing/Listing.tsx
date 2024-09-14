import { useParams } from "react-router";

const Listing = () => {
  const { id } = useParams<{ id: string }>();
  return <div>Listing {id}</div>;
};

export default Listing;
