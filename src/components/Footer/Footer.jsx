import HancockLogo from '../../assets/images/Hancock logo.png';

import styles from './Footer.module.scss';

export function Footer() {
  return (
      <> 

    <footer className={styles.footer}>
      <img src={HancockLogo} alt="Hancock Kvalitet Logo" className={styles.logo} />
      <p className={styles.footerText}>- smag forskellen...</p>
    </footer>
      </>
  );
}


