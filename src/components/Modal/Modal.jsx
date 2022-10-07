import React, { useState } from "react";
import Modal from 'react-modal'

const MyModal = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false)

    const openModal = () => {
        setModalIsOpen(true)
    }

    const closeModal = () => {
        setModalIsOpen(false)
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Agenda"
            overlayClassName='modal-overlay'
            className='modal-content'>
            <h2>Agenda</h2>
            <button onClick={closeModal}>Fechar</button>
        </Modal>
    )
}

export default MyModal