import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserProvider";
import { getUsers, postUser } from "../utils/api-utils";

export const SignIn = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [users, setUsers] = useState();
  const [signInInput, setSignInInput] = useState("");

  const initialCreateData = Object.freeze({
    username: "",
    name: "",
    avatar_url: "",
  });
  const [createData, updateCreateData] = useState(initialCreateData);

  useEffect(() => {
    getUsers().then((data) => {
      const usersArray = data.users.map((user) => user.username);

      setUsers(usersArray);
    });
  }, []);

  // Sign In section
  const handleSignInChange = (event) => {
    setSignInInput(() => event.target.value);
    document.getElementById("signInInput").setCustomValidity("");
  };

  const handleSignIn = (event) => {
    event.preventDefault();

    if (!users.includes(signInInput)) {
      document
        .getElementById("signInInput")
        .setCustomValidity("User does not exist");
    } else {
      setUser((currUser) => {
        const newUser = { ...currUser };
        newUser.username = signInInput;
        return newUser;
      });
      navigate("/");
    }
  };

  // Create New User section
  const handleCreateChange = (e) => {
    updateCreateData({
      ...createData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });

    document.getElementById("createUsernameInput").setCustomValidity("");
  };

  const handleCreate = (event) => {
    event.preventDefault();

    if (users.includes(createData.username)) {
      document
        .getElementById("createUsernameInput")
        .setCustomValidity("User already exists.");
    } else {
      postUser(createData).then(() => {
        setUser((currUser) => {
          const newUser = { ...currUser };
          newUser.username = createData.username;
          return newUser;
        });
        navigate("/");
      });
    }
  };

  return (
    <main>
      <h1>Sign In</h1>
      <form id="signIn" onSubmit={handleSignIn}>
        <input
          id="signInInput"
          type="text"
          placeholder="*Username here*"
          maxLength={50}
          onChange={handleSignInChange}
          value={signInInput}
          required
          autoComplete="off"
        />
        <br />
        <button>Submit</button>
      </form>
      <br />
      <br />
      <h1>Create New User</h1>
      <form id="create" onSubmit={handleCreate}>
        <input
          id="createUsernameInput"
          name="username"
          type="text"
          placeholder="*Username here*"
          maxLength={50}
          onChange={handleCreateChange}
          value={createData.username}
          required
          autoComplete="off"
        />
        <input
          id="createNameInput"
          name="name"
          type="text"
          placeholder="*Name here*"
          maxLength={50}
          onChange={handleCreateChange}
          value={createData.name}
          required
          autoComplete="off"
        />
        <input
          id="createAvatarInput"
          name="avatar_url"
          type="url"
          placeholder="*Avatar URL here*"
          maxLength={150}
          onChange={handleCreateChange}
          value={createData.avatar_url}
          autoComplete="off"
        />
        <br />
        <button>Submit</button>
      </form>
    </main>
  );
};
