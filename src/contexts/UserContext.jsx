import { createContext, createSignal, useContext } from "solid-js";

const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = createSignal(null);
   // Загружаем пользователя из localStorage при загрузке приложения
   onMount(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  });

  // Обновляем localStorage при изменении пользователя
  const updateUser = (newUser) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("user");
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser: updateUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
}; 