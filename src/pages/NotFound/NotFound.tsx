import { Link } from "react-router-dom";
import FilledButtonCard from "../../components/Buttons/FilledButtonCard";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - Not Found</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center gap-5 mt-20">
        <h1 className="text-4xl">გვერდი ვერ მოიძებნა</h1>
        <Link to="/">
          <FilledButtonCard>დამაბრუნე მთავარ გვერდზე</FilledButtonCard>
        </Link>
      </div>
    </>
  );
};

export default NotFound;
