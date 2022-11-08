import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from 'react-router-dom'
import * as XLSX from "xlsx";
import moment from "moment";
import Sidebar from "../../../components/Sidebar/Sidebar";
import './Todas.css'

const Todas = () => {

    const [rns, setRns] = useState([])

    let rnsForExcel

    const searchProposta = async (proposta) => {

        const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rn/pedido/${proposta}`, { withCredentials: true })

        setRns(result.data)

    }

    const searchRn = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rn/rns`, { withCredentials: true })
            setRns(result.data)
        } catch (error) {
            console.log(error);
        }
    }

    const transformData = () => {
        try {

            rnsForExcel = rns.map(e => {

                let contato1, contato2, contato3

                if (e.dataContato1 !== undefined) {
                    contato1 = moment(e.dataContato1).format('DD/MM/YYYY') + ' ' + e.horarioContato1
                }

                if (e.dataContato2 !== undefined) {
                    contato2 = moment(e.dataContato2).format('DD/MM/YYYY') + ' ' + e.horarioContato2
                }

                if (e.dataContato3 !== undefined) {
                    contato3 = moment(e.dataContato3).format('DD/MM/YYYY') + ' ' + e.horarioContato3
                }

                console.log(contato1, contato2, contato3)
                return (
                    {
                        DATA: e.data,
                        'BENEFICIÁRIO': e.beneficiario,
                        MO: e.mo,
                        PROPOSTA: e.proposta,
                        VIGENCIA: e.vigencia,
                        'PEDIDO/PROPOSTA': e.pedido,
                        TIPO: e.tipo,
                        FILIAL: e.filial,
                        IDADE: e.idade,
                        'DATA RECEBIMENTO DO PEDIDO': e.dataRecebimento,
                        PROCEDIMENTO: e.procedimento,
                        'DOENÇA': e.doenca,
                        CID: e.cid,
                        'PERÍODO DA DOENÇA': e.periodo,
                        PRC: e.prc,
                        'TELEFONES BENEFICIARIO': e.telefones,
                        'EMAIL BENEFICIARIO': e.email,
                        '1º CTTO': contato1,
                        '2º CTTO': contato2,
                        '3º CTTO': contato3,
                        'OBSERVAÇÕES DO CONTATO': e.observacoes

                    }
                )


            })


        } catch (error) {
            console.log(error);
        }
    }

    const report = async () => {

        transformData()

        try {
            const ws = XLSX.utils.json_to_sheet(rnsForExcel)
            const wb = { Sheets: { data: ws }, SheetNames: ["data"] }
            XLSX.writeFile(wb, 'reportRn.xlsx')

            console.log(ws);

        } catch (error) {
            console.log(error);
        }

    }

    const reportDiario = async () => {

        const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rn/report`, { withCredentials: true })

        let arrReportDiario = result.data.map(e => {

            let contato1, contato2, contato3

            if (e.dataContato1 !== undefined) {
                contato1 = moment(e.dataContato1).format('DD/MM/YYYY') + ' ' + e.horarioContato1
            }

            if (e.dataContato2 !== undefined) {
                contato2 = moment(e.dataContato2).format('DD/MM/YYYY') + ' ' + e.horarioContato2
            }

            if (e.dataContato3 !== undefined) {
                contato3 = moment(e.dataContato3).format('DD/MM/YYYY') + ' ' + e.horarioContato3
            }

            return (
                {
                    DATA: e.data,
                    'BENEFICIÁRIO': e.beneficiario,
                    MO: e.mo,
                    PROPOSTA: e.proposta,
                    VIGENCIA: e.vigencia,
                    'PEDIDO/PROPOSTA': e.pedido,
                    TIPO: e.tipo,
                    FILIAL: e.filial,
                    IDADE: e.idade,
                    'DATA RECEBIMENTO DO PEDIDO': e.dataRecebimento,
                    PROCEDIMENTO: e.procedimento,
                    'DOENÇA': e.doenca,
                    CID: e.cid,
                    'PERÍODO DA DOENÇA': e.periodo,
                    PRC: e.prc,
                    'TELEFONES BENEFICIARIO': e.telefones,
                    'EMAIL BENEFICIARIO': e.email,
                    '1º CTTO': contato1,
                    '2º CTTO': contato2,
                    '3º CTTO': contato3,
                    'OBSERVAÇÕES DO CONTATO': e.observacoes,
                    'Conclusao': e.updatedAt

                }
            )
        })

        const ws = XLSX.utils.json_to_sheet(arrReportDiario)
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] }
        XLSX.writeFile(wb, 'reportRn.xlsx')

    }


    useEffect(() => {
        searchRn()
    }, [])

    return (
        <>
            <Sidebar />
            <section className="section-rn-container">
                <div className="rn-container">
                    <div className="report">
                        <button onClick={report}>Report</button>
                        <button onClick={reportDiario} >Report Diario</button>
                    </div>
                    <div className="title">
                        <h2>Rns</h2>
                    </div>
                    <div className="filters">
                        <div className="filter">
                            <label htmlFor="proposta">Proposta: </label>
                            <input type="text" id="proposta" name="proposta" placeholder="Proposta" onKeyUp={e => {
                                let proposta = e.target.value

                                searchProposta(proposta)

                            }} />
                        </div>
                    </div>
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr className="table-header">
                                    <th>BENEFICIARIO</th>
                                    <th>MO</th>
                                    <th>IDADE</th>
                                    <th>TELEFONE</th>
                                    <th>CONFIRMADO?</th>
                                    <th>DETALHES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rns.map(e => {
                                    return (
                                        <tr key={e.proposta}>
                                            <td>{e.beneficiario}</td>
                                            <td>{e.mo}</td>
                                            <td>{e.idade}</td>
                                            <td>{e.telefones}</td>
                                            <td>{e.respostaBeneficiario}</td>
                                            <td><Link to={'../rn/rns/' + e._id} className="link">Detalhes</Link></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Todas