import PropTypes from 'prop-types'; 
import styles from './Modal.module.scss'; 

export function Modal({ modalData, closeModal }) {
  // Если modalData не передан, модальное окно не отображается
  if (!modalData) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        {/* Кнопка закрытия модального окна */}
        <button className={styles.closeButton} onClick={closeModal}>
          &times; {/* Символ × */}
        </button>
        {/* Изображение, переданное в modalData */}
        <img src={modalData.image} alt={modalData.title} className={styles.modalImage} />
        {/* Заголовок модального окна */}
        <h3>{modalData.title}</h3>
        {/* Дата и время события */}
        <p>
          {modalData.day} kl. {modalData.time}
        </p>
        {/* Описание события */}
        <p>{modalData.description}</p>
      </div>
    </div>
  );
}

// Валидация пропсов с использованием PropTypes
Modal.propTypes = {
  modalData: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired, 
    day: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired, 
    description: PropTypes.string,
  }),
  closeModal: PropTypes.func.isRequired, // Обязательная функция для закрытия модального окна
};

// Значения по умолчанию для пропсов
Modal.defaultProps = {
  modalData: null, // Если данные не переданы, модальное окно не отображается
};
