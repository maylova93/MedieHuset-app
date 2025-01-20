import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "./CampsPage.module.scss";

export function CampsPage() {
  const [camps, setCamps] = useState([]); // State for camps data
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate(); // Initialize navigate

  // Fetch camps data on component mount
  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const response = await fetch("https://api.mediehuset.net/mediesuset/camps");
        if (!response.ok) {
          throw new Error("Failed to fetch camps");
        }
        const data = await response.json();
        setCamps(data.items); // Update the state with the camps data
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCamps();
  }, []);

  // Render loading, error, or content
  if (isLoading) return <p>Loading camps...</p>;
  if (error) return <p>Something went wrong: {error}</p>;

  return (
    <div className={styles.campsPage}>
      {/* Overview Section */}
      <section className={styles.overview}>
        <h1>Campingområder</h1>
        <p>
          Velkommen til festivalens campingområder. Her kan du finde detaljer om de
          forskellige campingpladser, faciliteter og adgangskrav.
        </p>
      </section>

      {/* Camps List Section */}
      <section className={styles.campsList}>
        <h2>Oversigt over Campingområder</h2>
        <div className={styles.campCards}>
          {camps.map((camp) => (
            <div key={camp.id} className={styles.campCard}>
              {/* Image */}
              <img src={camp.image} alt={camp.name} className={styles.campImage} />
              {/* Name */}
              <h3>{camp.name}</h3>
              {/* Sliced Description */}
              <p>{camp.description.slice(0, 100)}...</p>
              {/* Number of People */}
              <p><strong>Antal personer:</strong> {camp.num_people}</p>
              {/* Button */}
              <button
                className={styles.detailButton}
                onClick={() => navigate(`/camps/${camp.id}`)} // Navigate to CampDetails
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
