import React, { useState } from "react";
import { FaAngleDown } from 'react-icons/fa'
import './Painel.css'

const Painel = ({ statusVencido, statusVenceHoje, statusVenceAmanha, statusVence2, statusVence3, statusVence4, title, setStatusVencido, setStatusVenceHoje, setStatusVenceAmanha, setStatusVence2, setStatusVence3, setStatusVence4 }) => {

    const handleChange = (status, setStatus) => {
        setStatus(!status)
    }

    return (
        <div className="painel">
            <h4>{title}</h4>
            <div className="vencido">
                <div className="change" onClick={() => {
                    handleChange(statusVencido, setStatusVencido)
                }}>
                    <FaAngleDown />
                    <span>Vencido</span>
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
                    <span>Vence Hoje</span>
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
                    <span>Vence Amanhã</span>
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
                    <span>Vence em 2 Dias</span>
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
                    <span>Vence em 3 Dias</span>
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
                    <span>Vence em 4 dias ou mais</span>
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

                            </tbody>
                        </table>
                    )
                }
            </div>
        </div>
    )
}

export default Painel