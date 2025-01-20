import { createContext, useState } from "react"; 
import PropTypes from "prop-types";

// Создание контекста для управления состоянием пользователя
export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  // Состояние для хранения данных пользователя
  const [userData, setUserData] = useState();

  return (
    // Предоставляем контекст с текущими данными пользователя и функцией для их обновления
    <UserContext.Provider value={{ userData, setUserData }}>
      {children} {/* Рендерим вложенные компоненты */}
    </UserContext.Provider>
  );
};

// Проверка типа пропса children с использованием PropTypes
UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired, // Указывает, что children должен быть React-узлом и является обязательным
};
