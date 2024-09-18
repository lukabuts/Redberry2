import { Link } from "react-router-dom";
import redberryLogo from "../../assets/images/redberry_logo.svg";

const Header = () => {
  return (
    <header className="px-36 py-10 border-b border-lightGray">
      <Link to="/">
        <img loading="lazy" src={redberryLogo} alt="Redberry Logo" />
      </Link>
    </header>
  );
};

export default Header;
