import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./CampDetails.module.scss";

export const CampDetails = () => {
  const { id } = useParams(); // Get camp ID from URL
  const navigate = useNavigate(); // For navigation back
  const [camp, setCamp] = useState(null); // State for camp details
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchCampDetails = async () => {
      try {
        const response = await fetch(`https://api.mediehuset.net/mediesuset/camps/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch camp details: ${response.statusText}`);
        }
        const data = await response.json();
        setCamp(data.item); // Update state with camp details
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampDetails();
  }, [id]);

  if (isLoading) return <p>Loading details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.campDetails}>
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        Tilbage
      </button>
      <h1>{camp.name}</h1>
      <img src={camp.image} alt={camp.name} className={styles.campImage} />
      <p>{camp.description}</p>
      <p>
        <strong>Antal personer:</strong> {camp.num_people}
      </p>
      <h3>Billetter:</h3>
      <ul>
        {camp.tickets.map((ticket) => (
          <li key={ticket.id}>
            <strong>{ticket.name}</strong>: {ticket.description} - {ticket.price} DKK
          </li>
        ))}
      </ul>
    </div>
  );
};
