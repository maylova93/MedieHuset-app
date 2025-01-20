import { useContext } from "react";
import { NavLink } from "react-router-dom"; // Importer NavLink
import { UserContext } from "../../context/userContext";
import styles from './Navigation.module.scss'; // Importer styles

export function Navigation() {
  const { userData, setUserData, logout } = useContext(UserContext);
 

  const handleLogout = () => {
    setUserData(null); // Nulstil brugerdata ved log ud
    localStorage.removeItem("token"); // Slet evt. token
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {userData ? (
          <>
            <li className={styles.navItem}>
              Min side
              <ul className={styles.dropdown}>
                <li className={styles.dropdownItem}>
                  <NavLink
                    to="/my-program"
                    className={({ isActive }) =>
                      isActive ? styles.active : styles.navLink
                    }
                  >
                    Mit program
                  </NavLink>
                </li>
                <li className={styles.dropdownItem}>
                  <button
                    onClick={logout}
                    className={styles.logoutButton}
                  >
                    Log ud
                  </button>
                </li>
              </ul>
            </li>
          </>
        ) : (
          <li className={styles.navItem}>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? styles.active : styles.navLink
              }
            >
              Log ind
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
