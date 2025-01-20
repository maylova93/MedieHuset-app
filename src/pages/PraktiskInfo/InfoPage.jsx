import styles from "./InfoPage.module.scss";
import mapImage from "../../assets/images/mediesuset-map.jpg"; // Importér billedet
import { NyhedsBrev } from "../../components/NyhedsBrev/NyhedsBrev";

export const InfoPage = () => {
  return (
    <div>
      <h1>Praktisk Information</h1>
      <div className={styles.grid}>
        {/* Venstre sektion - Kort */}
        <div className={styles.leftColumn}>
          <h2>Kort over pladsen</h2>
          <img
            src={mapImage} // Brug det importerede billede
            alt="Kort over festivalpladsen"
            className={styles.mapImage}
          />
        </div>

        {/* Højre sektion - Adresse */}
        <div className={styles.rightColumn}>
          <h2>Find vej</h2>
          <p>Festivalens adresse:</p>
          <p>
            <strong>Tech College Aalborg</strong>
          </p>
          <p>Øster Uttrup Vej 1, 9000 Aalborg</p>

          {/* Google Map Embed */}
          <div className={styles.mapEmbed}>
            <iframe
              title="Festival Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2299.9379506149247!2d9.935043715833017!3d57.048841781040734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464932c37bc4c4a9%3A0x1fbe50306216de0b!2sTech%20College%20Aalborg!5e0!3m2!1sen!2sdk!4v1695632425403!5m2!1sen!2sdk"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <div className={styles.nyhedsContainer}>
  <NyhedsBrev />
</div>
    </div>
  );
};
