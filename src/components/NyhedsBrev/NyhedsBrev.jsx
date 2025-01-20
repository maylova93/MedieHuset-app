import { useEffect, useState } from 'react'; 
import { FaEnvelope } from 'react-icons/fa';
import styles from './NyhedsBrev.module.scss';

export function NyhedsBrev() {
  // Состояния компонента
  const [backgroundImage, setBackgroundImage] = useState(''); // Состояние для фонового изображения
  const [email, setEmail] = useState(''); // Состояние для ввода email
  const [isSubmitted, setIsSubmitted] = useState(false); // Состояние для отображения успеха отправки
  const [error, setError] = useState(''); // Состояние для отображения ошибок

  // Загружаем фоновое изображение при монтировании компонента
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch('https://api.mediehuset.net/mediesuset/images'); // Запрос к API
        const data = await response.json(); // Преобразование ответа в JSON
        setBackgroundImage(data.items[4]?.image || ''); // Устанавливаем 4-е изображение как фон
      } catch (error) {
        console.error('Error fetching background image:', error); // Логируем ошибку
      }
    };

    fetchImage(); // Вызываем функцию загрузки изображения
  }, []); // Пустой массив зависимостей: выполняется только при монтировании

  // Валидация email-адреса с использованием регулярного выражения
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Регулярное выражение для проверки email
    return emailRegex.test(email); // Возвращает true, если email корректный
  };

  // Обработка отправки формы
  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    if (!validateEmail(email)) {
      setError('Indtast en gyldig emailadresse.'); // Устанавливаем сообщение об ошибке
      setIsSubmitted(false); // Сбрасываем состояние успешной отправки
      return;
    }

    // Симулируем API-запрос
    setIsSubmitted(true); // Устанавливаем состояние успешной отправки
    setError(''); // Сбрасываем сообщение об ошибке

    // Автоматический сброс формы через 3 секунды
    setTimeout(() => {
      setEmail(''); // Сбрасываем поле ввода email
      setIsSubmitted(false); // Сбрасываем состояние отправки
    }, 3000); // 3 секунды
  };

  return (
    <div
      className={styles.newsletter} // Применяем стили контейнера
      style={{
        backgroundImage: `url(${backgroundImage})`, // Устанавливаем фоновое изображение
      }}
    >
      <h2>TILMELD NYHEDSBREV</h2> {/* Заголовок компонента */}
      <p>Få de seneste nyheder sendt til din indbakke</p> {/* Подзаголовок */}
      {!isSubmitted ? ( // Если форма еще не отправлена
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Поле ввода email */}
          <div className={styles['input-wrapper']}>
            <FaEnvelope className={styles.icon} /> {/* Иконка конверта */}
            <input
              type="email" // Поле для ввода email
              placeholder="Indtast emailadresse" // Подсказка
              value={email} // Привязка состояния email
              onChange={(e) => setEmail(e.target.value)} // Обновление состояния email
              required // Поле обязательно для заполнения
            />
          </div>
          <button type="submit">TILMELD</button> {/* Кнопка отправки */}
          {error && <p className={styles.error}>{error}</p>} {/* Сообщение об ошибке */}
        </form>
      ) : (
        <div className={styles.success}>
          {/* Сообщение об успешной отправке */}
          <p>Tak for din tilmelding!</p>
          <p>Du bliver omdirigeret tilbage...</p>
        </div>
      )}
    </div>
  );
}
