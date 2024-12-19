import { createContext, createSignal, useContext } from "solid-js";

const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = createSignal(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
}; 