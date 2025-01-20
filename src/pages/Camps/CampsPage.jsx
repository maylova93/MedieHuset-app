import { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom"; 
import styles from "./CampsPage.module.scss"; 

export function CampsPage() {
  const [camps, setCamps] = useState([]); // Состояние для хранения данных о кемпингах
  const [isLoading, setIsLoading] = useState(true); // Состояние загрузки
  const [error, setError] = useState(null); // Состояние для ошибок
  const navigate = useNavigate(); // Инициализация функции navigate для переходов

  // Хук useEffect для загрузки данных при монтировании компонента
  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const response = await fetch("https://api.mediehuset.net/mediesuset/camps"); // Запрос к API
        if (!response.ok) {
          throw new Error("Failed to fetch camps"); // Обработка ошибки запроса
        }
        const data = await response.json(); // Преобразование ответа в JSON
        setCamps(data.items); // Сохранение данных кемпингов в состояние
      } catch (err) {
        setError(err.message); // Установка сообщения об ошибке
      } finally {
        setIsLoading(false); // Установка состояния загрузки в false
      }
    };

    fetchCamps(); // Вызов функции загрузки данных
  }, []); // Пустой массив зависимостей: функция вызывается только при монтировании компонента

  // Отображение состояния загрузки, ошибки или контента
  if (isLoading) return <p>Loading camps...</p>; // Сообщение о загрузке
  if (error) return <p>Something went wrong: {error}</p>; // Сообщение об ошибке

  return (
    <div className={styles.campsPage}>
      {/* Раздел обзора */}
      <section className={styles.overview}>
        <h1>Campingområder</h1> {/* Заголовок страницы */}
        <p>
          Velkommen til festivalens campingområder. Her kan du finde detaljer om de
          forskellige campingpladser, faciliteter og adgangskrav. {/* Описание кемпингов */}
        </p>
      </section>

      {/* Раздел списка кемпингов */}
      <section className={styles.campsList}>
        <h2>Oversigt over Campingområder</h2> {/* Заголовок раздела */}
        <div className={styles.campCards}>
          {camps.map((camp) => (
            <div key={camp.id} className={styles.campCard}>
              {/* Изображение кемпинга */}
              <img src={camp.image} alt={camp.name} className={styles.campImage} />
              {/* Название кемпинга */}
              <h3>{camp.name}</h3>
              {/* Описание кемпинга (обрезка до 100 символов) */}
              <p>{camp.description.slice(0, 100)}...</p>
              {/* Количество людей */}
              <p><strong>Antal personer:</strong> {camp.num_people}</p>
              {/* Кнопка для перехода к деталям кемпинга */}
              <button
                className={styles.detailButton}
                onClick={() => navigate(`/camps/${camp.id}`)} // Переход к странице деталей
              >
                Læs detaljer
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
