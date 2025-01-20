import HancockLogo from '../../assets/images/Hancock logo.png';
import styles from './Footer.module.scss'; 

export function Footer() {
  return (
    <>
      {/* Контейнер для нижнего колонтитула */}
      <footer className={styles.footer}>
        {/* Логотип Hancock */}
        <img
          src={HancockLogo} // Путь к изображению логотипа
          alt="Hancock Kvalitet Logo" // Альтернативный текст для логотипа
          className={styles.logo} // Применение стилей к логотипу
        />
        {/* Текст под логотипом */}
        <p className={styles.footerText}>- smag forskellen...</p> {/* Текст: "Почувствуйте разницу" */}
      </footer>
    </>
  );
}
