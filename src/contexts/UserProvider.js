import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const username = Object.freeze({ username: "" });

  const [user, setUser] = useState(username);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
