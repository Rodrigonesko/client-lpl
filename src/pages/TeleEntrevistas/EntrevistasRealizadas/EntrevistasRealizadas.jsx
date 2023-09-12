import React, { useState } from 'react'
import Sidebar from '../../../components/Sidebar/Sidebar'
import Axios from 'axios'
import { CircularProgress, Button, TextField, Box, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Modal, Typography, Container } from '@mui/material'
import moment from 'moment'
import gerarPdf from '../Pdf/Pdf'
import ModalEntrevistasRealizadas from './ModalEntrevistasRealizadas'
//import Pdf2 from '../Pdf/Pdf2'

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

    //const formRef = useRef(null)

    const [entrevistas, setEntrevistas] = useState([])
    const [pesquisa, setPesquisa] = useState('');
    const [loading, setLoading] = useState(false)
    const [modalVoltar, setModalVoltar] = useState(false)
    const [id, setId] = useState('')
    const [nome, setNome] = useState('')
    const [proposta, setpProposta] = useState('')
    const [dataInicio, setDataInicio] = useState('')
    const [dataFim, setDataFim] = useState('')
    // const [pdf, setPdf] = useState(false)

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

    const voltarEntrevista = async () => {
        try {

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/voltar`, {
                id
            }, {
                withCredentials: true
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

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/dadosEntrevista`, { withCredentials: true })

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
                xls += `<td>${e.proposta || ''}</td>`
                xls += `<td>${e.tipoContrato || ''}</td>`
                xls += `<td>${e.dataEntrevista || ''}</td>`
                xls += `<td>${e.nome || ''}</td>`
                xls += `<td>${e.cpf || ''}</td>`
                xls += `<td>${e.dataNascimento || ''}</td>`
                xls += `<td>${e.idade || ''}</td>`
                xls += `<td>${e.responsavel || ''}</td>`
                xls += `<td>${e.houveDivergencia || ''}</td>`
                xls += `<td>${e.divergencia ? e.divergencia : ''}</td>`
                xls += `<td>${moment(e.dataRecebimento).format('DD/MM/YYYY')}</td>`
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

    const gerarRelatorioMensal = async () => {
        try {
            setLoading(true)

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/dadosEntrevista`, { withCredentials: true })

            //console.log(dataInicio, dataFim);

            let xls = '\ufeff'
            xls += "<table border='1'>"
            xls += "<thead><tr>"
            xls += "<th>Id</th>"
            xls += "<th>Ano Ref</th>"
            xls += "<th>Mês Ref</th>"
            xls += "<th>Data Conclusão</th>"
            xls += "<th>Porte</th>"
            xls += "<th>Proposta</th>"
            xls += "<th>Nome</th>"
            xls += "<th>CPF</th>"
            xls += "<th>Idade</th>"
            xls += "<th>UF</th>"
            xls += "<th>Status Final</th>"
            xls += "<th>Divergência DS</th>"
            xls += "<th>Observações</th>"
            xls += "<th>Cids</th>"
            xls += "</tr></thead><tbody>"

            result.data.entrevistas.forEach(e => {
                xls += "<tr>"
                xls += `<td>${e._id}</td>`
                xls += `<td>${moment(e.dataEntrevista).format('YYYY')}</td>`
                xls += `<td>${moment(e.dataEntrevista).format('MM')}</td>`
                xls += `<td>${e.dataEntrevista || ''}</td>`
                xls += `<td>${e.tipoContrato || ''}</td>`
                xls += `<td>${e.proposta || ''}</td>`
                xls += `<td>${e.nome || ''}</td>`
                xls += `<td>${e.cpf || ''}</td>`
                xls += `<td>${e.idade || ''}</td>`
                xls += `<td>${e.filial || ''}</td>`
                xls += `<td>${e.cancelado ? 'INCIDÊNCIA' : 'ENTREVISTA DISPONIBILIZADA'}</td>`
                xls += `<td>${e.houveDivergencia}</td>`
                xls += `<td>${e.divergencia || ''}</td>`
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
                withCredentials: true
            })

            setEntrevistas(result.data)

            setLoading(false)

        } catch (error) {
            console.log(error);
        }
    }

    // const gerarPdf = () => {
    //     console.log(formRef.current);
    // }

    return (<>
        <Sidebar></Sidebar>
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
                                        <TableRow key={e._id} style={{ background: e.entrevistaQualidade ? 'lightgreen' : null }}>
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
                                            <TableCell>
                                                {
                                                    e.cancelado ? (
                                                        <Button variant='contained' size='small' onClick={() => {
                                                            setId(e._id)
                                                            setNome(e.nome)
                                                            setpProposta(e.proposta)
                                                            setModalVoltar(true)
                                                        }} >Voltar</Button>
                                                    ) : null
                                                }
                                            </TableCell>
                                            <TableCell><Button variant='contained' href={`/entrevistas/propostas/editar/${e._id}`} size='small' >Editar</Button>  </TableCell>
                                            {/* <TableCell><Button color='error' variant='contained' size='small' href={`/entrevistas/pdf2/${e.proposta}/${e.nome}`} target='_blank'>PDF</Button></TableCell> */}
                                            <TableCell><Button color='error' variant='contained' size='small' onClick={() => { gerarPdf(e.proposta, e.nome) }}>PDF</Button></TableCell>
                                        </TableRow>
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
    </>)
}

export default EntrevistasRealizadas