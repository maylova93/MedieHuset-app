import { useContext, useState } from "react"; 
import styles from "./LoginPage.module.scss"; 
import { UserContext } from "../../context/userContext"; 
import { FaEnvelope, FaLock } from "react-icons/fa"; 

export function LoginPage() {
  // Хуки для управления состоянием
  const [email, setEmail] = useState(""); // Состояние для ввода email
  const [password, setPassword] = useState(""); // Состояние для ввода пароля
  const [loginMessage, setLoginMessage] = useState(null); // Сообщение для отображения результата входа
  const [error, setError] = useState(null); // Сообщение об ошибке

  const { setUserData } = useContext(UserContext); // Получение функции для обновления данных пользователя из контекста

  // Функция для отправки данных на сервер
  function submitData() {
    // Создание объекта body с ключами и значениями
    const body = new URLSearchParams();
    body.append("username", email); // Добавление email в body
    body.append("password", password); // Добавление пароля в body

    // Настройки для HTTP-запроса методом POST
    const options = {
      method: "POST", // Метод запроса
      body: body, // Передача данных
    };

    // Отправка запроса на сервер с использованием fetch
    fetch("https://api.mediehuset.net/token", options)
      .then((res) => res.json()) // Преобразование ответа в JSON
      .then((data) => {
        // Если сервер вернул access_token, пользователь успешно вошел
        if (data.access_token) {
          setUserData(data); // Сохранение данных пользователя в контексте
          setLoginMessage(
            `Вы вошли в систему. Добро пожаловать, ${data.user.firstname}` // Приветственное сообщение
          );
        } else {
          setLoginMessage("Вы ввели неверный пароль или email"); // Ошибка при неверных данных
        }
      })
      .catch((err) => {
        // Обработка ошибок
        console.error(err);
        setError("Произошла ошибка. Попробуйте позже."); // Сообщение об ошибке
      });
  }

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.title}>Login</h1> {/* Заголовок страницы */}
      <p className={styles.subtitle}>Введите данные для входа:</p> {/* Подзаголовок */}
      {loginMessage && <p className={styles.loginMessage}>{loginMessage}</p>} {/* Сообщение о входе */}
      <div className={styles.form}>
        {/* Группа для ввода email */}
        <div className={styles.inputGroup}>
          <FaEnvelope className={styles.icon} /> {/* Иконка email */}
          <input
            type="text" // Поле для текста
            placeholder="Введите ваш email" // Подсказка для ввода
            value={email} // Привязка состояния email
            onChange={(e) => setEmail(e.target.value)} // Обновление состояния email
          />
        </div>
        {/* Группа для ввода пароля */}
        <div className={styles.inputGroup}>
          <FaLock className={styles.icon} /> {/* Иконка пароля */}
          <input
            type="password" // Поле для ввода пароля
            placeholder="Введите пароль" // Подсказка для ввода
            value={password} // Привязка состояния password
            onChange={(e) => setPassword(e.target.value)} // Обновление состояния password
          />
        </div>
        {/* Кнопка отправки данных */}
        <button
          className={styles.submitButton}
          onClick={submitData} // Обработчик клика
        >
          Отправить
        </button>
      </div>
      {/* Сообщение об ошибке */}
      {error && (
        <p className={styles.errorMessage}>
          {error}
        </p>
      )}
    </div>
  );
}
