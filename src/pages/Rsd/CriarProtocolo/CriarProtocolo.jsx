import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Axios from 'axios'
import { useParams, useNavigate } from "react-router-dom";
import './CriarProtocolo.css'

const CriarProtocolo = () => {
    const { mo } = useParams()

    const [protocolo, setProtocolo] = useState('')
    const [dataSolicitacao, setDataSolicitacao] = useState('')
    const [dataPagamento, setDataPagamento] = useState('')
    const [operadora, setOperadora] = useState('')

    const navigate = useNavigate()

    const criarProtocolo = async e => {
        e.preventDefault()

        console.log(protocolo, dataSolicitacao, dataPagamento);

        const result = await Axios.post(`${process.env.REACT_APP_API_KEY}/rsd/protocolo/criar`, {
            protocolo,
            dataSolicitacao,
            dataPagamento,
            mo
        }, {
            withCredentials: true
        })

        if (result.status == 200) {
            navigate(`/rsd/FichaBeneficiario/${mo}`)
        }
        console.log(result);

    }

    useEffect(() => {

    }, [])

    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-criar-protocolo-container">
                <div className="criar-protocolo-container">
                    <div className="title">
                        Novo Protocolo
                    </div>
                    <form className="criar-protocolo">
                        <div className="input-criar-protocolo">
                            <label htmlFor="protocolo">Protocolo</label>
                            <input type="text" name="protocolo" id="protocolo" placeholder="Protocolo" onKeyUp={e => setProtocolo(e.target.value)} />
                        </div>
                        <div className="input-criar-protocolo">
                            <label htmlFor="mo">Marca Ótica</label>
                            <input type="text" name="mo" id="mo" placeholder="Marca Ótica" defaultValue={mo} />
                        </div>
                        <div className="input-criar-protocolo">
                            <label htmlFor="data-solicitacao">Data Solicitação</label>
                            <input type="date" name="data-solicitacao" id="data-solicitacao" placeholder="Data Solicitação" onChange={e => setDataSolicitacao(e.target.value)} />
                        </div>
                        <div className="input-criar-protocolo">
                            <label htmlFor="data-pagamento">Data Pagamento</label>
                            <input type="date" name="data-pagamento" id="data-pagamento" placeholder="Data Pagamento" onChange={e => setDataPagamento(e.target.value)} />
                        </div>
                        <div className="input-criar-protocolo">
                            <label htmlFor="operadora">Operadora Beneficiário</label>
                            <select name="operadora" id="operadora">
                                <option value=""></option>
                            </select>
                        </div>
                        <div className="criar-protocolo-btn">
                            <button onClick={criarProtocolo}>Criar</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default CriarProtocolo