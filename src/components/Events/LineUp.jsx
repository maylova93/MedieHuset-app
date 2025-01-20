import  { useEffect, useState } from 'react';
import { Modal } from '../../components/Modal/Modal';
import styles from './LineUp.module.scss';
import { NyhedsBrev } from '../NyhedsBrev/NyhedsBrev';

export function LineUp() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [sortOption, setSortOption] = useState('A-Å'); // Standard sortering
  const [modalData, setModalData] = useState(null); // Data til modal

  useEffect(() => {
    // Fetch data fra API
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://api.mediehuset.net/mediesuset/events/{{id}}');
        const data = await response.json();
        setEvents(data.items || []);
        setFilteredEvents(data.items?.slice(0, 12) || []); // Begræns til 12 events
      } catch (error) {
        console.error('Fejl ved hentning af data:', error);
      }
    };

    fetchEvents();
  }, []);

  // Håndter sortering
  const handleSort = (option) => {
    setSortOption(option);
    let sortedEvents = [...events];

    if (option === 'A-Å') {
      sortedEvents.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      sortedEvents = events.filter((event) => event.stage === option);
    }

    setFilteredEvents(sortedEvents.slice(0, 12)); // Begræns til 12 events
  };

  // Nulstil sortering
  const resetFilter = () => {
    setFilteredEvents(events.slice(0, 12)); // Nulstil til de første 12
    setSortOption('A-Å');
  };

  // Håndter åbning af modal
  const openModal = (event) => {
    setModalData(event);
  };

  // Håndter lukning af modal
  const closeModal = () => {
    setModalData(null);
  };

  return (
    <>
    <div className={styles.lineUp}>
      <h2>LINE UP</h2>
      {/* Sorteringsknapper */}
      <div className={styles.filters}>
        <button
          className={`${styles.filterButton} ${sortOption === 'A-Å' ? styles.active : ''}`}
          onClick={() => handleSort('A-Å')}
        >
          A-Å
        </button>
        <button
          className={`${styles.filterButton} ${sortOption === 'Rød Scene' ? styles.active : ''}`}
          onClick={() => handleSort('Rød Scene')}
        >
          Rød Scene
        </button>
        <button
          className={`${styles.filterButton} ${sortOption === 'Blå Scene' ? styles.active : ''}`}
          onClick={() => handleSort('Blå Scene')}
        >
          Blå Scene
        </button>
        <button
          className={`${styles.filterButton} ${sortOption === 'Grøn Scene' ? styles.active : ''}`}
          onClick={() => handleSort('Grøn Scene')}
        >
          Grøn Scene
        </button>
        <button
          className={`${styles.filterButton} ${sortOption === 'Lilla Scene' ? styles.active : ''}`}
          onClick={() => handleSort('Lilla Scene')}
        >
          Lilla Scene
        </button>
        <button className={styles.resetButton} onClick={resetFilter}>
          Nulstil
        </button>
      </div>

      {/* Event grid */}
      <div className={styles.eventGrid}>
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className={styles.eventCard}
            style={{ backgroundColor: event.color }}
            onClick={() => openModal(event)}
          >
            <img src={event.image} alt={event.title} className={styles.image} />
            <div className={styles.info}>
              <h3>{event.title}</h3>
              <p>{event.day} kl. {event.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal komponent */}
      <Modal modalData={modalData} closeModal={closeModal} />
    </div>
    <NyhedsBrev/>
    </>
  );
}
