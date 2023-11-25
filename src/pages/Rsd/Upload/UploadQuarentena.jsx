import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Modal from 'react-modal'
import { subirPedidos, uploadAltaFrequencia } from "../../../_services/rsd.service";

Modal.setAppElement('#root')

const UploadQuarentena = () => {

    const [file, setFile] = useState()
    const [status, setStatus] = useState('')
    const [pedidos, setPedidos] = useState([])
    const [modal, setModal] = useState(false)

    const send = async e => {
        e.preventDefault()

        try {

            let formData = new FormData()

            formData.append('file', file, file.name)

            setStatus('Enviando...')

            //const result = await Axios.post(`${process.env.REACT_APP_API_KEY}/rsd/uploadQuarentena`, formData, { headers: { "Content-Type": `multipart/form-data; boundary=${formData._boundary}` }, withCredentials: true })

            const result = await uploadAltaFrequencia(formData)

            console.log(result.pedidos);

            setStatus(`Novos pedidos: ${result.pedidos.length}`)

            setPedidos(result.pedidos)

        } catch (error) {
            console.log(error);
            setStatus('Algo deu errado')
        }

    }

    const subir = async () => {
        try {
            //const result = await Axios.post(`${process.env.REACT_APP_API_KEY}/rsd/subir`, { pedidos }, { withCredentials: true })

            const result = await subirPedidos({
                pedidos
            })

            setStatus(`Foram adicionados ${result.pedidos.length} pedidos`)
            setModal(true)

        } catch (error) {
            console.log(error);
            setStatus('Algo deu errado')
        }
    }

    return (
        <>
            <Sidebar>
                <section className="section-upload-container">
                    {status !== '' ? (
                        <div className="result">
                            <p>{status}</p>
                            {
                                status !== 'Enviando...' ? (
                                    <button onClick={subir}>Subir</button>
                                ) : null
                            }
                        </div>
                    ) : null}
                    <div className="upload-container">
                        <form action="" method="post" encType="multipart/form-data">
                            <div className="title">
                                <h2>Upload da Fila Quarentena</h2>
                            </div>
                            <div>
                                <label htmlFor="file-rn">Arquivo: </label>
                                <input type="file" name="file-rn" id="file-rn" onChange={e => setFile(e.target.files[0])} />
                            </div>
                            <div className="container-btns">
                                <button className="btn" onClick={send}>Enviar</button>
                            </div>
                        </form>
                    </div>
                    <div className="pedidos-tabela">
                        <table className="table-novos-pedidos">
                            <thead>
                                <tr>
                                    <th>Pedido</th>
                                    <th>Nome</th>
                                    <th>Protocolo</th>
                                    <th>Valor apresentado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    pedidos.map(e => {
                                        return (
                                            <tr>
                                                <td>{e[0]}</td>
                                                <td>{e[8]}</td>
                                                <td>{e[11]}'</td>
                                                <td>{e[9]}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <Modal
                        isOpen={modal}
                        onRequestClose={() => { setModal(false) }}
                        contentLabel="Exemplo"
                        overlayClassName='modal-overlay'
                        className='modal-content'>
                        <div className="title">
                            <h2>{status}</h2>
                        </div>
                        <div className="btns-modal">
                            <button onClick={() => {
                                setModal(false)
                                window.location.reload()
                            }}>Fechar</button>
                        </div>
                    </Modal>
                </section>
            </Sidebar>
        </>

    )
}

export default UploadQuarentena