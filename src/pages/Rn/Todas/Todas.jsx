import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from 'react-router-dom'
import { Button } from "@mui/material";
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

            // let xls = '\ufeff'

            // xls += "<table border='1'>"
            // xls += "<thead><tr>"
            // xls += "<th>Data Conclusão</th>"
            // xls += "<th>Beneficiário</th>"
            // xls += "<th>MO</th>"
            // xls += "<th>Proposta</th>"
            // xls += "<th>Vigência</th>"
            // xls += "<th>Pedido</th>"
            // xls += "<th>Tipo</th>"
            // xls += "<th>Filial</th>"
            // xls += "<th>Idade</th>"
            // xls += "<th>Data Recebimento</th>"
            // xls += "<th>Procedimento</th>"
            // xls += "<th>Doença</th>"
            // xls += "<th>Cid</th>"
            // xls += "<th>Período</th>"
            // xls += "<th>Prc</th>"
            // xls += "<th>Telefones Beneficiário</th>"
            // xls += "<th>Email</th>"
            // xls += "<th>1° Contato</th>"
            // xls += "<th>2° Contato</th>"
            // xls += "<th>3° Contato</th>"
            // xls += "<th>Observações</th>"
            // xls += "</tr></thead><tbody>"

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

                // xls += "<tr>"
                // if(e.dataConclusao === undefined){
                //     xls += `<td></td>`
                // } else {
                //     xls += `<td>${e.dataConclusao}</td>`
                // }
                // xls += `<td>${e.beneficiario}</td>`
                // xls += `<td>${e.mo}</td>`
                // xls += `<td>${e.proposta}</td>`
                // xls += `<td>${e.vigencia}</td>`
                // xls += `<td>${e.pedido}</td>`
                // xls += `<td>${e.tipo}</td>`
                // xls += `<td>${e.filial}</td>`
                // xls += `<td>${e.idade}</td>`
                // xls += `<td>${e.dataRecebimento}</td>`
                // xls += `<td>${e.procedimento}</td>`
                // xls += `<td>${e.doenca}</td>`
                // xls += `<td>${e.cid}</td>`
                // xls += `<td>${e.periodo}</td>`
                // xls += `<td>${e.prc}</td>`
                // xls += `<td>${e.telefones}</td>`
                // xls += `<td>${e.email}</td>`
                // xls += `<td>${e.contato1}</td>`
                // xls += `<td>${e.contato2}</td>`
                // xls += `<td>${e.contato3}</td>`
                // xls += `<td>${e.observacoes}</td>`

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

            // let xls = '\ufeff'

            // xls += "<table border='1'>"
            // xls += "<thead><tr>"
            // xls += "<th>Data Conclusão</th>"
            // xls += "<th>Beneficiário</th>"
            // xls += "<th>MO</th>"
            // xls += "<th>Proposta</th>"
            // xls += "<th>Vigência</th>"
            // xls += "<th>Pedido</th>"
            // xls += "<th>Tipo</th>"
            // xls += "<th>Filial</th>"
            // xls += "<th>Idade</th>"
            // xls += "<th>Data Recebimento</th>"
            // xls += "<th>Procedimento</th>"
            // xls += "<th>Doença</th>"
            // xls += "<th>Cid</th>"
            // xls += "<th>Período</th>"
            // xls += "<th>Prc</th>"
            // xls += "<th>Telefones Beneficiário</th>"
            // xls += "<th>Email</th>"
            // xls += "<th>1° Contato</th>"
            // xls += "<th>2° Contato</th>"
            // xls += "<th>3° Contato</th>"
            // xls += "<th>Observações</th>"
            // xls += "</tr></thead><tbody>"

            // rnsForExcel = rns.map(e => {

            //     let contato1, contato2, contato3

            //     if (e.dataContato1 !== undefined) {
            //         contato1 = moment(e.dataContato1).format('DD/MM/YYYY') + ' ' + e.horarioContato1
            //     }

            //     if (e.dataContato2 !== undefined) {
            //         contato2 = moment(e.dataContato2).format('DD/MM/YYYY') + ' ' + e.horarioContato2
            //     }

            //     if (e.dataContato3 !== undefined) {
            //         contato3 = moment(e.dataContato3).format('DD/MM/YYYY') + ' ' + e.horarioContato3
            //     }

            // xls += "<tr>"
            // if(e.dataConclusao === undefined){
            //     xls += `<td></td>`
            // } else {
            //     xls += `<td>${moment(e.dataConclusao).format('DD/MM/YYYY')}</td>`
            // }
            // xls += `<td>${e.beneficiario}</td>`
            // xls += `<td>${e.mo}</td>`
            // xls += `<td>${e.proposta}</td>`
            // xls += `<td>${e.vigencia}</td>`
            // xls += `<td>${e.pedido}</td>`
            // xls += `<td>${e.tipo}</td>`
            // xls += `<td>${e.filial}</td>`
            // xls += `<td>${e.idade}</td>`
            // xls += `<td>${e.dataRecebimento}</td>`
            // xls += `<td>${e.procedimento}</td>`
            // xls += `<td>${e.doenca}</td>`
            // xls += `<td>${e.cid}</td>`
            // xls += `<td>${e.periodo}</td>`
            // xls += `<td>${e.prc}</td>`
            // xls += `<td>${e.telefones}</td>`
            // xls += `<td>${e.email}</td>`
            // xls += `<td>${e.contato1}</td>`
            // xls += `<td>${e.contato2}</td>`
            // xls += `<td>${e.contato3}</td>`
            // xls += `<td>${e.observacoes}</td>`
            // xls += `</tr>`

            //     return (
            //         {
            //             DATA: e.data,
            //             'BENEFICIÁRIO': e.beneficiario,
            //             MO: e.mo,
            //             PROPOSTA: e.proposta,
            //             VIGENCIA: e.vigencia,
            //             'PEDIDO/PROPOSTA': e.pedido,
            //             TIPO: e.tipo,
            //             FILIAL: e.filial,
            //             IDADE: e.idade,
            //             'DATA RECEBIMENTO DO PEDIDO': e.dataRecebimento,
            //             PROCEDIMENTO: e.procedimento,
            //             'DOENÇA': e.doenca,
            //             CID: e.cid,
            //             'PERÍODO DA DOENÇA': e.periodo,
            //             PRC: e.prc,
            //             'TELEFONES BENEFICIARIO': e.telefones,
            //             'EMAIL BENEFICIARIO': e.email,
            //             '1º CTTO': contato1,
            //             '2º CTTO': contato2,
            //             '3º CTTO': contato3,
            //             'OBSERVAÇÕES DO CONTATO': e.observacoes

            //         }
            //     )


            // })

            // xls += "</tbody></table>"

            // var a = document.createElement('a');
            // var data_type = 'data:application/vnd.ms-excel';
            // a.href = data_type + ', ' + xls.replace(/ /g, '%20');
            // a.download = 'Relatorio Propostas.xls'
            // a.click()

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

    const reportGerencial = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rn/report`, { withCredentials: true })

            let xls = '\ufeff'

            xls += "<table border='1'>"
            xls += "<thead><tr>"
            xls += "<th>Data Conclusão</th>"
            xls += "<th>Beneficiário</th>"
            xls += "<th>MO</th>"
            xls += "<th>Proposta</th>"
            xls += "<th>Vigência</th>"
            xls += "<th>Pedido</th>"
            xls += "<th>Tipo</th>"
            xls += "<th>Filial</th>"
            xls += "<th>Idade</th>"
            xls += "<th>Data Recebimento</th>"
            xls += "<th>Procedimento</th>"
            xls += "<th>Doença</th>"
            xls += "<th>Cid</th>"
            xls += "<th>Período</th>"
            xls += "<th>Prc</th>"
            xls += "<th>Telefones Beneficiário</th>"
            xls += "<th>Email</th>"
            xls += "<th>1° Contato</th>"
            xls += "<th>2° Contato</th>"
            xls += "<th>3° Contato</th>"
            xls += "<th>Observações</th>"
            xls += "</tr></thead><tbody>"

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

                xls += "<tr>"
                if (e.dataConclusao === undefined) {
                    xls += `<td></td>`
                } else {
                    xls += `<td>${moment(e.dataConclusao).format('DD/MM/YYYY')}</td>`
                }
                xls += `<td>${e.beneficiario}</td>`
                xls += `<td>${e.mo}</td>`
                xls += `<td>${e.proposta}</td>`
                xls += `<td>${e.vigencia}</td>`
                xls += `<td>${e.pedido}</td>`
                xls += `<td>${e.tipo}</td>`
                xls += `<td>${e.filial}</td>`
                xls += `<td>${e.idade}</td>`
                xls += `<td>${e.dataRecebimento}</td>`
                xls += `<td>${e.procedimento}</td>`
                xls += `<td>${e.doenca}</td>`
                xls += `<td>${e.cid}</td>`
                xls += `<td>${e.periodo}</td>`
                xls += `<td>${e.prc}</td>`
                xls += `<td>${e.telefones}</td>`
                xls += `<td>${e.email}</td>`
                xls += `<td>${e.contato1}</td>`
                xls += `<td>${e.contato2}</td>`
                xls += `<td>${e.contato3}</td>`
                xls += `<td>${e.observacoes}</td>`
                xls += `</tr>`
            })

            xls += "</tbody></table>"

            var a = document.createElement('a');
            var data_type = 'data:application/vnd.ms-excel';
            a.href = data_type + ', ' + xls.replace(/ /g, '%20');
            a.download = 'Relatorio Propostas.xls'
            a.click()

        } catch (error) {

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
                    <div className="report">
                        <Button variant="outlined" onClick={report}>Report</Button>
                        <Button variant="contained" onClick={reportGerencial} >Report Gerencial</Button>
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