import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from 'axios'
import Sidebar from "../../../components/Sidebar/Sidebar";
import './EditarPedido.css'

const EditarPedido = () => {

    const { pedido } = useParams()

    const [valorApresentado, setValorApresentado] = useState('')
    const [valorReembolsado, setValorReembolsado] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [clinica, setClinica] = useState('')
    const [profissional, setProfissional] = useState('')
    const [crm, setCrm] = useState('')


    console.log(pedido);

    const buscarPedido = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/pedido/${pedido}`, { withCredentials: true })

            console.log(result);

            setValorApresentado(result.data.result.valorApresentado)
            setValorReembolsado(result.data.result.valorReembolsado)


        } catch (error) {
            console.log(error);
        }
    }

    const buscarClinica = async () => {
        try {

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/clinica/${cnpj}`, { withCredentials: true })

            console.log(result);

        } catch (error) {
            console.log(error);
        }
    }

    const salvarPedido = () => {
        try {

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
                            <input type="text" id="pedido" placeholder="Pedido" disabled defaultValue={pedido} />
                        </div>
                        <div className="editar-pedido-input">
                            <label htmlFor="valor-apresentado">Valor Apresentado</label>
                            <input type="text" id="valor-apresentado" placeholder="Valor Apresentado" defaultValue={valorApresentado} />
                        </div>
                        <div className="editar-pedido-input">
                            <label htmlFor="valor-reembolsado">Valor Reembolsado</label>
                            <input type="text" id="valor-reembolsado" placeholder="Valor Reembolsado" defaultValue={valorReembolsado} />
                        </div>
                        <div className="editar-pedido-input">
                            <label htmlFor="cnpj">CNPJ</label>
                            <input type="text" id="cnpj" placeholder="CNPJ" onKeyUpCapture={e => { 
                                setCnpj(e.target.value)
                                buscarClinica()
                            }} />
                        </div>
                        <div className="editar-pedido-input">
                            <label htmlFor="clinica">Clinica</label>
                            <input type="text" id="clinica" placeholder="Clinica" />
                        </div>
                        <div className="editar-pedido-input">
                            <label htmlFor="profissional">Profissional</label>
                            <input type="text" id="profissional" placeholder="Profissional" />
                        </div>
                        <div className="editar-pedido-input">
                            <label htmlFor="crm">CRM</label>
                            <input type="text" id="crm" placeholder="CRM" />
                        </div>
                        <div className="editar-pedido-input">
                            <button>Salvar</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default EditarPedido