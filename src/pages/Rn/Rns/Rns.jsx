import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from 'react-router-dom'
import Sidebar from "../../../components/Sidebar/Sidebar";
import './Rns.css'

const Rns = () => {

    const [rns, setRns] = useState([])

    const searchRn = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rn/rns`, { withCredentials: true })
            setRns(result.data)
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        searchRn()
    }, [])

    return (
        <>
            <Sidebar />
            <section className="section-rn-container">
                <div className="rn-container">
                    <div className="title">
                        <h2>Rns</h2>
                    </div>
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr className="table-header">
                                    <th>BENEFICIARIO</th>
                                    <th>MO</th>
                                    <th>IDADE</th>
                                    <th>TELEFONE</th>
                                    <th>DETALHES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rns.map(e => {

                                    if (e.status === 'Em andamento') {
                                        return (
                                            <tr key={e.proposta}>
                                                <td>{e.beneficiario}</td>
                                                <td>{e.mo}</td>
                                                <td>{e.idade}</td>
                                                <td>{e.telefones}</td>
                                                <td><Link to={'' + e._id} className="link">Detalhes</Link></td>
                                            </tr>
                                        )
                                    }

                                    return null

                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Rns