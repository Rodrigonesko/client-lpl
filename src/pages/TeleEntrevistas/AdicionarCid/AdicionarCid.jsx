import React, { useState } from "react";
import Axios from 'axios'
import Sidebar from "../../../components/Sidebar/Sidebar";
import Modal from 'react-modal'

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

            const result = await Axios.post(`${process.env.REACT_APP_API_KEY}/entrevistas/cid/adicionar`, {
                cid,
                descricao: descricaoCid
            }, { withCredentials: true })

            if (result.status === 200) {
                openModal()
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Sidebar></Sidebar>
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
        </>
    )
}

export default AdicionarCid