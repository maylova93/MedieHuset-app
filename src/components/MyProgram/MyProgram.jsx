import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import styles from "./MyProgram.module.scss";


export function MyProgram() {
  const { userData } = useContext(UserContext); // Hent brugerdata
  const [events, setEvents] = useState([]); // Liste over brugerens events
  const [error, setError] = useState(null);

  // Hent brugerens events fra API'et
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `https://api.mediehuset.net/mediesuset/programme`,
          {
            headers: {
              Authorization: `Bearer ${userData?.token}`, // Brug token fra userData
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data.items); // Antag at data.items er listen over events
      } catch (err) {
        setError(err.message);
      }
    };

    if (userData?.token) {
      fetchEvents();
    }
  }, [userData]);

  // Funktion til at fjerne et event fra listen
  const removeEvent = async (eventId) => {
    try {
      const response = await fetch(
        `https://api.mediehuset.net/mediesuset/programme/${eventId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${userData?.token}`, // Brug token fra userData
          },
        }
      );

      if (response.ok) {
        setEvents(events.filter((event) => event.id !== eventId)); // Fjern event fra listen
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
        <div className={styles.container}>
          <h1>Mit program</h1>
          {error && <p className={styles.error}>{error}</p>}
          {events.length === 0 ? (
            <p>Du har ingen events i dit program.</p>
          ) : (
            <ul className={styles.eventList}>
              {events.map((event) => (
                <li key={event.id} className={styles.eventItem}>
                  <span className={styles.eventTitle}>{event.title}</span>
                  <button
                    onClick={() => removeEvent(event.id)}
                    className={styles.removeButton}
                  >
                    Fjern
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      );}