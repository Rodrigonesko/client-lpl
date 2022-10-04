import React, { useEffect, useState, useContext } from "react";
import Axios from 'axios'
import Sidebar from "../../../components/Sidebar/Sidebar";
import moment from "moment";
import AuthContext from "../../../context/AuthContext";
import * as XLSX from "xlsx";
import './AndamentoAj.css'

const AndamentoAj = () => {

    const [liminares, setLiminares] = useState([])
    const [analistas, setAnalistas] = useState([])


    const { name } = useContext(AuthContext)

    let aux = 0

    const report = async () => {
        try {

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/projetoAj/show`, { withCredentials: true })

            let LimForExcel = Object.values(result.data.liminares).map(e => {
                return (
                    {
                        Analista: e.analista,
                        Id: e.idLiminar,
                        MO: e.mo,
                        Beneficiario: e.beneficiario,
                        'Data Abertura': moment(e.createdAt).format('DD/MM/YYYY'),
                        'Data Conclusão': moment(e.dataConclusao).format('DD/MM/YYYY'),
                        Situacao: e.situacao

                    }
                )

            })

            const ws = XLSX.utils.json_to_sheet(Object.values(LimForExcel))
            const wb = { Sheets: { data: ws }, SheetNames: ["data"] }
            XLSX.writeFile(wb, 'reportRn.xlsx')

        } catch (error) {
            console.log(error);
        }
    }

    const serchLiminares = async () => {

        try {

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/projetoAj/show`, { withCredentials: true })

            setLiminares(result.data.liminares)

            

        } catch (error) {
            console.log(error);
        }

    }

    const searchAnalistas = async () => {
        try {

            setAnalistas([])

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/users`, { withCredentials: true })

            Object.values(result.data).forEach(e => {
                if (e.liminares == 'true') {

                    setAnalistas(analistas => [...analistas, e.name])

                    console.log(e.name);

                }
            })

            console.log(analistas);

        } catch (error) {
            console.log(error);
        }
    }

    const verifyDate = (data) => {

        let date = new Date()

        data = moment(data).format('YYYY-MM-DD')

        date = moment(date).format('YYYY-MM-DD')

        if (data <= date) {
            return false
        } else {
            return true
        }

    }

    const concluir = async value => {
        try {
            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/projetoAj/concluir`, { analista: name, id: value }, { withCredentials: true })

            serchLiminares()

        } catch (error) {
            console.log(error);
        }
    }

    const selectAnalist = async analista => {
        const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/projetoAj/show`, { withCredentials: true })

        setLiminares([])

        if (analista.target.value === 'Todos') {
            serchLiminares()
        }

        Object.values(result.data.liminares).forEach(e => {
            if (e.analista === analista.target.value) {
                setLiminares(liminares => [...liminares, e])
            }
        })

    }

    const changeAnalist = async e => {

        const analista = e.target.value

        const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/projetoAj/change`, { analista }, { withCredentials: true })

        console.log(result);

    }


    useEffect(() => {
        serchLiminares()
        searchAnalistas()

    }, [])

    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-andamento-container">
                <div className="andamento-container">
                    <div className="title">
                        <h2>Liminares em Andamento: <span id="qtd"></span></h2>
                    </div>
                    <div className="filters">
                        <label htmlFor="analistas">Analistas: </label>
                        <select name="analistas" id="analistas" onChange={selectAnalist}>
                            <option value="Todos">Todos</option>
                            <option value="A definir">A definir</option>
                            {
                                analistas.map(e => {
                                    return (
                                        <option key={e} value={e}>{e}</option>
                                    )
                                })
                            }
                        </select>
                        <button className="report" onClick={report}>Report</button>
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

                                {
                                
                                Object.values(liminares).map(e => {

                                    if (e.situacao == 'andamento') {
                                        let status = verifyDate(e.dataVigencia)

                                        aux++

                                        return (
                                            <tr key={e._id}>
                                                <td>
                                                    <select name="analista" id="analista" onChange={changeAnalist}>
                                                        <option value={e.analista}>{e.analista}</option>
                                                        {
                                                            analistas.map(analista => {
                                                                return (
                                                                    <option key={analista} value={[analista, e._id]}>{analista}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </td>
                                                <td>{e.idLiminar}</td>
                                                <td>{e.mo}</td>
                                                <td>{e.beneficiario}</td>
                                                <td>{moment(e.createdAt).format('DD/MM/YYYY')}</td>
                                                <td>{moment(e.dataVigencia).format('DD/MM/YYYY HH:mm:ss')}</td>
                                                <td>
                                                    {status ? (
                                                        <button className="verde"></button>
                                                    ) : (
                                                        <button className="vermelho"></button>
                                                    )}
                                                </td>
                                                <td><button onClick={() => concluir(e._id)} className='concluir'>Concluir</button></td>

                                            </tr>
                                        )
                                    }

                                })}

                            </tbody>
                        </table>
                    </div>
                    {/* {
                        document.getElementById('qtd').innerHTML = aux
                    } */}
                </div>
            </section>
        </>
    )
}

export default AndamentoAj