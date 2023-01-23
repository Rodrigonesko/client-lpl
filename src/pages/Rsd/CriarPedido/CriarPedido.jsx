import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from 'axios'
import Sidebar from "../../../components/Sidebar/Sidebar";
import './CriarPedido.css'

const CriarPedido = () => {

    const { protocolo } = useParams()
    const navigate = useNavigate()

    const [pedido, setPedido] = useState('')
    const [valorApresentado, setValorApresentado] = useState('')
    const [valorReembolsado, setValorReembolsado] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [clinica, setClinica] = useState('')
    const [nf, setNf] = useState('')
    const [mo, setMo] = useState('')
    const [fila, setFila] = useState('')

    const buscarClinica = async e => {
        try {

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/rsd/clinica/busca`, { cnpj: cnpj }, { withCredentials: true })

            console.log(result);

            setClinica(result.data.clinica.descricao)

        } catch (error) {
            console.log(error);
        }
    }

    const criarPedido = async e => {
        try {
            e.preventDefault()

            console.log(pedido, valorApresentado, valorReembolsado, cnpj, clinica, cnpj, mo);

            const result = await Axios.post(`${process.env.REACT_APP_API_KEY}/rsd/pedido/criar`, {
                pedido,
                protocolo,
                valorApresentado,
                valorReembolsado,
                cnpj,
                clinica,
                nf,
                mo,
                fila
            }, { withCredentials: true })

            if (result.status === 200) {
                navigate(`/rsd/FichaBeneficiario/${mo}`)
            }

        } catch (error) {
            console.log(error);
        }
    }

    const buscaMo = async () => {
        try {
            console.log(protocolo);
            const buscaMo = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/mo/${protocolo}`, { withCredentials: true })
            console.log(buscaMo);
            setMo(buscaMo.data.pedido.mo)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscaMo()
    }, [])

    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-editar-pedido-container">
                <div className="editar-pedido-container">
                    <div className="title">
                        Criar pedido
                    </div>
                    <form>
                        <div className="editar-pedido-input">
                            <label htmlFor="pedido">Número Pedido</label>
                            <input type="text" id="pedido" placeholder="Pedido" onKeyUp={e => setPedido(e.target.value)} />
                        </div>
                        <div className="editar-pedido-input">
                            <label htmlFor="valor-apresentado">Valor Apresentado</label>
                            <input type="text" id="valor-apresentado" placeholder="Valor Apresentado" onKeyUp={e => setValorApresentado(e.target.value)} />
                        </div>
                        <div className="editar-pedido-input">
                            <label htmlFor="valor-reembolsado">Valor Reembolsado</label>
                            <input type="text" id="valor-reembolsado" placeholder="Valor Reembolsado" onKeyUp={e => setValorReembolsado(e.target.value)} />
                        </div>
                        <div className="editar-pedido-input">
                            <label htmlFor="cnpj">CNPJ</label>
                            <input type="text" id="cnpj" placeholder="CNPJ" defaultValue={cnpj} onKeyUp={e => {
                                setCnpj(e.target.value)
                                buscarClinica()
                            }} />
                        </div>
                        <div className="editar-pedido-input">
                            <label htmlFor="clinica">Clinica</label>
                            <input type="text" id="clinica" placeholder="Clinica" defaultValue={clinica} onKeyUp={e => setClinica(e.target.value)} />
                        </div>
                        <div className="editar-pedido-input">
                            <label htmlFor="nf">NF</label>
                            <input type="text" id="nf" placeholder="NF" defaultValue={nf} onKeyUp={e => setNf(e.target.value)} />
                        </div>
                        <div className="editar-pedido-input">
                            <label htmlFor="fila">Fila: </label>
                            <select name="fila" id="fila" style={{ width: '300px' }} onChange={(e) => {
                                setFila(e.target.value)
                            }}>
                                <option value=""></option>
                                <option value="RSD">RSD</option>
                                <option value="Quarentena">Quarentena</option>
                            </select>
                        </div>
                        <div className="editar-pedido-input">
                            <button onClick={criarPedido} >Criar</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default CriarPedido