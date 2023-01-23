import React, { useState } from "react";
import Axios from 'axios'
import * as XLSX from "xlsx";
import Sidebar from "../../../components/Sidebar/Sidebar";
import moment from "moment/moment";
import RelatorioQuarentena from "./Quarentena/RelatorioQuarentena";
import './RelatorioRsd.css'

const RelatorioRsd = () => {

    const [msg, setMsg] = useState('')
    const [aPartir, setAPartir] = useState('')
    const [ate, setAte] = useState('')

    const gerarRelatorio = async () => {
        try {

            setMsg('Buscando Dados...')

            let result

            if (aPartir === '' && ate === '') {
                result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/pedidos/todos`, { withCredentials: true })
            }

            if (aPartir === '' && ate !== '') {
                result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/relatorio/${moment(new Date()).format('YYYY-MM-DD')}/${ate}`, { withCredentials: true })
            }

            if (aPartir !== '' && ate === '') {
                result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/relatorio/${aPartir}/${moment(new Date()).format('YYYY-MM-DD')}`, { withCredentials: true })
            }

            if (aPartir !== '' && ate !== '') {
                result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/relatorio/${aPartir}/${ate}`, { withCredentials: true })
            }

            let xls = '\ufeff'
            xls += "<table border='1'>"
            xls += "<thead><tr>"
            xls += "<th>Código</th>"
            xls += "<th>Fase</th>"
            xls += "<th>Status Amil</th>"
            xls += "<th>Status Gerencial</th>"
            xls += "<th>Mes Inclusão</th>"
            xls += "<th>Data Inclusão</th>"
            xls += "<th>Data Conclusão</th>"
            xls += "<th>Operadora Beneficiário</th>"
            xls += "<th>Número Protocolo</th>"
            xls += "<th>Número Pedido</th>"
            xls += "<th>Marca Ótica</th>"
            xls += "<th>Beneficiário</th>"
            xls += "<th>Data Solicitação</th>"
            xls += "<th>Valor Apresentado</th>"
            xls += "<th>CNPJ</th>"
            xls += "<th>Clínica</th>"
            xls += "<th>Contrato Empresa</th>"
            xls += "<th>Data Selo</th>"
            xls += "<th>Forma Pagamento</th>"
            xls += "<th>Marcação para Dossie</th>"
            xls += "<th>Número Nota Fiscal</th>"
            xls += "<th>Data Conclusão Pedido</th>"
            xls += "<th>Responsável</th>"
            xls += "<th>Quem anexou</th>"
            xls += "<th>Fila</th>"
            xls += '<th>Motivo inativo</th>'
            xls += "</tr>"
            xls += "</thead>"
            xls += "<tbody>"

            setMsg('Gerando Arquivo')

            result.data.pedidos.forEach(e => {

                let valorApresentado = e.valorApresentado - 0

                xls += "<tr>"
                xls += `<td>${e.pacote}</td>`
                xls += `<td>${e.fase}</td>`
                xls += `<td>${e.statusPadraoAmil}</td>`
                xls += `<td>${e.statusGerencial}</td>`
                xls += `<td>${moment(e.createdAt).format('MM/YYYY')}</td>`
                xls += `<td>${moment(e.createdAt).format('DD/MM/YYYY')}</td>`
                xls += `<td>${e.dataConclusao}</td>`
                xls += `<td>${e.operador}</td>`
                xls += `<td>${e.protocolo}'</td>`
                xls += `<td>${e.numero}</td>`
                xls += `<td>${e.mo}</td>`
                xls += `<td>${e.pessoa}</td>`
                xls += `<td>${moment(e.dataSolicitacao).format('DD/MM/YYYY')}</td>`
                xls += `<td>${valorApresentado?.toLocaleString('pt-br', {minimumFractionDigits: 2})}</td>`
                xls += `<td>${e.cnpj}</td>`
                xls += `<td>${e.clinica}</td>`
                xls += `<td>${e.contratoEmpresa}</td>`
                if (e.dataSelo === undefined) {
                    xls += `<td></td>`
                } else {
                    xls += `<td>${moment(e.dataSelo).format('DD/MM/YYYY')}</td>`
                }
                xls += `<td>${e.formaPagamento}</td>`
                xls += `<td>${e.prioridadeDossie}</td>`
                xls += `<td>${e.nf}</td>`

                if (e.dataConclusao === undefined) {
                    xls += `<td></td>`
                } else {
                    xls += `<td>${moment(e.dataConclusao).format('DD/MM/YYYY')}</td>`
                }
                xls += `<td>${e.analista}</td>`
                xls += `<td>${e.quemAnexou}</td>`
                xls += `<td>${e.fila}</td>`
                xls += `<td>${e.motivoInativo}</td>`

                xls += `</tr>`
            })

            xls += "</tbody></table>"

            var a = document.createElement('a');
            var data_type = 'data:application/vnd.ms-excel';
            a.href = data_type + ', ' + xls.replace(/ /g, '%20');
            a.download = 'relatorio rsd.xls'
            a.click()

            setMsg('Arquivo gerado!')


        } catch (error) {
            console.log(error);
            setMsg('Algo deu errado')
        }
    }

    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-relatorio-rsd">
                <div className="container-relatorio-rsd">
                    <div className="title">
                        <h3>Relatório RSD</h3>
                    </div>
                    <div className="datas-relatorio-rsd">
                        <div>
                            <label htmlFor="">A partir de: </label>
                            <input type="date" name="" id="" onChange={e => setAPartir(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="">Até: </label>
                            <input type="date" name="" id="" onChange={e => setAte(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <button className="btn-padrao-azul" onClick={gerarRelatorio} >Gerar Relatório</button>
                    </div>
                    <div>
                        {
                            <span>{msg}</span>
                        }
                    </div>
                </div>
                {/* <RelatorioQualidadeLigacoes></RelatorioQualidadeLigacoes> */}
            </section>

        </>
    )
}

export default RelatorioRsd