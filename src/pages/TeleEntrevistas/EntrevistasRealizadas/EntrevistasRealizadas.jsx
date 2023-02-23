import React, { useState } from 'react'
import Sidebar from '../../../components/Sidebar/Sidebar'
import Axios from 'axios'
import { CircularProgress, Button, TextField, Box, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'
import moment from 'moment'
import './EntrevistasRealizadas.css'
import gerarPdf from '../Pdf/Pdf'

const EntrevistasRealizadas = () => {

    const [entrevistas, setEntrevistas] = useState([])
    const [pesquisa, setPesquisa] = useState('');
    const [loading, setLoading] = useState(false)

    const alterarSexo = async (id, sexo) => {
        try {

            await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/realizadas/alterarSexo`, {
                id, sexo
            }, {
                withCredentials: true
            })

        } catch (error) {
            console.log(error);
        }
    }

    const buscarEntrevistas = async () => {
        try {

            setLoading(true)

            if (pesquisa.length < 3) {
                return
            }

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/realizadas/${pesquisa}`, { withCredentials: true })

            setLoading(false)

            setEntrevistas(result.data.result)

        } catch (error) {
            console.log(error);
        }
    }

    const gerarRelatorio = async () => {
        try {


            setLoading(true)

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/dadosEntrevista`, { withCredentials: true })

            let xls = '\ufeff'
            xls += "<table border='1'>"
            xls += "<thead><tr>"
            xls += "<th>Id</th>"
            xls += "<th>Proposta</th>"
            xls += "<th>Tipo Contrato</th>"
            xls += "<th>Data Entrevista</th>"
            xls += "<th>Nome</th>"
            xls += "<th>Cpf</th>"
            xls += "<th>Data Nascimento</th>"
            xls += "<th>Idade</th>"
            xls += "<th>Feito Por</th>"
            xls += "<th>Divergencia</th>"
            xls += "<th>Qual</th>"
            xls += "<th>Cids</th>"
            xls += "<th>Data Recebimento</th>"
            xls += "</tr></thead><tbody>"

            result.data.entrevistas.forEach(e => {
                xls += "<tr>"
                xls += `<td>${e._id}</td>`
                xls += `<td>${e.proposta}</td>`
                xls += `<td>${e.tipoContrato}</td>`
                xls += `<td>${moment(e.dataEntrevista).format('DD/MM/YYYY')}</td>`
                xls += `<td>${e.nome}</td>`
                xls += `<td>${e.cpf}</td>`
                xls += `<td>${e.dataNascimento}</td>`
                xls += `<td>${e.idade}</td>`
                xls += `<td>${e.responsavel}</td>`
                xls += `<td>${e.houveDivergencia}</td>`
                if (e.divergencia) {
                    xls += `<td>${e.divergencia}</td>`
                } else {
                    xls += `<td></td>`
                }
                if (e.cids) {
                    xls += `<td>${e.cids}</td>`
                } else {
                    xls += `<td></td>`
                }
                xls += `<td>${moment(e.dataRecebimento).format('DD/MM/YYYY')}</td>`
                xls += `</tr>`
            })

            xls += "</tbody></table>"

            var a = document.createElement('a');
            var data_type = 'data:application/vnd.ms-excel';
            a.href = data_type + ', ' + xls.replace(/ /g, '%20');
            a.download = 'Relatorio Propostas.xls'
            a.click()

            setLoading(false)

        } catch (error) {
            console.log(error);
        }
    }

    return <>
        <Sidebar></Sidebar>
        <section className='section-entrevistas-realizadas-container'>
            <div className='entrevistas-realizadas-container'>
                <div className="title">
                    <h3>Entrevistas Realizadas</h3>
                </div>
                {
                    loading ? (
                        <CircularProgress style={{ position: 'absolute', top: '50%', left: '49%' }} />
                    ) : null
                }
                <Box display='flex' justifyContent='space-between' m={2}>
                    <Box display='flex'>
                        <TextField id="proposta" label="proposta, nome ou cpf" variant="standard" onChange={e => {
                            setPesquisa(e.target.value)
                        }} />
                        <Button onClick={buscarEntrevistas} variant='contained'>Buscar</Button>
                    </Box>
                    <Button variant="contained" onClick={gerarRelatorio}>Relatório</Button>
                </Box>
                <TableContainer className="entrevistas-realizadas">
                    <Table className='table'>
                        <TableHead className='table-header'>
                            <TableRow>
                                <TableCell>Proposta</TableCell>
                                <TableCell>Data Entrevista</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell>CPF</TableCell>
                                <TableCell>Idade</TableCell>
                                <TableCell>Sexo</TableCell>
                                <TableCell>Editar</TableCell>
                                <TableCell>PDF</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                entrevistas.map(e => {
                                    return (
                                        <TableRow key={e._id}>
                                            <TableCell>{e.proposta}</TableCell>
                                            <TableCell>{moment(e.dataEntrevista).format('DD/MM/YYYY')}</TableCell>
                                            <TableCell>{e.nome}</TableCell>
                                            <TableCell>{e.cpf}</TableCell>
                                            <TableCell>{e.idade}</TableCell>
                                            <TableCell>
                                                <select onChange={item => alterarSexo(e._id, item.target.value)} >
                                                    <option value="M" selected={e.sexo === 'M'}>M</option>
                                                    <option value="F" selected={e.sexo === 'F'} >F</option>
                                                </select>
                                            </TableCell>
                                            <TableCell><Button variant='contained' href={`/entrevistas/propostas/editar/${e._id}`} size='small' >Editar</Button>  </TableCell>
                                            <TableCell><Button color='error' variant='contained' size='small' onClick={() => { gerarPdf(e.proposta, e.nome) }}>PDF</Button></TableCell>
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
}

export default EntrevistasRealizadas