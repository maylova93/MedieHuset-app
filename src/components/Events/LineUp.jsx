import { useEffect, useState } from 'react';
import { Modal } from '../../components/Modal/Modal'; 
import styles from './LineUp.module.scss'; 
import { NyhedsBrev } from '../NyhedsBrev/NyhedsBrev'; 

export function LineUp() {
  // Состояния компонента
  const [events, setEvents] = useState([]); // Все события
  const [filteredEvents, setFilteredEvents] = useState([]); // Отфильтрованные события
  const [sortOption, setSortOption] = useState('A-Å'); // Текущая опция сортировки
  const [modalData, setModalData] = useState(null); // Данные для модального окна

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://api.mediehuset.net/mediesuset/events'); // Запрос к API
        if (!response.ok) {
          throw new Error('Fejl ved hentning af data'); // Обработка ошибки
        }
        const data = await response.json(); // Преобразование ответа в JSON
        setEvents(data.items || []); // Сохраняем все события
        setFilteredEvents(data.items?.slice(0, 12) || []); // Ограничиваем отображение 12 событиями
      } catch (error) {
        console.error('Fejl ved hentning af data:', error); // Логирование ошибки
      }
    };

    fetchEvents(); // Вызов функции загрузки данных
  }, []);

  // Обработчик сортировки событий
  const handleSort = (option) => {
    setSortOption(option); // Устанавливаем выбранную опцию сортировки
    let sortedEvents = [...events];

    if (option === 'A-Å') {
      // Сортировка по алфавиту
      sortedEvents.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // Фильтрация по сцене
      sortedEvents = events.filter((event) => event.stage_name === option);
    }

    setFilteredEvents(sortedEvents.slice(0, 12)); // Ограничиваем отображение 12 событиями
  };

  // Сброс фильтров
  const resetFilter = () => {
    setFilteredEvents(events.slice(0, 12)); // Возвращаем первые 12 событий
    setSortOption('A-Å'); // Сбрасываем опцию сортировки
  };

  // Открытие модального окна
  const openModal = (event) => {
    setModalData(event); // Передаем данные события в модальное окно
  };

  // Закрытие модального окна
  const closeModal = () => {
    setModalData(null); // Сбрасываем данные модального окна
  };

  return (
    <>
      <div className={styles.lineUp}>
        <h2>LINE UP</h2>
        {/* Фильтры */}
        <div className={styles.filters}>
          {/* Кнопки сортировки */}
          <button
            className={`${styles.filterButton} ${sortOption === 'A-Å' ? styles.active : ''}`}
            onClick={() => handleSort('A-Å')}
          >
            A-Å
          </button>
          <button
            className={`${styles.filterButton} ${sortOption === 'Rød scene' ? styles.active : ''}`}
            onClick={() => handleSort('Rød scene')}
          >
            Rød Scene
          </button>
          <button
            className={`${styles.filterButton} ${sortOption === 'Blå scene' ? styles.active : ''}`}
            onClick={() => handleSort('Blå scene')}
          >
            Blå Scene
          </button>
          <button
            className={`${styles.filterButton} ${sortOption === 'Grøn scene' ? styles.active : ''}`}
            onClick={() => handleSort('Grøn scene')}
          >
            Grøn Scene
          </button>
          <button
            className={`${styles.filterButton} ${sortOption === 'Lilla scene' ? styles.active : ''}`}
            onClick={() => handleSort('Lilla scene')}
          >
            Lilla Scene
          </button>
          <button className={styles.resetButton} onClick={resetFilter}>
            Nulstil
          </button>
        </div>

        {/* Сетка событий */}
        <div className={styles.eventGrid}>
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className={styles.eventCard}
              style={{ backgroundColor: event.color }} // Динамический цвет карточки
              onClick={() => openModal(event)} // Открытие модального окна при клике
            >
              <img src={event.image} alt={event.title} className={styles.image} /> {/* Изображение */}
              <div className={styles.info}>
                <h3>{event.title}</h3> {/* Заголовок */}
                <p>
                  {new Date(event.datetime).toLocaleDateString('da-DK', {
                    weekday: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })} {/* Форматирование даты и времени */}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Модальное окно */}
        <Modal modalData={modalData} closeModal={closeModal} />
      </div>
      {/* Компонент NyhedsBrev */}
      <NyhedsBrev />
    </>
  );
}
