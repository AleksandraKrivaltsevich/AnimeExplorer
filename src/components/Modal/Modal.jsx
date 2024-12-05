import styles from './Modal.module.css';

const Modal = ({ children, onClose }) => {
    return (
        <div className={styles.modalBackdrop} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                {children}
                <button className={styles.closeButton} onClick={onClose}> X </button> {/* Кнопка закрытия с текстом X */}
            </div>
        </div>
    );
};

export default Modal;
