import PropTypes from 'prop-types';
import styles from './Modal.module.scss';

export function Modal({ modalData, closeModal }) {
  if (!modalData) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={closeModal}>
          &times;
        </button>
        <img src={modalData.image} alt={modalData.title} className={styles.modalImage} />
        <h3>{modalData.title}</h3>
        <p>{modalData.day} kl. {modalData.time}</p>
        <p>{modalData.description}</p>
      </div>
    </div>
  );
}

// Tilføj prop-types validering
Modal.propTypes = {
  modalData: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    day: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    description: PropTypes.string,
  }),
  closeModal: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  modalData: null, 
};
