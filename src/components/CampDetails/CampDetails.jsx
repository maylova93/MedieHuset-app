import { useState, useEffect } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import styles from "./CampDetails.module.scss";


export const CampDetails = () => {
  const { id } = useParams(); // Получение ID кемпинга из URL
  const navigate = useNavigate(); // Хук для навигации (например, возвращение на предыдущую страницу)
  const [camp, setCamp] = useState(null); // Состояние для хранения деталей кемпинга
  const [isLoading, setIsLoading] = useState(true); // Состояние загрузки
  const [error, setError] = useState(null); // Состояние ошибки

  // Используем useEffect для загрузки данных о кемпинге
  useEffect(() => {
    const fetchCampDetails = async () => {
      try {
        const response = await fetch(`https://api.mediehuset.net/mediesuset/camps/${id}`); // Запрос к API с использованием ID
        if (!response.ok) {
          throw new Error(`Failed to fetch camp details: ${response.statusText}`); // Обработка ошибок
        }
        const data = await response.json(); // Преобразуем ответ в JSON
        setCamp(data.item); // Сохраняем данные о кемпинге в состояние
      } catch (err) {
        setError(err.message); // Устанавливаем сообщение об ошибке
      } finally {
        setIsLoading(false); // Завершаем состояние загрузки
      }
    };

    fetchCampDetails(); // Вызов функции загрузки данных
  }, [id]); // useEffect запускается при изменении ID

  // Если данные загружаются, отображаем сообщение о загрузке
  if (isLoading) return <p>Loading details...</p>;

  // Если произошла ошибка, отображаем сообщение об ошибке
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.campDetails}>
      {/* Кнопка для возврата на предыдущую страницу */}
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        Tilbage {/* Текст кнопки "Назад" */}
      </button>

      {/* Отображение данных кемпинга */}
      <h1>{camp.name}</h1> {/* Название кемпинга */}
      <img src={camp.image} alt={camp.name} className={styles.campImage} /> {/* Изображение кемпинга */}
      <p>{camp.description}</p> {/* Описание кемпинга */}
      <p>
        <strong>Antal personer:</strong> {camp.num_people} {/* Количество людей */}
      </p>

      {/* Секция с билетами */}
      <h3>Billetter:</h3>
      <ul>
        {camp.tickets.map((ticket) => (
          <li key={ticket.id}>
            <strong>{ticket.name}</strong>: {ticket.description} - {ticket.price} DKK {/* Информация о билете */}
          </li>
        ))}
      </ul>
    </div>
  );
};
