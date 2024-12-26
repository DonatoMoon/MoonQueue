import { createPortal } from 'react-dom';

const ModalPortal = ({ children }) => {
    return createPortal(
        children,
        document.body // додаємо модальне вікно безпосередньо до body
    );
};

export default ModalPortal;
