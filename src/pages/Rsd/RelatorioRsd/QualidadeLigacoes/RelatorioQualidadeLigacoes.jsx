import React, { useState } from 'react'
import Axios from 'axios'
import moment from 'moment/moment'

const RelatorioQualidadeLigacoes = () => {

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
                result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/relatorio/${aPartir}/${moment(new Date()).format('YYYY-MM-DD')}`, { withCredentials: true })
            }

            if (aPartir !== '' && ate === '') {
                result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/pedidos/todos`, { withCredentials: true })
            }

            if (aPartir !== '' && ate !== '') {
                result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/relatorio/${aPartir}/${ate}`, { withCredentials: true })
            }

            let xls = '\ufeff'
            xls += "<table border='1'>"
            xls += "<thead><tr>"
            xls += "<th>Pacote</th>"
            xls += "<th>Pedido</th>"
            xls += "<th>Quem Anexou</th>"
            xls += "<th>Responsável</th>"
            xls += "<th>Data Conclusão</th>"
            xls += "<th>Data Inclusão</th>"

            setMsg('Gerando Arquivo')

            result.data.pedidos.forEach(e => {
                xls += "<tr>"
                xls += `<td>${e.pacote}</td>`
                xls += `<td>${e.numero}</td>`
                xls += `<td>${e.quemAnexou}</td>`
                xls += `<td>${e.analista}</td>`
                if (e.dataConclusao === undefined) {
                    xls += `<td></td>`
                } else {
                    xls += `<td>${moment(e.dataConclusao).format('DD/MM/YYYY')}</td>`
                }
                xls += `<td>${moment(e.createdAt).format('DD/MM/YYYY')}</td>`
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
        <div className='container-relatorio-rsd'>
            <div className="title">
                <h3>Relatório Ligações</h3>
            </div>
            <div className='datas-relatorio-rsd'>
                <div>
                    <label htmlFor="">A partir de: </label>
                    <input type="date" name="" id="" onChange={e => setAPartir(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="">Até: </label>
                    <input type="date" name="" id="" onChange={e => setAte(e.target.value)} />
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
        </div>
    )
}

export default RelatorioQualidadeLigacoes