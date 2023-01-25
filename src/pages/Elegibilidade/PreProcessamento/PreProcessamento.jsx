import React, { useEffect, useState, useContext } from "react";
import moment from "moment/moment";
import Axios from 'axios'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, InputLabel, MenuItem, Select, FormControl, TextField, Snackbar, makeStyles, Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Link } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import Sidebar from "../../../components/Sidebar/Sidebar";

const PreProcessamento = () => {

    const { name } = useContext(AuthContext)

    const [propostas, setPropostas] = useState([''])
    const [total, setTotal] = useState(0)
    const [analistas, setAnalistas] = useState([])

    const buscarPropostas = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/elegibilidade/propostas/preProcessamento/${name}`, { withCredentials: true })

            setPropostas(result.data.propostas)
            setTotal(result.data.total)

        } catch (error) {
            console.log(error);
        }
    }

    const buscarAnalistas = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/users/elegibilidade`, { withCredentials: true })

            setAnalistas(result.data.analistas)

        } catch (error) {
            console.log(error);
        }
    }

    const atribuirAnalista = async (analista, id) => {
        try {

            if (analista === '') {
                return
            }

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/elegibilidade/atribuir/preProcessamento`, {
                analista,
                id
            }, {
                withCredentials: true
            })

        } catch (error) {
            console.log(error);
        }
    }

    const buscarPropostasAnalista = async (analista) => {
        const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/elegibilidade/propostas/preProcessamento/${analista}`, { withCredentials: true })

        setPropostas(result.data.propostas)
        setTotal(result.data.total)

    }

    const buscarPropostaFiltrada = async (proposta) => {
        try {

            if (proposta === '') {
                buscarPropostas()
                return
            }

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/elegibilidade/propostas/preProcessamento/proposta/${proposta}`, { withCredentials: true })

            setPropostas(result.data.proposta)

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        buscarPropostas()
        buscarAnalistas()
    }, [name])

    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-padrao-elegi">
                <div className="div-padrao-elegi">
                    <div className="title">
                        <h3>Análise de Documentos (Atrbuição Pré Processamento)</h3>
                    </div>
                    <div className="filtros-padrao-elegi" style={{display: 'flex', alignItems:'center'}}>
                        <TextField label="Proposta" type="text" id="proposta-analise-doc" onKeyUp={e => (
                            buscarPropostaFiltrada(e.target.value)
                        )} />
                        <span style={{margin: '0 20px'}} >Total: <strong>{total}</strong> </span>
                        <FormControl>
                            <InputLabel id="filtro-analista">Analista</InputLabel>
                            <Select style={{ minWidth: '90px' }} labelId='filtro-analista' onChange={e => {
                                buscarPropostasAnalista(e.target.value)
                            }}>
                                <MenuItem value="">
                                    <em>Analista</em>
                                </MenuItem>
                                <MenuItem value="Todos">Todos</MenuItem>
                                {
                                    analistas.map(analista => {
                                        return (
                                            <MenuItem value={analista.name} >{analista.name}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>

                    </div>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table" >
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ backgroundColor: 'lightgray' }}>Proposta</TableCell>
                                    <TableCell style={{ backgroundColor: 'lightgray' }}>Data Importação</TableCell>
                                    <TableCell style={{ backgroundColor: 'lightgray' }}>Início Vigência</TableCell>
                                    <TableCell style={{ backgroundColor: 'lightgray' }}>Nome Titular</TableCell>
                                    <TableCell style={{ backgroundColor: 'lightgray' }}>Sem Documentos</TableCell>
                                    <TableCell style={{ backgroundColor: 'lightgray' }}>Analista</TableCell>
                                    <TableCell style={{ backgroundColor: 'lightgray' }}>Status Proposta</TableCell>
                                    <TableCell style={{ backgroundColor: 'lightgray' }}>Detalhes</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    propostas.map(e => {
                                        return (
                                            <TableRow hover tabIndex={-1} key={e._id}>
                                                <TableCell>{e.proposta}</TableCell>
                                                <TableCell>{moment(e.dataImportacao).format('DD/MM/YYYY')}</TableCell>
                                                <TableCell>{moment(e.vigencia).format('DD/MM/YYYY')}</TableCell>
                                                <TableCell>{e.nome}</TableCell>
                                                <TableCell>{e.faltaDoc}</TableCell>
                                                <TableCell>
                                                    <FormControl>
                                                        <InputLabel id="analista">Analista</InputLabel>
                                                        <Select style={{ minWidth: '90px' }} labelId="analista" name="analistas" onChange={(item) => {
                                                            atribuirAnalista(item.target.value, e._id)
                                                        }}>
                                                            <MenuItem value="">
                                                                <em>Analista</em>
                                                            </MenuItem>
                                                            {
                                                                analistas.map(analista => {
                                                                    return (
                                                                        <MenuItem value={analista.name} selected={e.analistaPreProcessamento === analista.name ? (true) : (false)} >{analista.name}</MenuItem>
                                                                    )
                                                                })
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>
                                                <TableCell>{e.status}</TableCell>
                                                <TableCell><Link to={`/elegibilidade/preProcessamento/detalhes/${e._id}`} className='btn-padrao-azul' >Detalhes</Link></TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </section>
        </>
    )
}

export default PreProcessamento