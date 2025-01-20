import { useEffect, useState } from 'react';
import { FaEnvelope } from 'react-icons/fa'; 
import styles from './NyhedsBrev.module.scss';

export function NyhedsBrev() {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch('https://api.mediehuset.net/mediesuset/images');
        const data = await response.json();
        setBackgroundImage(data.items[4]?.image || '');
      } catch (error) {
        console.error('Error fetching background image:', error);
      }
    };

    fetchImage();
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Indtast en gyldig emailadresse.');
      setIsSubmitted(false);
      return;
    }

    // Simuler en API-kald for tilmelding
    setIsSubmitted(true);
    setError('');

    // Automatisk nulstilling efter 3 sekunder
    setTimeout(() => {
      setEmail('');
      setIsSubmitted(false);
    }, 3000); // 3 sekunder
  };

  return (
    <div
      className={styles.newsletter}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <h2>TILMELD NYHEDSBREV</h2>
      <p>Få de seneste nyheder sendt til din indbakke</p>
      {!isSubmitted ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles['input-wrapper']}>
            <FaEnvelope className={styles.icon} />
            <input
              type="email"
              placeholder="Indtast emailadresse"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">TILMELD</button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      ) : (
        <div className={styles.success}>
          <p>Tak for din tilmelding!</p>
          <p>Du bliver omdirigeret tilbage...</p>
        </div>
      )}
    </div>
  );
}
