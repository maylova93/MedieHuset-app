import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Nav.module.scss';
import logo from '../../assets/images/Logo.png';
import { FaSearch } from 'react-icons/fa';

export function Nav() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); 
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchToggle = () => {
    setSearchOpen((prev) => !prev);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="MedieSuset Logo" className={styles.logo} />
        <span className={styles.date}>4 - 7. juli 2022</span>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : '')}>
            FORSIDE
          </NavLink>
        </li>
        <li
          className={styles.dropdown}
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <span>EVENTS</span>
          {dropdownOpen && (
            <ul className={styles.dropdownMenu}>
              <li>
                <NavLink to="/events/lineup" className={({ isActive }) => (isActive ? styles.active : '')}>
                  LINE-UP
                </NavLink>
              </li>
              <li>
                <NavLink to="/events/program" className={({ isActive }) => (isActive ? styles.active : '')}>
                  PROGRAM
                </NavLink>
              </li>
            </ul>
          )}
        </li>
        <li>
          <NavLink to="/camps" className={({ isActive }) => (isActive ? styles.active : '')}>
            CAMPS
          </NavLink>
        </li>
        <li>
          <NavLink to="/billetter" className={({ isActive }) => (isActive ? styles.active : '')}>
            BILLETTER
          </NavLink>
        </li>
        <li>
          <NavLink to="/praktisk-info" className={({ isActive }) => (isActive ? styles.active : '')}>
            PRAKTISK INFO
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : '')}>
            LOGIN
          </NavLink>
        </li>
      </ul>
      <div className={styles.searchIcon}>
        <FaSearch onClick={handleSearchToggle} />
        {searchOpen && (
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Søg..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        )}
      </div>
    </nav>
  );
}
