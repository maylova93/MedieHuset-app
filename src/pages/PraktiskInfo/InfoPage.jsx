import styles from "./InfoPage.module.scss";
import mapImage from "../../assets/images/mediesuset-map.jpg"; 
import { NyhedsBrev } from "../../components/NyhedsBrev/NyhedsBrev"; 

export function InfoPage ()  {
  return (
    <div>
      <h1>Praktisk Information</h1> {/* Заголовок страницы */}
      <div className={styles.grid}>
        {/* Левая колонка - Карта */}
        <div className={styles.leftColumn}>
          <h2>Kort over pladsen</h2> {/* Заголовок карты */}
          <img
            src={mapImage} // Использование импортированного изображения карты
            alt="Kort over festivalpladsen" // Описание изображения (для доступности)
            className={styles.mapImage} // Применение стилей для изображения карты
          />
        </div>

        {/* Правая колонка - Адрес */}
        <div className={styles.rightColumn}>
          <h2>Find vej</h2> {/* Заголовок адреса */}
          <p>Festivalens adresse:</p> {/* Текст с описанием */}
          <p>
            <strong>Tech College Aalborg</strong> {/* Название места (выделено жирным) */}
          </p>
          <p>Øster Uttrup Vej 1, 9000 Aalborg</p> {/* Адрес фестиваля */}

          {/* Встраивание карты Google */}
          <div className={styles.mapEmbed}>
            <iframe
              title="Festival Location" // Заголовок фрейма (для доступности)
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2299.9379506149247!2d9.935043715833017!3d57.048841781040734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464932c37bc4c4a9%3A0x1fbe50306216de0b!2sTech%20College%20Aalborg!5e0!3m2!1sen!2sdk!4v1695632425403!5m2!1sen!2sdk" // URL для карты
              width="100%" // Установка ширины фрейма
              height="250" // Установка высоты фрейма
              style={{ border: 0 }} // Удаление границы вокруг карты
              allowFullScreen="" // Разрешение полного экрана
              loading="lazy" // Оптимизация загрузки
              referrerPolicy="no-referrer-when-downgrade" // Политика перенаправления
            ></iframe>
          </div>
        </div>
      </div>
      {/* Компонент NyhedsBrev */}
      <div className={styles.nyhedsContainer}>
        <NyhedsBrev />
      </div>
    </div>
  );
};