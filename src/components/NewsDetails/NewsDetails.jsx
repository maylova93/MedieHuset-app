import { useParams, useNavigate } from "react-router-dom"; 
import { useGet } from "../../hooks/useGet"; 
import styles from "./NewsDetails.module.scss"; 

export const NewsDetails = () => {
  const { id } = useParams(); // Получение динамического ID из URL
  const navigate = useNavigate(); // Хук для навигации (например, вернуться назад)

  // Запрос к API для получения данных конкретной новости
  const { data, error, isLoading } = useGet(
    `https://api.mediehuset.net/mediesuset/news/${id}` // Формируем URL с ID
  );

  // Если данные загружаются, отображаем сообщение о загрузке
  if (isLoading) return <p>Loading...</p>;

  // Если произошла ошибка или данные отсутствуют, отображаем сообщение об ошибке
  if (error || !data || !data.item)
    return <p>Kunne ikke hente nyhedsdetaljer.</p>; // "Не удалось загрузить детали новости"

  // Деструктурируем данные из ответа API
  const { title, content, image, author, datetime } = data.item;

  return (
    <div className={styles.NewsDetails}>
      <h1>{title}</h1> {/* Заголовок новости */}
      <p>
        <strong></strong> {author || "Ikke angivet"} {/* Автор новости (если отсутствует, отображается "Не указано") */} |{" "}
        <strong>Dato:</strong>{" "}
        {datetime
          ? new Date(datetime).toLocaleDateString("da-DK") // Форматируем дату в "день-месяц-год"
          : "Ikke angivet"} {/* Если дата отсутствует, отображается "Не указано" */}
      </p>
      <img src={image} alt={title} className={styles.NewsImage} /> {/* Изображение новости */}
      <p>{content}</p> {/* Контент новости */}
      <button className={styles.BackButton} onClick={() => navigate("/")}>
        Tilbage til Hjem {/* Кнопка для возвращения на главную страницу */}
      </button>
    </div>
  );
};
