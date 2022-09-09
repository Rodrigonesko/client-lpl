import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import Sidebar from "../../../components/Sidebar/Sidebar";
import Axios from 'axios'
import './Detalhes.css'

const Detalhes = () => {

    const { proposta } = useParams()

    const [dados, setDados] = useState({})
    const [email, setEmail] = useState('')
    const [contato1, setContato1] = useState('')
    const [contato2, setContato2] = useState('')
    const [contato3, setContato3] = useState('')
    const [horario1, setHorario1] = useState('')
    const [horario2, setHorario2] = useState('')
    const [horario3, setHorario3] = useState('')



    const search = async () => {
        const resultado = await Axios.get(`http://10.0.121.55:3001/rn/rns/${proposta}`, { withCredentials: true })
        const data = resultado.data

        setDados(data)

        setEmail(dados.email)

        console.log(dados);
    }

    useEffect(() => {

        search()

    }, [])

    return (
        <>
            <Sidebar />
            <section className="section-detalhes-container">
                <div className="detalhes-container">

                    <h3>{proposta}</h3>

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
                            <span><strong>{proposta}</strong></span>
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
                    </div>
                    <div className="info-proposta">
                        <div className="info-box periodo-doenca">
                            <label htmlFor="">Período da Doença: </label>
                            <span ><strong>{dados.periodo}</strong></span>
                        </div>
                    </div>
                    <div className="info-proposta">

                        <div className="info-box">
                            <label htmlFor="">Data da Vigencia: </label>
                            <span><strong></strong></span>
                        </div>
                        <div className="info-box">
                            <label htmlFor="">PRC: </label>
                            <span><strong>{dados.prc}</strong></span>
                        </div>
                    </div>
                    <div className="info-proposta">
                        <div className="info-box">
                            <label htmlFor="">Telefones Beneficiário: </label>
                            <span><strong>{dados.telefones}</strong></span>
                        </div>
                        <div className="info-box">
                            <label htmlFor="email">Email Beneficiário: </label>
                            <input type="email" id="email" name="email" defaultValue={dados.email} onChange={e=>setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div className="info-proposta">
                        <div className="info-box">
                            <label htmlFor="data-contato-1">1° Contato</label>
                            <input type="date" name="data-contato-1" id="data-contato-1" value={dados.contato1} />
                            <input type="time" name="horario-contato-1" id="horario-contato-1" />
                        </div>
                        <div className="info-box">
                            <label htmlFor="data-contato-2">2° Contato</label>
                            <input type="date" name="data-contato-2" id="data-contato-2" value={dados.contato2} />
                            <input type="time" name="horario-contato-2" id="horario-contato-2" />
                        </div>
                        <div className="info-box">
                            <label htmlFor="data-contato-3">3° Contato</label>
                            <input type="date" name="data-contato-3" id="data-contato-3" value={dados.contato3} />
                            <input type="time" name="horario-contato-3" id="horario-contato-3" />
                        </div>
                    </div>
                    <div className="info-proposta observacoes">
                        <div className="info-box observacoes">
                            <label htmlFor="observacoes">Observações</label>
                            <textarea name="observacoes" id="observacoes" cols="30" rows="10" value={dados.observacoes}></textarea>
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="salvar">Salvar</button>
                        <button className="concluir">Concluir</button>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Detalhes