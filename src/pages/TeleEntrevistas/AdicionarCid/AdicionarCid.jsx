import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Modal from 'react-modal'
import { adicionaCid } from "../../../_services/teleEntrevista.service";

Modal.setAppElement('#root')

const AdicionarCid = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false)

    const [cid, setCid] = useState('')
    const [descricaoCid, setDescricaoCid] = useState('')


    const openModal = () => {
        setModalIsOpen(true)
    }
    const closeModal = () => {
        setModalIsOpen(false)
    }

    const adicionarCid = async (e) => {
        try {

            e.preventDefault()

            await adicionaCid({ cid, descricao: descricaoCid })

            openModal()

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Sidebar>
                <section>
                    <div>
                        <div className="title">
                            <h3>Adicionar Cid</h3>
                        </div>
                        <form>
                            <div>
                                <label htmlFor="">Cid: </label>
                                <input type="text" name="" id="" onKeyUp={e => setCid(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="">Descrição Cid: </label>
                                <input type="text" onKeyUp={e => setDescricaoCid(e.target.value)} />
                            </div>
                            <div>
                                <button onClick={adicionarCid}>Adicionar</button>
                            </div>
                        </form>
                    </div>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Exemplo"
                        overlayClassName='modal-overlay'
                        className='modal-content'>
                        <div className="title">
                            <h2>Cid Adicionado com sucesso!</h2>
                        </div>
                        <button onClick={() => {
                            closeModal()
                            window.location.reload()
                        }}>Ok</button>
                    </Modal>
                </section>
            </Sidebar>
        </>
    )
}

export default AdicionarCid