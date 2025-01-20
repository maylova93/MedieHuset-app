import { useEffect, useState } from "react";
import style from "./Header.module.scss";

export const Header = () => {
  const [images, setImages] = useState(null); // Состояние для хранения изображений

  // Используем useEffect для загрузки данных с API
  useEffect(() => {
    const url = "https://api.mediehuset.net/mediesuset/images"; // URL API для получения изображений

    fetch(url) // Выполняем запрос к API
      .then((res) => res.json()) // Преобразуем ответ в JSON
      .then((data) => {
        console.log(data); // Логируем полученные данные
        setImages(data); // Сохраняем данные в состояние
      })
      .catch((err) => console.error("Error fetching images:", err)); // Логируем ошибки
  }, []); // Пустой массив зависимостей означает, что эффект выполнится один раз при монтировании компонента

  return (
    // Проверяем, что данные images существуют, а items[5] доступен
    images && images.items && images.items[5] && (
      <div
        className={style.Header} // Применяем стили для заголовка
        style={{
          backgroundImage: `url(${images.items[4].image})`, // Устанавливаем фоновое изображение
        }}
      >
        {/* Вы можете добавить дополнительный контент сюда, если потребуется */}
      </div>
    )
  );
};
