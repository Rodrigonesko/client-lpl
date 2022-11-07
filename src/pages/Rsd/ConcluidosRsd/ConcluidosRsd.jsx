import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios'
import Sidebar from "../../../components/Sidebar/Sidebar";
import './ConcluidosRsd.css'

const ConcluidosRsd = () => {

    const [concluidos, setConcluidos] = useState([])
    const [pesquisa, setPesquisa] = useState('')

    const pesquisar = async e => {
        try {

            e.preventDefault()

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/concluidos/${pesquisa}`, { withCredentials: true })

            console.log(result.data);

            setConcluidos(result.data.pedidos)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-concluidos-rsd-container">
                <div className="concluidos-rsd-container">
                    <div className="title">
                        <h3>Concluídos</h3>
                    </div>
                    <form action="" className="pesquisa-concluidos-rsd" onSubmit={pesquisar}>
                        <input type="text" placeholder="Marca Ótica, Protocolo, Pedido" onChange={e => setPesquisa(e.target.value)} />
                        <button>Pesquisar</button>
                    </form>
                    <div className="">
                        <table className="table">
                            <thead className="table-header">
                                <tr>
                                    <th>Marca Ótica</th>
                                    <th>Nome</th>
                                    <th>Pedido</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    concluidos.map(e => {
                                        return (
                                            <tr key={e._id}>
                                                <td><Link to={`/rsd/FichaBeneficiario/${e.mo}`}>{e.mo}</Link></td>
                                                <td>{e.pessoa}</td>
                                                <td>{e.numero}</td>
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

export default ConcluidosRsd