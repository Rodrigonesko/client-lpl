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

                    <button>Relatório</button>
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
                                <th>Data Nascimento</th>
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
                                            <td>{moment(e.createdAt).format('DD/MM/YYYY')}</td>
                                            <td>{e.nome}</td>
                                            <td>{e.cpf}</td>
                                            <td>{e.dataNascimento}</td>
                                            <td><Link to={`/entrevistas/propostas/editar/${e._id}`}>Editar</Link> <button onClick={()=>{ gerarPdf( e.proposta, e.nome) }} >PDF</button> </td>
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