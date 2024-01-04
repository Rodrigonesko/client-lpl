import React, { useState, useEffect } from "react";
import Axios from 'axios'
import moment from "moment/moment";
import Sidebar from "../../../components/Sidebar/Sidebar";
import './FaturamentoEntrevistas.css'
import { CircularProgress, Button, TextField, InputLabel, MenuItem, FormControl, Select, Dialog, DialogContent, DialogTitle, DialogActions } from "@mui/material";

const FaturamentoEntrevistas = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [entrevistas, setEntrevistas] = useState([])
    const [notaFiscalPreencher, setNotaFiscalPreencher] = useState('')
    const [status, setStatus] = useState('todos')
    const [data, setData] = useState('todos')
    const [loading, setLoading] = useState(false)

    const openModal = () => {
        setModalIsOpen(true)
    }
    const closeModal = () => {
        setModalIsOpen(false)
    }

    const buscarNaoFaturados = async () => {
        try {

            // setLoading(true)

            // const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/naoFaturadas`, { withCredentials: true })

            // setEntrevistas(result.data.entrevistas)
            // setLoading(false)

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

            setLoading(true)

            let nfs = document.getElementsByClassName('td-nf')
            let checkbox = document.getElementsByClassName('check-faturado')
            let ids = document.getElementsByClassName('id-faturamento')
            let tipos = document.getElementsByClassName('tipo')

            let faturar = []

            for (let i = 0; i < checkbox.length; i++) {

                if (checkbox[i].checked) {
                    faturar.push([{ nf: nfs[i].value, id: ids[i].textContent, tipo: tipos[i].textContent }])
                }
            }

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/faturar`, { entrevistas: faturar }, { withCredentials: true })

            if (result.status === 200) {
                openModal()
                setLoading(false)
            }

        } catch (error) {
            console.log(error);
        }
    }

    const pesquisar = async () => {
        try {

            setLoading(true)

            if (data === '') {
                const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/faturamento/filtros/${status}/todos`, { withCredentials: true })
                console.log(result);
                setEntrevistas(result.data.entrevistas)
            } else {
                const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/faturamento/filtros/${status}/${data}`, { withCredentials: true })
                console.log(result);
                setEntrevistas(result.data.entrevistas)
            }

            setLoading(false)

        } catch (error) {
            console.log(error);
        }
    }

    const gerarRelatorio = async () => {

        setLoading(true)

        const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/dadosEntrevista`, { withCredentials: true })
        const reusltRn = await Axios.get(`${process.env.REACT_APP_API_KEY}/rn/concluidas`, {
            withCredentials: true
        })
        const resultUe = await Axios.get(`${process.env.REACT_APP_API_KEY}/urgenciaEmergencia/concluidas?limit=0&page=0`, { withCredentials: true })

        console.log(resultUe);

        let xls = '\ufeff'
        xls += "<table border='1'>"
        xls += "<thead><tr>"
        xls += "<th>Id</th>"
        xls += "<th>Analista</th>"
        xls += "<th>Tipo</th>"
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
            xls += `<td>${e.responsavel}</td>`
            xls += `<td>Tele</td>`
            xls += `<td>${e.proposta}</td>`
            xls += `<td>${e.nome}</td>`
            xls += `<td>${moment(e.dataEntrevista).format('DD/MM/YYYY')}</td>`
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

        reusltRn.data.result.forEach(e => {
            xls += "<tr>"
            xls += `<td>${e._id}</td>`
            xls += `<td>${e.responsavel}</td>`
            xls += `<td>Rn</td>`
            xls += `<td>${e.proposta}</td>`
            xls += `<td>${e.beneficiario}</td>`
            xls += `<td>${moment(e.dataConclusao).format('DD/MM/YYYY')}</td>`
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

        resultUe.data.propostas.forEach(e => {
            xls += "<tr>"
            xls += `<td>${e._id}</td>`
            xls += `<td>${e.retorno === 'Sem sucesso de contato' ? 'Sem Sucesso de Contato!' : e.analista}</td>`
            xls += `<td>UE</td>`
            xls += `<td>${e.pedido}</td>`
            xls += `<td>${e.nomeAssociado}</td>`
            xls += `<td>${moment(e.dataConclusao).format('DD/MM/YYYY')}</td>`
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

        setLoading(false)
    }

    useEffect(() => {
        buscarNaoFaturados()
    }, [])

    return (
        <>
            <Sidebar>
                <section className="section-faturamento-entrevistas-container">
                    <div className="faturamento-entrevistas-container">
                        <div className="title">
                            <h3>Faturamento</h3>
                        </div>
                        <div className="filtros-faturamento-entrevistas">
                            <FormControl variant='standard'>
                                <InputLabel id='status'>Status</InputLabel>
                                <Select
                                    labelId="status"
                                    id='select-status'
                                    label='Status'
                                    style={{ minWidth: '100px' }}
                                    onChange={e => {
                                        setStatus(e.target.value)
                                    }}
                                >
                                    <MenuItem value='todos'>
                                        <em>

                                        </em>
                                    </MenuItem>
                                    <MenuItem value='Faturado'>Faturado</MenuItem>
                                    <MenuItem value='Não faturado'>Não faturado</MenuItem>
                                </Select>
                            </FormControl>
                            <label htmlFor="mes-ano">Mes/Ano</label>
                            <TextField
                                variant='standard'
                                type='month'
                                name="mes-ano" id="mes-ano"
                                onChange={e => setData(e.target.value)}
                            />
                            <Button variant='contained' onClick={pesquisar}>Filtrar</Button>
                            <TextField variant='standard' type="text" id="nota-fiscal" onChange={e => setNotaFiscalPreencher(e.target.value)} label='Preencher NF' />
                            <Button variant='contained' onClick={preencherNotasFiscais}>Preencher</Button>
                            <Button variant='contained' onClick={marcarTodos}>Marcar Todos</Button>
                            <Button disabled={loading} endIcon={loading && <CircularProgress size={'20px'} />} variant='contained' onClick={gerarRelatorio}>Report</Button>
                        </div>
                        {/* <div className="entrevistas-faturamento">
                            {
                                loading ? (
                                    <CircularProgress style={{ position: 'absolute', top: '40%' }} />
                                ) : null
                            }
                            <table className="table">
                                <thead className="table-header">
                                    <tr>
                                        <th>ID</th>
                                        <th>Analista</th>
                                        <th>Tipo</th>
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
                                            return (
                                                <tr key={e._id}>
                                                    <td className="id-faturamento">{e._id}</td>
                                                    <td>{e.analista}</td>
                                                    <td className="tipo">{e.tipo}</td>
                                                    <td>{e.proposta}</td>
                                                    <td>{e.nome}</td>
                                                    <td>{moment(e.dataEntrevista).format('DD/MM/YYYY')}</td>
                                                    <td><input type="checkbox" name="" id="" className="check-faturado" defaultChecked={e.faturado === 'Faturado'} /></td>
                                                    <td><input type="text" name="" id="" className="td-nf" defaultValue={e.nf} /></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div> */}
                        <div>
                            <button onClick={realizarFaturamento}>Faturar</button>
                        </div>
                    </div>
                    {/* <Modal
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
                    </Modal> */}
                    <Dialog
                        open={modalIsOpen}
                        onClose={closeModal}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Faturamento feito com sucesso!"}</DialogTitle>
                        <DialogContent>
                            <DialogContent id="alert-dialog-description">
                                <p>Recarregue a página para atualizar os dados</p>
                            </DialogContent>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => {
                                closeModal()
                                window.location.reload()
                            }} autoFocus>
                                Atualizar
                            </Button>
                        </DialogActions>
                    </Dialog>
                </section>
            </Sidebar>
        </>
    )
}

export default FaturamentoEntrevistas