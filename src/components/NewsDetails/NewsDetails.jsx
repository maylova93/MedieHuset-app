import { useParams, useNavigate } from "react-router-dom";
import { useGet } from "../../hooks/useGet";
import styles from "./NewsDetails.module.scss";

export const NewsDetails = () => {
  const { id } = useParams(); // Dynamic id from URL
  const navigate = useNavigate(); // Navigation hook for going back

  const { data, error, isLoading } = useGet(
    `https://api.mediehuset.net/mediesuset/news/${id}` // Fetch specific item
  );

  if (isLoading) return <p>Loading...</p>; // Loading text

  if (error || !data || !data.item)
    return <p>Kunne ikke hente nyhedsdetaljer.</p>;

  // Destructure properties from the response
  const { title, content, image, author, datetime } = data.item;

  return (
    <div className={styles.NewsDetails}>
      <h1>{title}</h1>
      <p>
        <strong></strong> {author || "Ikke angivet"} |{" "}
        <strong>Dato:</strong>{" "}
        {datetime
          ? new Date(datetime).toLocaleDateString("da-DK")
          : "Ikke angivet"}
      </p>
      <img src={image} alt={title} className={styles.NewsImage} />
      <p>{content}</p>
      <button className={styles.BackButton} onClick={() => navigate("/")}>
        Tilbage til Hjem
      </button>
    </div>
  );
};
