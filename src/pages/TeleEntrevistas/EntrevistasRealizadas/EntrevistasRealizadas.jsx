import React, { useState } from 'react'
import Sidebar from '../../../components/Sidebar/Sidebar'
import Axios from 'axios'
import { CircularProgress, Button, TextField, Box, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Modal, Typography, Container } from '@mui/material'
import moment from 'moment'
import gerarPdf from '../Pdf/Pdf'
import ModalEntrevistasRealizadas from './ModalEntrevistasRealizadas'
import { getDadosEntrevistaByDetails } from '../../../_services/teleEntrevistaV2.service'
import Linha from './components/Linha'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const EntrevistasRealizadas = () => {

    const [entrevistas, setEntrevistas] = useState([])
    const [pesquisa, setPesquisa] = useState('');
    const [loading, setLoading] = useState(false)
    const [modalVoltar, setModalVoltar] = useState(false)
    const [id, setId] = useState('')
    const [nome, setNome] = useState('')
    const [proposta, setpProposta] = useState('')

    const alterarSexo = async (id, sexo) => {
        try {

            await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/realizadas/alterarSexo`, {
                id, sexo
            }, {
                withCredentials: true,
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
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
            const result = await getDadosEntrevistaByDetails(pesquisa)
            setLoading(false)
            setEntrevistas(result)
        } catch (error) {
            console.log(error);
        }
    }

    const voltarEntrevista = async () => {
        try {

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/voltar`, {
                id
            }, {
                withCredentials: true,
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (result.status === 200) {
                window.location.reload()
            }

        } catch (error) {
            console.log(error);
        }
    }

    const gerarRelatorio = async () => {
        try {
            setLoading(true)

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/dadosEntrevista`, {
                withCredentials: true,
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            //console.log(dataInicio, dataFim);

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
            xls += "<th>Data Recebimento</th>"
            xls += "<th>Entrevista qualidade</th>"
            xls += "<th>Cids</th>"
            xls += "</tr></thead><tbody>"

            result.data.entrevistas.forEach(e => {
                xls += "<tr>"
                xls += `<td>${e._id}</td>`
                xls += `<td>${e.idProposta.proposta || ''}</td>`
                xls += `<td>${e.idProposta.tipoContrato || ''}</td>`
                xls += `<td>${e.dataEntrevista || ''}</td>`
                xls += `<td>${e.idProposta.nome || ''}</td>`
                xls += `<td>${e.idProposta.cpf || ''}</td>`
                xls += `<td>${e.idProposta.dataNascimento || ''}</td>`
                xls += `<td>${e.idProposta.idade || ''}</td>`
                xls += `<td>${e.idProposta.responsavel || ''}</td>`
                xls += `<td>${e.houveDivergencia || ''}</td>`
                xls += `<td>${e.divergencia ? e.divergencia : ''}</td>`
                xls += `<td>${moment(e.idProposta.dataRecebimento).format('DD/MM/YYYY')}</td>`
                xls += `<td>${e.entrevistaQualidade ? 'Sim' : ''}</td>`
                // xls += `<td>${e.cids}</td>`
                if (e.cids) {
                    const arrCids = e.codigosCids.split('-')
                    arrCids.forEach(cid => {
                        xls += `<td>${cid}</td>`
                    })
                } else {
                    xls += `<td></td>`
                }
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

    const entrevistasQualidade = async () => {
        try {

            setLoading(true)

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/qualidade`, {
                withCredentials: true,
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            setEntrevistas(result.data)

            setLoading(false)

        } catch (error) {
            console.log(error);
        }
    }

    return (<>
        <Sidebar>
            <Container className='scrollable'>
                <Box m={2}>
                    <Typography variant='h6'>
                        Entrevistas Realizadas
                    </Typography>
                    {
                        loading ? (
                            <CircularProgress style={{ position: 'absolute', top: '50%', left: '49%' }} />
                        ) : null
                    }
                    <Box display='flex' justifyContent='space-between' m={2}>
                        <Box display='flex'>
                            <TextField id="proposta" size='small' label="proposta, nome ou cpf" variant="standard" onChange={e => {
                                setPesquisa(e.target.value)
                            }} />
                            <Button type='submit' onClick={buscarEntrevistas} size='small' variant='contained'>Buscar</Button>
                            <Button variant='contained' onClick={entrevistasQualidade} color='info' size='small' style={{ marginLeft: '20px' }} >Filtrar entrevistas de qualidade</Button>
                        </Box>
                        <Box display='flex'>
                            {/* <TextField type='date' label='Data Inicio' focused size='small' onChange={e => setDataInicio(e.target.value)} />
                        <TextField type='date' label='Data Fim' focused size='small' onChange={e => setDataFim(e.target.value)} /> */}
                            {/* <Button style={{ marginLeft: '4px' }} color='secondary' size='small' variant="contained" onClick={gerarRelatorioMensal}>Relatório Mensal</Button> */}
                            <ModalEntrevistasRealizadas />

                            <Button style={{ marginLeft: '4px' }} size='small' variant="contained" onClick={gerarRelatorio}>Relatório</Button>
                        </Box>
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
                                    <TableCell>Voltar</TableCell>
                                    <TableCell>Editar</TableCell>
                                    <TableCell>PDF</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    entrevistas.map(e => {
                                        return (
                                            <Linha
                                                key={e._id}
                                                entrevista={e}
                                            />
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>

                    </TableContainer>
                    <Modal
                        open={modalVoltar}
                        onClose={() => { setModalVoltar(false) }}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Deseja voltar a proposta: {proposta} do beneficiário: {nome}
                            </Typography>
                            <Box m={2} display='flex' justifyContent='space-around'>
                                <Button variant='contained' onClick={voltarEntrevista}>Sim</Button>
                                <Button variant='contained' color='inherit'>Não</Button>
                            </Box>
                        </Box>
                    </Modal>
                </Box>
            </Container>
        </Sidebar>
    </>)
}

export default EntrevistasRealizadas