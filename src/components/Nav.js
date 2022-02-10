import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <nav>
      <Link to="/signin">Sign In</Link>
      <Link to="/">Reviews</Link>
    </nav>
  );
};
