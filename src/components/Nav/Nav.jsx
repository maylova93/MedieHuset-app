import { useState } from 'react';
import { NavLink } from 'react-router-dom'; 
import styles from './Nav.module.scss'; 
import logo from '../../assets/images/Logo.png';
import { FaSearch } from 'react-icons/fa'; 

export function Nav() {
  // Состояния компонента
  const [searchOpen, setSearchOpen] = useState(false); // Состояние для отображения поля поиска
  const [dropdownOpen, setDropdownOpen] = useState(false); // Состояние для отображения выпадающего меню
  const [searchTerm, setSearchTerm] = useState(''); // Состояние для ввода текста в поле поиска

  // Обработчик для переключения видимости поля поиска
  const handleSearchToggle = () => {
    setSearchOpen((prev) => !prev); // Меняем состояние на противоположное
  };

  // Обработчик для изменения текста в поле поиска
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Сохраняем введённое значение
  };

  return (
    <nav className={styles.nav}>
      {/* Логотип и дата */}
      <div className={styles.logoContainer}>
        <img src={logo} alt="MedieSuset Logo" className={styles.logo} /> {/* Логотип */}
        <span className={styles.date}>4 - 7. juli 2022</span> {/* Дата события */}
      </div>
      {/* Ссылки навигации */}
      <ul className={styles.navLinks}>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : '')}>
            FORSIDE {/* Главная страница */}
          </NavLink>
        </li>
        {/* Выпадающее меню для EVENTS */}
        <li
          className={styles.dropdown}
          onMouseEnter={() => setDropdownOpen(true)} // Открываем меню при наведении
          onMouseLeave={() => setDropdownOpen(false)} // Закрываем меню при уходе курсора
        >
          <span>EVENTS</span>
          {dropdownOpen && (
            <ul className={styles.dropdownMenu}>
              <li>
                <NavLink to="/events/lineup" className={({ isActive }) => (isActive ? styles.active : '')}>
                  LINE-UP {/* Состав участников */}
                </NavLink>
              </li>
              <li>
                <NavLink to="/events/program" className={({ isActive }) => (isActive ? styles.active : '')}>
                  PROGRAM {/* Программа мероприятия */}
                </NavLink>
              </li>
            </ul>
          )}
        </li>
        <li>
          <NavLink to="/camps" className={({ isActive }) => (isActive ? styles.active : '')}>
            CAMPS {/* Кемпинги */}
          </NavLink>
        </li>
        <li>
          <NavLink to="/billetter" className={({ isActive }) => (isActive ? styles.active : '')}>
            BILLETTER {/* Билеты */}
          </NavLink>
        </li>
        <li>
          <NavLink to="/praktisk-info" className={({ isActive }) => (isActive ? styles.active : '')}>
            PRAKTISK INFO {/* Практическая информация */}
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : '')}>
            LOGIN {/* Логин */}
          </NavLink>
        </li>
      </ul>
      {/* Иконка поиска */}
      <div className={styles.searchIcon}>
        <FaSearch onClick={handleSearchToggle} /> {/* Иконка поиска */}
        {searchOpen && (
          <input
            type="text"
            className={styles.searchInput} // Поле для поиска
            placeholder="Søg..." // Подсказка
            value={searchTerm} // Значение из состояния
            onChange={handleSearchChange} // Обновление состояния при вводе текста
          />
        )}
      </div>
    </nav>
  );
}
