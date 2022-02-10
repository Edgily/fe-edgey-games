import { useContext } from "react";
import { UserContext } from "../contexts/UserProvider";

export const Header = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <header>
      <h1>Edgey Games</h1>
      <section className="userDisplay">
        <h3 className={user.username ? "" : "hidden"}>
          {" "}
          Logged in as: {user.username}
        </h3>
      </section>
    </header>
  );
};
