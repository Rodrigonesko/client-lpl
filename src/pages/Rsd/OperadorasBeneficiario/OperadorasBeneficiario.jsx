import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios'
import Sidebar from "../../../components/Sidebar/Sidebar";
import './OperadorasBeneficiario.css'

const OperadorasBeneficiario = () => {

    const [operadoras, setOperadoras] = useState([])

    const buscarOperadoras = async () => {
        try {

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/operadoras`, { withCredentials: true })

            console.log(result);

            setOperadoras(result.data.operadoras)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscarOperadoras()
    }, [])

    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-operador-container">
                <div className="operador-container">
                    <div className="title">
                        <h3>Operadora Beneficário</h3>
                    </div>
                    <div className="div-criar-operadora">
                        <Link id="criar-operadora" to='/rsd/OperadoraBeneficiario/Criar'>Criar Operadora Beneficiário</Link>
                    </div>
                    <div className="operadores-table">
                        <table className="table">
                            <thead className="table-header">
                                <tr>
                                    <th>Descrição</th>
                                    <th>SLA</th>
                                    <th>Ativo</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    operadoras.map(e => {
                                        return (
                                            <tr key={e._id}>
                                                <td>{e.descricao}</td>
                                                <td>{e.sla}</td>
                                                <td>{e.ativo}</td>
                                                <td><a href="" >Ativar/Desativar</a ></td>
                                                <td><Link className="link-editar-operadora" to={`/rsd/OperadoraBeneficiario/editar/${e._id}`} >Editar</Link ></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    )
}

export default OperadorasBeneficiario