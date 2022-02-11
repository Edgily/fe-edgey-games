import { useContext } from "react";
import { UserContext } from "../contexts/UserProvider";

export const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <header>
      <div>
        <h1>Edgey Games</h1>
        <section className="userDisplay">
          <h3 className={user.username ? "" : "hidden"}>
            <hr className="header-hr" />
            Logged in as: {user.username}
          </h3>
        </section>
      </div>
    </header>
  );
};
