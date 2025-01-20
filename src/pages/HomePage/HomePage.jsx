import { useGet } from "../../hooks/useGet"; 
import { NyhedsBrev } from "../../components/NyhedsBrev/NyhedsBrev"; 
import { Link } from "react-router-dom"; 
import styles from "../../pages/HomePage/HomePage.module.scss";

export function HomePage() {
  // Используем хук useGet для получения новостей
  const { data: news, error, isLoading } = useGet(
    "https://api.mediehuset.net/mediesuset/news" // URL API для новостей
  );

  // Если данные загружаются, отображаем сообщение
  if (isLoading) {
    return <p>Loading news...</p>; // Сообщение о загрузке
  }

  // Если произошла ошибка, отображаем сообщение об ошибке
  if (error) {
    return <p>Error fetching news: {error.message}</p>; // Сообщение об ошибке
  }

  return (
    <>
      <div>
        <h2 className={styles.NewsHeading}>NYHEDER</h2> {/* Заголовок раздела */}
        <div className={styles.NewsGrid}>
          {/* Перебор массива новостей и отображение первых 6 элементов */}
          {news?.items?.slice(0, 6).map((item) => (
            <div className={styles.NewsCard} key={item.id}>
              {/* Изображение новости */}
              <img
                src={item.image} // URL изображения
                alt={item.title} // Описание изображения
                className={styles.NewsImage} // Применение стилей
              />
              {/* Контент новости */}
              <div className={styles.NewsContent}>
                <h3>{item.title}</h3> {/* Заголовок новости */}
                <p>{item.teaser}</p> {/* Краткий текст новости */}
                {/* Ссылка для перехода к полной новости */}
                <Link to={`/news/${item.id}`} className={styles.ReadMore}>
                  LÆS MERE <span>&rarr;</span> {/* Текст ссылки с иконкой стрелки */}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Включение компонента NyhedsBrev */}
      <NyhedsBrev />
    </>
  );
}
