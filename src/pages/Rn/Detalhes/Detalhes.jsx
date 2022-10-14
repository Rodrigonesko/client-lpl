import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import Sidebar from "../../../components/Sidebar/Sidebar";
import Axios from 'axios'
import Modal from 'react-modal'
import './Detalhes.css'


Modal.setAppElement('#root')

const Detalhes = () => {

    const { id } = useParams()

    const [modalIsOpen, setModalIsOpen] = useState(false)

    const [dados, setDados] = useState({})
    const [email, setEmail] = useState('')
    const [data1, setData1] = useState('')
    const [data2, setData2] = useState('')
    const [data3, setData3] = useState('')
    const [horario1, setHorario1] = useState('')
    const [horario2, setHorario2] = useState('')
    const [horario3, setHorario3] = useState('')
    const [observacoes, setObservacoes] = useState('')
    const [success, setSuccess] = useState(false)
    const [concluido, setConcluido] = useState(false)

    const openModal = ()=>{
        setModalIsOpen(true)
    }

    const closeModal = ()=>{
        setModalIsOpen(false)
    }


    const search = async () => { 

        const resultado = await Axios.get(`${process.env.REACT_APP_API_KEY}/rn/rns/${id}`, { withCredentials: true })
        const data = resultado.data

        setDados(data)

        setEmail(dados.email)
        setData1(data.dataContato1)
        setData2(data.dataContato2)
        setData3(data.dataContato3)
        setHorario1(data.horarioContato1)
        setHorario2(data.horarioContato2)
        setHorario3(data.horarioContato3)
        setObservacoes(data.observacoes)

        if (data.status === 'Concluido') {
            setConcluido(true)
        }



    }

    const update = async () => {

        console.log(id);

        try {
            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/rn/rns/update`, {
                id: id,
                email: email,
                dataContato1: data1,
                dataContato2: data2,
                dataContato3: data3,
                horarioContato1: horario1,
                horarioContato2: horario2,
                horarioContato3: horario3,
                observacoes: observacoes
            }, {
                withCredentials: true
            })

            if (result.status === 200) {
                setSuccess(true)
            }

        } catch (error) {
            console.log(error);
        }

    }

    const concluir = async () => {

        try {
            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/rn/rns/concluir`, {
                id: id,
                email: email,
                dataContato1: data1,
                dataContato2: data2,
                dataContato3: data3,
                horarioContato1: horario1,
                horarioContato2: horario2,
                horarioContato3: horario3,
                observacoes: observacoes
            }, {
                withCredentials: true
            })

            if (result.status === 200) {
                setConcluido(true)
                closeModal()
            }

        } catch (error) {
            console.log(error);
            closeModal()
        }

    }

    useEffect(() => {

        search() 



    }, [])

    return (
        <>
            <Sidebar />
            <section className="section-detalhes-container">
                {
                    success && (
                        <div className="success">
                            Atualizado com sucesso
                        </div>
                    )

                }
                {
                    concluido && (
                        <div className="success">
                            Concluido
                        </div>
                    )

                }


                <div className="detalhes-container">

                    <h3>{dados.pedido}</h3>

                    <div className="info-proposta">
                        <div className="info-box">
                            <label htmlFor="beneficiario">Beneficiario: </label>
                            <span><strong>{dados.beneficiario}</strong></span>
                        </div>
                        <div className="info-box">
                            <label htmlFor="mo">MO: </label>
                            <span><strong>{dados.mo}</strong></span>
                        </div>
                        <div className="info-box">
                            <label htmlFor="proposta">Proposta: </label>
                            <span><strong>{dados.proposta}</strong></span>
                        </div>
                    </div>
                    <div className="info-proposta">
                        <div className="info-box">
                            <label htmlFor="">Vigencia: </label>
                            <span><strong>{dados.vigencia}</strong></span>
                        </div>
                        <div className="info-box">
                            <label htmlFor="">Pedido: </label>
                            <span><strong>{dados.pedido}</strong></span>
                        </div>
                        <div className="info-box">
                            <label htmlFor="proposta">Tipo: </label>
                            <span><strong>{dados.tipo}</strong></span>
                        </div>
                    </div>
                    <div className="info-proposta">
                        <div className="info-box">
                            <label htmlFor="">Filal: </label>
                            <span><strong>{dados.filial}</strong></span>
                        </div>
                        <div className="info-box">
                            <label htmlFor="">Idade: </label>
                            <span><strong>{dados.idade}</strong></span>
                        </div>
                        <div className="info-box">
                            <label htmlFor="proposta">Data Recebimento: </label>
                            <span><strong>{dados.dataRecebimento}</strong></span>
                        </div>
                    </div>
                    <div className="info-proposta">
                        <div className="info-box procedimento">
                            <label htmlFor="">Procedimento:</label>
                            <span><strong>{dados.procedimento}</strong></span>
                        </div>
                    </div>
                    <div className="info-proposta">
                        <div className="info-box">
                            <label htmlFor="">Doença: </label>
                            <span><strong>{dados.doenca}</strong></span>
                        </div>
                        <div className="info-box">
                            <label htmlFor="">Cid: </label>
                            <span><strong>{dados.cid}</strong></span>
                        </div>
                        <div className="info-box">
                            <label htmlFor="">PRC: </label>
                            <span><strong>{dados.prc}</strong></span>
                        </div>
                    </div>
                    <div className="info-proposta">
                        <div className="info-box periodo-doenca">
                            <label htmlFor="">Período da Doença: </label>
                            <span ><strong>{dados.periodo}</strong></span>
                        </div>
                    </div>
                    <div className="info-proposta">
                        <div className="info-box">
                            <label htmlFor="">Telefones Beneficiário: </label>
                            <span><strong>{dados.telefones}</strong></span>
                        </div>
                        <div className="info-box">
                            <label htmlFor="email">Email Beneficiário: </label>
                            <input type="email" id="email" name="email" defaultValue={dados.email} onChange={e => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div className="info-proposta">
                        <div className="info-box">
                            <label htmlFor="data-contato-1">1° Contato</label>
                            <input type="date" name="data-contato-1" id="data-contato-1" defaultValue={dados.dataContato1} onChange={e => setData1(e.target.value)} />
                            <input type="time" name="horario-contato-1" id="horario-contato-1" defaultValue={dados.horarioContato1} onChange={e => setHorario1(e.target.value)} />
                        </div>
                        <div className="info-box">
                            <label htmlFor="data-contato-2">2° Contato</label>
                            <input type="date" name="data-contato-2" id="data-contato-2" defaultValue={dados.dataContato2} onChange={e => setData2(e.target.value)} />
                            <input type="time" name="horario-contato-2" id="horario-contato-2" defaultValue={dados.horarioContato2} onChange={e => setHorario2(e.target.value)} />
                        </div>
                        <div className="info-box">
                            <label htmlFor="data-contato-3">3° Contato</label>
                            <input type="date" name="data-contato-3" id="data-contato-3" defaultValue={dados.dataContato3} onChange={e => setData3(e.target.value)} />
                            <input type="time" name="horario-contato-3" id="horario-contato-3" defaultValue={dados.horarioContato3} onChange={e => setHorario3(e.target.value)} />
                        </div>
                    </div>
                    <div className="info-proposta observacoes">
                        <div className="info-box observacoes">
                            <label htmlFor="observacoes">Observações</label>
                            <textarea name="observacoes" id="observacoes" cols="30" rows="10" defaultValue={dados.observacoes} onChange={e => setObservacoes(e.target.value)} ></textarea>
                        </div>
                    </div>
                    <div className="buttons">
                        <button onClick={update} className="salvar">Salvar</button>
                        {
                            !concluido &&(
                                <button onClick={openModal} className="concluir">Concluir</button>
                            )
                        }

                    </div>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Exemplo"
                        overlayClassName='modal-overlay'
                        className='modal-content'
                    >
                        <h2>Anexou no SisAmil?</h2>
                        <button onClick={closeModal}>Fechar</button>
                        <button className="concluir" onClick={concluir} >Concluir</button>
                    </Modal>
                </div>
            </section>
        </>
    )
}

export default Detalhes