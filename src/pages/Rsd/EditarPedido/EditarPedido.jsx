import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from 'axios'
import Sidebar from "../../../components/Sidebar/Sidebar";
import './EditarPedido.css'

const EditarPedido = () => {

    const { pedido } = useParams()
    const navigate = useNavigate()

    const [valorApresentado, setValorApresentado] = useState('')
    const [valorReembolsado, setValorReembolsado] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [clinica, setClinica] = useState('')
    const [nf, setNf] = useState('')
    const [mo, setMo] = useState('')
    const [pedidoEditado, setPedidoEditado] = useState('')

    const buscarPedido = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/pedido/${pedido}`, { withCredentials: true })

            console.log(result);

            setValorApresentado(result.data.result.valorApresentado)
            setValorReembolsado(result.data.result.valorReembolsado)
            setCnpj(result.data.result.cnpj)
            setClinica(result.data.result.clinica)
            setNf(result.data.result.nf)
            setPedidoEditado(result.data.result.numero)
            setMo(result.data.result.mo)

        } catch (error) {
            console.log(error);
        }
    }

    const buscarClinica = async e => {
        try {

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/rsd/clinica/busca`, { cnpj: cnpj }, { withCredentials: true })

            console.log(result);

            setClinica(result.data.clinica.descricao)

        } catch (error) {
            console.log(error);
        }
    }

    const salvarPedido = async e => {
        try {

            e.preventDefault()

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/rsd/pedido/editar`, {
                pedido,
                valorApresentado,
                valorReembolsado,
                cnpj,
                clinica,
                nf,
                pedidoEditado
            }, { withCredentials: true })

            if (result.status === 200) {
                navigate(`/rsd/FichaBeneficiario/${mo}`)
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscarPedido()
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
                            <input type="text" id="pedido" placeholder="Pedido" defaultValue={pedidoEditado} onChange={e => {
                                setPedidoEditado(e.target.value)
                            }} />
                        </div>
                        <div className="editar-pedido-input">
                            <label htmlFor="valor-apresentado">Valor Apresentado</label>
                            <input type="text" id="valor-apresentado" placeholder="Valor Apresentado" defaultValue={valorApresentado} onChange={e => {
                                setValorApresentado(e.target.value)
                            }} />
                        </div>
                        <div className="editar-pedido-input">
                            <label htmlFor="valor-reembolsado">Valor Reembolsado</label>
                            <input type="text" id="valor-reembolsado" placeholder="Valor Reembolsado" defaultValue={valorReembolsado} onChange={e => {
                                setValorReembolsado(e.target.value)
                            }} />
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
                            <button onClick={salvarPedido}>Salvar</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default EditarPedido