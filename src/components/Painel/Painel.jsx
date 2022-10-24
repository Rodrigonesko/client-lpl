import React, { useState } from "react";
import { FaAngleDown } from 'react-icons/fa'
import { Link } from "react-router-dom";
import Axios from 'axios'
import './Painel.css'
import moment from "moment";

const Painel = ({ statusVencido, statusVenceHoje, statusVenceAmanha, statusVence2, statusVence3, statusVence4, title, setStatusVencido, setStatusVenceHoje, setStatusVenceAmanha, setStatusVence2, setStatusVence3, setStatusVence4, protocolos }) => {

    const handleChange = (status, setStatus) => {
        setStatus(!status)
    }

    protocolos = protocolos.filter((item, pos, array) => {
        return array.map(x => x.mo).indexOf(item.mo) === pos
    })

    let qtdVencidos = 0
    let qtdVenceHoje = 0
    let qtdVenceAmanha = 0
    let qtdVence2 = 0
    let qtdVence3 = 0
    let qtdVence4 = 0

    protocolos.forEach(e => {
        let hoje = new Date()

        if (moment(hoje).toDate() >= moment(e.dataSla).toDate()) {
            qtdVencidos++
        }
        if (moment(hoje).format('YYYY-MM-DD') === moment(e.dataSla).toDate('YYYY-MM-DD')) {
            qtdVenceHoje++
        }

        hoje = moment(hoje).add(1, 'days').toDate()

        if (moment(hoje).format('YYYY-MM-DD') == moment(e.dataSla).format('YYYY-MM-DD')) {
            qtdVenceAmanha++
        }

        hoje = moment(hoje).add(1, 'days').toDate()

        if (moment(hoje).format('YYYY-MM-DD') == moment(e.dataSla).format('YYYY-MM-DD')) {
            qtdVence2++
        }

        hoje = moment(hoje).add(1, 'days').toDate()

        if (moment(hoje).format('YYYY-MM-DD') == moment(e.dataSla).format('YYYY-MM-DD')) {
            qtdVence3++
        }

        hoje = moment(hoje).add(1, 'days').toDate()

        if (moment(hoje).format('YYYY-MM-DD') <= moment(e.dataSla).format('YYYY-MM-DD')) {
            qtdVence4++
        }


    })

    return (
        <div className="painel">
            <h4>{title}</h4>
            <div className="vencido">
                <div className="change" onClick={() => {
                    handleChange(statusVencido, setStatusVencido)
                }}>
                    <FaAngleDown />
                    <span>Vencido ({qtdVencidos})</span>
                </div>

                {
                    statusVencido && (
                        <table>
                            <thead>
                                <tr>
                                    <th>Marca Ótica</th>
                                    <th>Nome</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    protocolos.map(e => {

                                        //const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/pessoas/${e.mo}`, {withCredentials: true})

                                        let hoje = new Date()

                                        if (moment(hoje).toDate() >= moment(e.dataSla).toDate()) {
                                            return (
                                                <tr key={e._id} >
                                                    <td>{e.mo}</td>
                                                    <td>{e.pessoa}</td>
                                                </tr>
                                            )
                                        }

                                    })
                                }
                            </tbody>
                        </table>
                    )
                }

            </div>
            <div className="vence-hoje">
                <div className="change" onClick={() => {
                    handleChange(statusVenceHoje, setStatusVenceHoje)
                }}>
                    <FaAngleDown />
                    <span>Vence Hoje ({qtdVenceHoje})</span>
                </div>
                {
                    statusVenceHoje && (
                        <table>
                            <thead>
                                <tr>
                                    <th>Marca Ótica</th>
                                    <th>Nome</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    protocolos.map(e => {

                                        //const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/pessoas/${e.mo}`, {withCredentials: true})

                                        let hoje = new Date()

                                        if (moment(hoje).format('YYYY-MM-DD') === moment(e.dataSla).toDate('YYYY-MM-DD')) {
                                            return (
                                                <tr key={e._id} >
                                                    <td>{e.mo}</td>
                                                    <td>{e.pessoa}</td>
                                                </tr>
                                            )
                                        }

                                    })
                                }
                            </tbody>
                        </table>
                    )
                }

            </div>
            <div className="vence-amanha" >
                <div className="change" onClick={() => {
                    handleChange(statusVenceAmanha, setStatusVenceAmanha)
                }}>
                    <FaAngleDown />
                    <span>Vence Amanhã ({qtdVenceAmanha})</span>
                </div>
                {
                    statusVenceAmanha && (
                        <table>
                            <thead>
                                <tr>
                                    <th>Marca Ótica</th>
                                    <th>Nome</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    protocolos.map(e => {

                                        let hoje = new Date()

                                        hoje = moment(hoje).add(1, 'days').toDate()

                                        if (moment(hoje).format('YYYY-MM-DD') === moment(e.dataSla).format('YYYY-MM-DD')) {

                                            return (
                                                <tr key={e._id} >
                                                    <td><Link to={`/rsd/FichaBeneficiario/${e.mo}`}>{e.mo}</Link></td>
                                                    <td>{e.pessoa}</td>
                                                </tr>
                                            )
                                        }

                                    })
                                }
                            </tbody>
                        </table>
                    )
                }

            </div>
            <div className="vence-2-dias">
                <div className="change" onClick={() => {
                    handleChange(statusVence2, setStatusVence2)
                }}>
                    <FaAngleDown />
                    <span>Vence em 2 Dias ({qtdVence2})</span>
                </div>

                {
                    statusVence2 && (
                        <table>
                            <thead>
                                <tr>
                                    <th>Marca Ótica</th>
                                    <th>Nome</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    protocolos.map(e => {

                                        let hoje = new Date()

                                        hoje = moment(hoje).add(2, 'days').toDate()

                                        if (moment(hoje).format('YYYY-MM-DD') === moment(e.dataSla).format('YYYY-MM-DD')) {

                                            return (
                                                <tr key={e._id} >
                                                    <td>{e.mo}</td>
                                                    <td>{e.pessoa}</td>
                                                </tr>
                                            )
                                        }

                                    })
                                }
                            </tbody>
                        </table>
                    )
                }

            </div>
            <div className="vence-3-dias">
                <div className="change" onClick={() => {
                    handleChange(statusVence3, setStatusVence3)
                }}>
                    <FaAngleDown />
                    <span>Vence em 3 Dias ({qtdVence3})</span>
                </div>

                {
                    statusVence3 && (
                        <table>
                            <thead>
                                <tr>
                                    <th>Marca Ótica</th>
                                    <th>Nome</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    protocolos.map(e => {

                                        let hoje = new Date()

                                        hoje = moment(hoje).add(3, 'days').toDate()

                                        if (moment(hoje).format('YYYY-MM-DD') === moment(e.dataSla).format('YYYY-MM-DD')) {

                                            return (
                                                <tr key={e._id} >
                                                    <td>{e.mo}</td>
                                                    <td>{e.pessoa}</td>
                                                </tr>
                                            )
                                        }

                                    })
                                }
                            </tbody>
                        </table>
                    )
                }
            </div>
            <div className="vence-4-dias">
                <div className="change" onClick={() => {
                    handleChange(statusVence4, setStatusVence4)
                }}>
                    <FaAngleDown />
                    <span>Vence em 4 dias ou mais ({qtdVence4})</span>
                </div>

                {
                    statusVence4 && (
                        <table>
                            <thead>
                                <tr>
                                    <th>Marca Ótica</th>
                                    <th>Nome</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    protocolos.map(e => {

                                        let hoje = new Date()

                                        hoje = moment(hoje).add(4, 'days').toDate()

                                        if (moment(hoje).format('YYYY-MM-DD') <= moment(e.dataSla).format('YYYY-MM-DD')) {

                                            return (
                                                <tr key={e._id} >
                                                    <td>{e.mo}</td>
                                                    <td>{e.pessoa}</td>
                                                </tr>
                                            )
                                        }

                                    })
                                }
                            </tbody>
                        </table>
                    )
                }
            </div>
        </div>
    )
}

export default Painel