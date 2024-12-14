import styles from './Modal.module.css';
import React from "react";


interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children, onClose } : ModalProps) => {
    return (
        <div className={styles.modalBackdrop} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                {children}
                <button className={styles.closeButton} onClick={onClose}> X </button>
            </div>
        </div>
    );
};

export default Modal;
