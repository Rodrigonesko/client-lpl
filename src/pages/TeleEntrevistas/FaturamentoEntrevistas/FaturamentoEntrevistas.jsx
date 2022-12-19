import React, { useState, useEffect } from "react";
import Axios from 'axios'
import moment from "moment/moment";
import { IMaskInput } from "react-imask";
import Sidebar from "../../../components/Sidebar/Sidebar";
import './FaturamentoEntrevistas.css'
import Modal from 'react-modal'

Modal.setAppElement('#root')

const FaturamentoEntrevistas = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [entrevistas, setEntrevistas] = useState([])
    const [notaFiscalPreencher, setNotaFiscalPreencher] = useState('')
    const [status, setStatus] = useState('todos')
    const [data, setData] = useState('todos')

    const openModal = () => {
        setModalIsOpen(true)
    }
    const closeModal = () => {
        setModalIsOpen(false)
    }

    const buscarNaoFaturados = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/naoFaturadas`, { withCredentials: true })

            setEntrevistas(result.data.entrevistas)

        } catch (error) {
            console.log(error);
        }
    }

    const preencherNotasFiscais = () => {
        let nfs = document.getElementsByClassName('td-nf')
        for (const item of nfs) {
            item.value = notaFiscalPreencher
        }
    }

    const marcarTodos = () => {
        let checkbox = document.getElementsByClassName('check-faturado')

        for (const item of checkbox) {
            item.checked = true
        }
    }

    const realizarFaturamento = async () => {
        try {

            let nfs = document.getElementsByClassName('td-nf')
            let checkbox = document.getElementsByClassName('check-faturado')
            let ids = document.getElementsByClassName('id-faturamento')

            let faturar = []

            for (let i = 0; i < checkbox.length; i++) {

                if (checkbox[i].checked) {
                    faturar.push([nfs[i].value, ids[i].textContent])
                }
            }

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/faturar`, { entrevistas: faturar }, { withCredentials: true })

            if (result.status === 200) {
                openModal()
            }

            console.log(result);

        } catch (error) {
            console.log(error);
        }
    }

    const pesquisar = async () => {
        try {
            console.log(status, data);

            if (data === '') {
                const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/faturamento/filtros/${status}/todos`, { withCredentials: true })
                console.log(result);
                setEntrevistas(result.data.entrevistas)
            } else {
                const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/faturamento/filtros/${status}/${data}`, { withCredentials: true })
                console.log(result);
                setEntrevistas(result.data.entrevistas)
            }

        } catch (error) {
            console.log(error);
        }
    }

    const gerarRelatorio = async () => {
        const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/dadosEntrevista`, { withCredentials: true })

        let xls = '\ufeff'
        xls += "<table border='1'>"
        xls += "<thead><tr>"
        xls += "<th>Id</th>"
        xls += "<th>Proposta</th>"
        xls += "<th>Nome</th>"
        xls += "<th>Data Entrevista</th>"
        xls += "<th>Faturado</th>"
        xls += "<th>Nota Fiscal</th>"
        xls += "<th>Data Faturamento</th>"
        xls += "</tr></thead><tbody>"

        result.data.entrevistas.forEach(e => {
            xls += "<tr>"
            xls += `<td>${e._id}</td>`
            xls += `<td>${e.proposta}</td>`
            xls += `<td>${e.nome}</td>`
            xls += `<td>${moment(e.createdAt).format('DD/MM/YYYY')}</td>`
            xls += `<td>${e.faturado}</td>`
            if (e.nf === undefined) {
                xls += `<td></td>`
            } else {
                xls += `<td>${e.nf}</td>`
            }
            if (e.dataFaturamento === undefined) {
                xls += `<td></td>`
            } else {
                xls += `<td>${moment(e.dataFaturamento).format('DD/MM/YYYY')}</td>`
            }
            xls += `</tr>`
        })

        xls += "</tbody></table>"

        var a = document.createElement('a');
        var data_type = 'data:application/vnd.ms-excel';
        a.href = data_type + ', ' + xls.replace(/ /g, '%20');
        a.download = 'Relatorio Faturamento.xls'
        a.click()
    }

    useEffect(() => {
        buscarNaoFaturados()
    }, [])

    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-faturamento-entrevistas-container">
                <div className="faturamento-entrevistas-container">
                    <div className="title">
                        <h3>Faturamento</h3>
                    </div>
                    <div className="filtros-faturamento-entrevistas">
                        <label htmlFor="">Status</label>
                        <select name="" id="" onChange={e => { setStatus(e.target.value) }}>
                            <option value="todos"></option>
                            <option value='Faturado'>Faturado</option>
                            <option value='Não faturado'>Não Faturado</option>
                        </select>
                        <label htmlFor="mes-ano">Mes/Ano</label>
                        <IMaskInput
                            mask="00-0000"
                            placeholder="mes-ano"
                            name="mes-ano" id="mes-ano"
                            onChange={e => setData(e.target.value)}
                        />
                        <button onClick={pesquisar}>Filtrar</button>
                        <label htmlFor="nota-fiscal">Preencher NFs</label>
                        <input type="text" id="nota-fiscal" onChange={e => setNotaFiscalPreencher(e.target.value)} />
                        <button onClick={preencherNotasFiscais}>Preencher</button>
                        <button onClick={marcarTodos}>Marcar Todos</button>
                        <button onClick={gerarRelatorio}>Report</button>
                    </div>
                    <div className="entrevistas-faturamento">
                        <table className="table">
                            <thead className="table-header">
                                <tr>
                                    <th>ID</th>
                                    <th>Proposta</th>
                                    <th>Nome</th>
                                    <th>Data Entrevista</th>
                                    <th>Faturado</th>
                                    <th>Nota Fiscal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    entrevistas.map(e => {
                                        console.log(e.nf);
                                        return (
                                            <tr key={e._id}>
                                                <td className="id-faturamento">{e._id}</td>
                                                <td>{e.proposta}</td>
                                                <td>{e.nome}</td>
                                                <td>{moment(e.createdAt).format('DD/MM/YYYY')}</td>
                                                <td><input type="checkbox" name="" id="" className="check-faturado" checked={e.faturado === 'Faturado'}/></td>
                                                <td><input type="text" name="" id="" className="td-nf" defaultValue={e.nf} /></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <button onClick={realizarFaturamento}>Faturar</button>
                    </div>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Exemplo"
                    overlayClassName='modal-overlay'
                    className='modal-content'>
                    <div className="title">
                        <h2>Faturamento feito com sucesso!</h2>
                    </div>
                    <button onClick={() => {
                        closeModal()
                        window.location.reload()
                    }}>Fechar</button>
                </Modal>
            </section>
        </>
    )
}

export default FaturamentoEntrevistas