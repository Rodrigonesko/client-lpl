import React, { useState, useEffect } from "react";
import Axios from 'axios'
import Sidebar from "../../../components/Sidebar/Sidebar";
import './ProducaoDiariaTele.css'
import moment from "moment";

const ProducaoDiariaTele = () => {

    const [producao, setProducao] = useState([])
    const [total, setTotal] = useState(0)
    const [data, setData] = useState('')
    const [totalRn, setTotalRn] = useState(0)

    const buscarDados = async () => {
        try {

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/producao/diaria/${moment(new Date).format('YYYY-MM-DD')}`, { withCredentials: true })

            setProducao(result.data.producao)
            setTotal(result.data.total)

        } catch (error) {
            console.log(error);
        }
    }

    const buscarDadosData = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/producao/diaria/${data}`, { withCredentials: true })

            setProducao(result.data.producao)
            setTotal(result.data.total)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscarDados()
    }, [])

    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-producao-diaria-container">
                <div className="producao-diaria-container">
                    <div className="title">
                        <h3>Produção Diaria</h3>
                    </div>
                    <div className="producao-diaria">
                        <div className="busca-data-producao">
                            <label htmlFor="data">data</label>
                            <input type="date" name="data" id="data" onChange={e=>{setData(e.target.value)}} />
                            <button onClick={buscarDadosData} >Buscar</button>
                        </div>
                        <table>
                            <thead >
                                <tr>
                                    <th>Analista</th>
                                    <th>Tele Entrevistas</th>
                                    <th>Rn</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    producao.map(item => {
                                        return (
                                            <tr>
                                                <td>{item.analista}</td>
                                                <td>{item.quantidade}</td>
                                                <td>{item.quantidadeRn}</td>
                                            </tr>
                                        )
                                    })
                                }
                                <tr>
                                    <th>Total</th>
                                    <th>{total}</th>
                                    <th>{totalRn}</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProducaoDiariaTele