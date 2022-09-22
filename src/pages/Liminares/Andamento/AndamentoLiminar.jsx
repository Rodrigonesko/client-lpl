import React, { useEffect, useState } from "react";
import Axios from 'axios'
import Sidebar from "../../../components/Sidebar/Sidebar";
import moment from "moment";
import './AndamentoLiminar.css'

const AndamentoLiminar = () => {

    const [liminares, setLiminares] = useState([])

    const serchLiminares = async () => {

        try {
            
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/liminares/show`, {withCredentials: true})

            setLiminares(result.data.liminares)

            console.log(result);

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(()=>{
        serchLiminares()
    }, [])

    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-andamento-container">
                <div className="andamento-container">
                    <div className="title">
                        <h2>Liminares em Andamento</h2>
                    </div>
                    <div className="filters">
                        filtros...
                    </div>
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr className="table-header">
                                    <th>ANALISTA</th>
                                    <th>ID</th>
                                    <th>MO</th>
                                    <th>BENEFICIÁRIO</th>
                                    <th>DATA ABERTURA</th>
                                    <th>DATA VENCIMENTO</th>
                                    <th>STATUS</th>
                                    <th>CONCLUIR</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.values(liminares).map(e => {
                                    
                                    if (e.situacao == 'andamento') {
                                        
                                        return (
                                            <tr key={e.proposta}>
                                                <td>
                                                    <select name="analista" id="analista">
                                                        <option value={e.analista}>{e.analista}</option>
                                                    </select>
                                                </td>
                                                <td>{e.idLiminar}</td>
                                                <td>{e.mo}</td>
                                                <td>{e.beneficiario}</td>
                                                <td>{moment(e.createdAt).format('DD/MM/YYYY')}</td>
                                                <td>{moment(e.dataVigencia).format('DD/MM/YYYY hh:mm:ss')}</td>
                                                <td>*</td>
                                                <td><button>Concluir</button></td>

                                            </tr>
                                        )
                                    }

                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AndamentoLiminar