import { useGet } from "../../hooks/useGet";
import { NyhedsBrev } from "../../components/NyhedsBrev/NyhedsBrev";
import { Link } from "react-router-dom";
import styles from "../../pages/HomePage/HomePage.module.scss";

export function HomePage() {
  const { data: news, error, isLoading } = useGet(
    "https://api.mediehuset.net/mediesuset/news"
  );

  if (isLoading) {
    return <p>Loading news...</p>;
  }

  if (error) {
    return <p>Error fetching news: {error.message}</p>;
  }

  return (
    <>
      <div>
        <h2 className={styles.NewsHeading}>NYHEDER</h2>
        <div className={styles.NewsGrid}>
          {news?.items?.slice(0, 6).map((item) => (
            <div className={styles.NewsCard} key={item.id}>
              <img
                src={item.image}
                alt={item.title}
                className={styles.NewsImage}
              />
              <div className={styles.NewsContent}>
                <h3>{item.title}</h3>
                <p>{item.teaser}</p>
                <Link to={`/news/${item.id}`} className={styles.ReadMore}>
                  LÆS MERE <span>&rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <NyhedsBrev />
    </>
  );
}
