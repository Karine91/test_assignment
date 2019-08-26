import React, { useRef } from 'react'
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const Modal = ({ open = false, onClose, children, title }) => {
    const modalRef = useRef(null);

    const closeModal = (e) => {
        if (!modalRef.current.contains(e.target)) {
            onClose();
        }
    }
    return open && (

        <div className={styles.ModalWrapper} onClick={closeModal}>
            <div className={styles.Modal} ref={modalRef}>
                <div className={styles.ModalHeader}>{title}</div>
                <div className={styles.ModalBody}>{children}</div>
                <div className={styles.ModalClose} onClick={onClose}>X</div>
            </div>
        </div>
    )
}

Modal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    title: PropTypes.string
}

export default Modal
