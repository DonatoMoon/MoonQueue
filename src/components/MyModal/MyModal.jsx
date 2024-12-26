// src/components/MyModal/MyModal.jsx
import styles from "./MyModal.module.css"; // Стилі для модального вікна

const MyModal = ({ visible, setVisible, children }) => {
    if (!visible) return null;

    return (
        <div className={`${styles.myModal} ${visible ? styles.active : ''}`} onClick={() => setVisible(false)}>
            <div className={styles.myModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;
