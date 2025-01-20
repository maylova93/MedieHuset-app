import { useContext, useState } from "react";
import styles from "./LoginPage.module.scss";
import { UserContext } from "../../context/userContext";
import { FaEnvelope, FaLock } from "react-icons/fa";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState(null);
  const [error, setError] = useState(null);

  const { setUserData } = useContext(UserContext);


  function submitData() {
    // Sådan her opretter man en body med key-value pairs
    const body = new URLSearchParams();
    body.append("username", email);
    body.append("password", password);

    // Opret et options object med HTTP request metode "POST" og vores body
    const options = {
      method: "POST",
      body: body,
    };

  

    // Fetch (med options - POST til server)
    fetch("https://api.mediehuset.net/token", options)
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          setUserData(data);
          setLoginMessage(
            `Du er nu logget ind.. Velkommen tilbage ${data.user.firstname}`
          );
        } else {
          setLoginMessage("Du har tastet forkert password eller email");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Der opstod en fejl. Prøv igen senere.");
      });
  }

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.title}>Login</h1>
      <p className={styles.subtitle}>Indtast login oplysninger:</p>
      {loginMessage && <p className={styles.loginMessage}>{loginMessage}</p>}
      <div className={styles.form}>
        <div className={styles.inputGroup}>
          <FaEnvelope className={styles.icon} />
          <input
            type="text"
            placeholder="Indtast din email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <FaLock className={styles.icon} />
          <input
            type="password"
            placeholder="Indtast adgangskode"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className={styles.submitButton}
          onClick={submitData} 
        >
          Send
        </button>
      </div>
      {error && (
        <p className={styles.errorMessage}>
          {error}
        </p>
      )}
    </div>
  );
}
