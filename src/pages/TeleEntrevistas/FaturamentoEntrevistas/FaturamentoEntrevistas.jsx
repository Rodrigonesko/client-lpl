import React, { useState, useEffect } from "react";
import Axios from 'axios'
import moment from "moment/moment";
import Sidebar from "../../../components/Sidebar/Sidebar";
import './FaturamentoEntrevistas.css'
import { CircularProgress, Button, TextField, InputLabel, MenuItem, FormControl, Select, Dialog, DialogContent, DialogTitle, DialogActions } from "@mui/material";
import ModalRelatorio from "./components/ModalRelatorio";

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

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/faturar`, { entrevistas: faturar }, {
                withCredentials: true,
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

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
                const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/faturamento/filtros/${status}/todos`, {
                    withCredentials: true,
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                console.log(result);
                setEntrevistas(result.data.entrevistas)
            } else {
                const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/faturamento/filtros/${status}/${data}`, {
                    withCredentials: true,
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                console.log(result);
                setEntrevistas(result.data.entrevistas)
            }

            setLoading(false)

        } catch (error) {
            console.log(error);
        }
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
                            <ModalRelatorio />
                        </div>
                        <div>
                            <button onClick={realizarFaturamento}>Faturar</button>
                        </div>
                    </div>
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