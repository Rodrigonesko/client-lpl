import React, { useState } from "react";
import Axios from 'axios'
import * as XLSX from "xlsx";
import Sidebar from "../../../components/Sidebar/Sidebar";
import moment from "moment/moment";

const RelatorioRsd = () => {

    const [msg, setMsg] = useState('')
    const [file, setFile] = useState()

    const gerarRelatorio = async () => {
        try {

            setMsg('Buscando Dados...')

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/pedidos/todos`, { withCredentials: true })

            console.log(result);

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
            xls += "</tr>"
            xls += "</thead>"
            xls += "<tbody>"

            setMsg('Gerando Arquivo')

            result.data.pedidos.forEach(e => {
                xls += "<tr>"
                xls += `<td>${e.pacote}</td>`
                xls += `<td>${e.fase}</td>`
                xls += `<td>${e.statusPadraoAmil}</td>`
                xls += `<td>${e.statusGerencial}</td>`
                xls += `<td>${moment(e.createdAt).format('MM/YYYY')}</td>`
                xls += `<td>${moment(e.createdAt).format('DD/MM/YYYY')}</td>`
                xls += `<td>${moment(e.dataConclusao).format('DD/MM/YYYY')}</td>`
                xls += `<td>${e.operador}</td>`
                xls += `<td>${e.protocolo}</td>`
                xls += `<td>${e.numero}</td>`
                xls += `<td>${e.mo}</td>`
                xls += `<td>${e.pessoa}</td>`
                xls += `<td>${moment(e.dataSolicitacao).format('DD/MM/YYYY')}</td>`
                xls += `<td>${e.valorApresentado}</td>`
                xls += `<td>${e.cnpj}</td>`
                xls += `<td>${e.clinica}</td>`
                xls += `<td>${e.contratoEmpresa}</td>`
                if(e.dataSelo == undefined){
                    xls += `<td></td>`
                } else {
                    xls += `<td>${moment(e.dataSelo).format('DD/MM/YYYY')}</td>`
                }
                xls += `<td>${e.formaPagamento}</td>`
                xls += `<td>${e.prioridadeDossie}</td>`
                xls += `<td>${e.nf}</td>`
                xls += `<td>${e.dataConclusao}</td>`
                xls += `</tr>`
            })

            xls += "</tbody></table>"

            var a = document.createElement('a');
            var data_type = 'data:application/vnd.ms-excel';
            a.href = data_type + ', ' + xls.replace(/ /g, '%20');
            a.download = 'relatorio rsd.xls'
            a.click()

            setMsg('Arquivo gerado!')

            // const ws = XLSX.utils.json_to_sheet(result.data.pedidos)
            // const wb = { Sheets: { data: ws }, SheetNames: ["data"] }
            // XLSX.writeFile(wb, 'reportRSD.xlsx')


        } catch (error) {
            console.log(error);
            setMsg('Algo deu errado')
        }
    }

    const send = async e => {
        try {

            e.preventDefault()

            let formData = new FormData()

            formData.append('file', file, file.name)

            const result = await Axios.post(`${process.env.REACT_APP_API_KEY}/entrevistas/upload/cids`, formData, { headers: { "Content-Type": `multipart/form-data; boundary=${formData._boundary}` }, withCredentials: true })

            console.log(result);

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <Sidebar></Sidebar>
            <section>
                <div>
                    <div className="title">
                        Relatório RSD
                    </div>
                    <div>
                        <button onClick={gerarRelatorio} >Gerar Relatório</button>
                    </div>
                    <div>
                        {
                            <span>{msg}</span>
                        }
                    </div>
                </div>
                <form action="" method="post" encType="multipart/form-data">
                    <div className="title">
                        <h2>Upload</h2>
                    </div>
                    <div>
                        <label htmlFor="file-rn">Arquivo: </label>
                        <input type="file" name="file-rn" id="file-rn" onChange={e => setFile(e.target.files[0])} />
                    </div>
                    <div className="container-btns">
                        <button className="btn" onClick={send} >Enviar</button>
                    </div>
                </form>
            </section>
            
        </>
    )
}

export default RelatorioRsd