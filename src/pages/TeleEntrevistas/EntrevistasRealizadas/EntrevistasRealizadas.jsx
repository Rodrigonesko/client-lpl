import React, { useState, useEffect } from 'react'
import Sidebar from '../../../components/Sidebar/Sidebar'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import moment from 'moment'
import './EntrevistasRealizadas.css'
import gerarPdf from '../Pdf/Pdf'

const EntrevistasRealizadas = () => {

    const [entrevistas, setEntrevistas] = useState([])

    const buscarEntrevistas = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/dadosEntrevista`, { withCredentials: true })

            setEntrevistas(result.data.entrevistas)

        } catch (error) {
            console.log(error);
        }
    }

    const gerarRelatorio = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/dadosEntrevista`, { withCredentials: true })

            let xls = '\ufeff'
            xls += "<table border='1'>"
            xls += "<thead><tr>"
            xls += "<th>Id</th>"
            xls += "<th>Proposta</th>"
            xls += "<th>Tipo Contrato</th>"
            xls += "<th>Data Entrevista</th>"
            xls += "<th>Nome</th>"
            xls += "<th>Cpf</th>"
            xls += "<th>Data Nascimento</th>"
            xls += "<th>Idade</th>"
            xls += "<th>Feito Por</th>"
            xls += "<th>Divergencia</th>"
            xls += "<th>Qual</th>"
            xls += "<th>Cids</th>"
            xls += "</tr></thead><tbody>"


            result.data.entrevistas.forEach(e => {
                xls += "<tr>"
                xls += `<td>${e._id}</td>`
                xls += `<td>${e.proposta}</td>`
                xls += `<td>${e.tipoContrato}</td>`
                xls += `<td>${moment(e.dataEntrevista).format('DD/MM/YYYY')}</td>`
                xls += `<td>${e.nome}</td>`
                xls += `<td>${e.cpf}</td>`
                xls += `<td>${e.dataNascimento}</td>`
                xls += `<td>${e.idade}</td>`
                xls += `<td>${e.responsavel}</td>`
                xls += `<td>${e.houveDivergencia}</td>`
                if (e.divergencia) {
                    xls += `<td>${e.divergencia}</td>` 
                } else {
                    xls += `<td></td>`
                }
                if (e.cids) {
                    xls += `<td>${e.cids}</td>` 
                } else {
                    xls += `<td></td>`
                }
                xls += `</tr>`
            })

            xls += "</tbody></table>"

            var a = document.createElement('a');
            var data_type = 'data:application/vnd.ms-excel';
            a.href = data_type + ', ' + xls.replace(/ /g, '%20');
            a.download = 'Relatorio Propostas.xls'
            a.click()

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscarEntrevistas()
    }, [])

    return <>
        <Sidebar></Sidebar>
        <section className='section-entrevistas-realizadas-container'>
            <div className='entrevistas-realizadas-container'>
                <div className="title">
                    <h3>Entrevistas Realizadas</h3>
                </div>
                <div className="filtros-entrevistas-realizadas">
                    <label htmlFor="proposta">Proposta: </label>
                    <input type="text" name="proposta" id="proposta" />

                    <button onClick={gerarRelatorio}>Relatório</button>
                </div>
                <div className="entrevistas-realizadas">
                    <table className='table'>
                        <thead className='table-header'>
                            <tr>
                                <th>ID LPL</th>
                                <th>Proposta</th>
                                <th>Data Entrevista</th>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Idade</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                entrevistas.map(e => {
                                    return (
                                        <tr key={e._id}>
                                            <td>{e._id}</td>
                                            <td>{e.proposta}</td>
                                            <td>{moment(e.dataEntrevista).format('DD/MM/YYYY')}</td>
                                            <td>{e.nome}</td>
                                            <td>{e.cpf}</td>
                                            <td>{e.idade}</td>
                                            <td><Link to={`/entrevistas/propostas/editar/${e._id}`}>Editar</Link> <button onClick={() => { gerarPdf(e.proposta, e.nome) }} >PDF</button> </td>
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
}

export default EntrevistasRealizadas