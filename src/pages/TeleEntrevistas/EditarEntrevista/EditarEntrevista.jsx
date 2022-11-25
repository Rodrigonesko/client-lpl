import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/Sidebar/Sidebar'
import Axios from 'axios'
import { useParams } from 'react-router-dom'
import moment from 'moment/moment'
import Modal from 'react-modal'
import './EditarEntrevista.css'

Modal.setAppElement('#root')

const EditarEntrevista = () => {

    let respostas = {

    }

    const { id } = useParams()

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [perguntas, setPerguntas] = useState([])
    const [dadosEntrevista, setDadosEntrevista] = useState({})

    const openModal = () => {
        setModalIsOpen(true)
    }
    const closeModal = () => {
        setModalIsOpen(false)
    }

    const buscarPerguntas = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/perguntas`, { withCredentials: true })

            setPerguntas(result.data.perguntas)

        } catch (error) {
            console.log(error);
        }
    }

    const buscarDadosEntrevista = async () => {
        try {

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/buscar/dadosEntrevista/${id}`, { withCredentials: true })

            setDadosEntrevista(result.data.proposta)

            console.log(result);

        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = async (item) => {
        try {
            respostas[`${item.id}`] = item.value
        } catch (error) {
            console.log(error);
        }
    }

    const salvar = async (item) => {
        try {

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/editar/dadosEntrevista`, { dados: respostas, id }, { withCredentials: true })

            if(result.status === 200){
                openModal()
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscarPerguntas()
        buscarDadosEntrevista()
    }, [])

    return (
        <>
            <Sidebar></Sidebar>
            <section className='section-editar-proposta-container'>
                <div className='editar-proposta-container'>
                    <div className="title">
                        <h3>Editar Dados Entrevista</h3>
                    </div>
                    <div className="dados-entrevista-editar">
                        <table border='1'>
                            <tr>
                                <td>Data Entrevista</td>
                                <td>{moment(dadosEntrevista.createdAt).format('DD/MM/YYYY')}</td>
                            </tr>
                            <tr>
                                <td>Nome</td>
                                <td>{dadosEntrevista.nome}</td>
                            </tr>
                            <tr>
                                <td>CPF</td>
                                <td>{dadosEntrevista.cpf}</td>
                            </tr>
                            <tr>
                                <td>Proposta</td>
                                <td>{dadosEntrevista.proposta}</td>
                            </tr>
                            <tr>
                                <td>Data Nascimento</td>
                                <td>{moment(dadosEntrevista.dataNascimento).format('DD/MM/YYYY')}</td>
                            </tr>
                        </table>
                    </div>
                    <div className="perguntas-container">
                        {
                            perguntas.map(e => {
                                if (e.formulario == dadosEntrevista.tipoFormulario) {
                                    return (
                                        <div className='title'>
                                            <label htmlFor={e.name}>{e.pergunta}</label>
                                            <textarea type="text" name="" id={e.name} defaultValue={dadosEntrevista[e.name]} onKeyUp={(e) => { handleChange(e.target) }} className='input-pergunta' />
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                    <div>
                        <button onClick={salvar}>Salvar</button>
                    </div>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Exemplo"
                    overlayClassName='modal-overlay'
                    className='modal-content'>
                    <div className="title">
                        <h2>Dados atualizados com sucesso!</h2>
                    </div>
                    <button onClick={() => {
                        closeModal()
                    }}>Ok</button>
                </Modal>
            </section>
        </>
    )
}

export default EditarEntrevista