import React, { useEffect, useState } from 'react'
import Sidebar from '../../../../components/Sidebar/Sidebar'
import Axios from 'axios'
import moment from 'moment/moment'
import { Box, CircularProgress, TableContainer, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Modal, FormControl, Select, MenuItem, InputLabel, Chip, Pagination, Container } from '@mui/material'
import RelatorioPadraoTele from '../../../../components/RelatorioPadraoTele/RelatorioPadraoTele'
import ModalUploadImplantacao from './Modais/ModalUploadImplantacao'
import { filtrarImplantadas, getSituacoesAmil, getTiposContrato, naoImplantadas } from '../../../../_services/teleEntrevista.service'
import Title from '../../../../components/Title/Title'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '5px',
    p: 4,
};

const Implantacao = () => {

    const [flushHook, setFlushHook] = useState(false)
    const [propostas, setPropostas] = useState([])
    const [loading, setLoading] = useState(false)
    const [tiposContrato, setTiposContrato] = useState([])
    const [tipoContrato, setTipoContrato] = useState('Todos')
    const [situacoesAmil, setSituacoesAmil] = useState([])
    const [situacaoAmil, setSituacaoAmil] = useState('Todos')

    const [modalImplantar, setModalImplantar] = useState(false)
    const [proposta, setProposta] = useState('')
    const [nome, setNome] = useState('')
    const [id, setId] = useState('')

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [totalPages, setTotalPages] = useState(1)

    const implantar = async (id) => {
        try {

            await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/implantar`, {
                id
            }, {
                withCredentials: true,
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            setModalImplantar(false)

            if (situacaoAmil !== 'Todos') {
                filtrarPorSituacao()
            } else {
                buscarPropostas()
            }

        } catch (error) {
            console.log(error);
        }
    }

    const buscarPropostas = async () => {
        try {
            setLoading(true)
            const result = await naoImplantadas(
                page,
                limit,
            )
            setPropostas(result.result)
            setTotalPages(result.total)

            const getSituacaoAmil = await getSituacoesAmil()
            setSituacoesAmil(getSituacaoAmil)

            const getTipoContrato = await getTiposContrato()
            setTiposContrato(getTipoContrato)

            // const arrAuxTiposContrato = [...new Set(result.data.map(obj => obj.tipoContrato))]
            // const arrAuxSituacoesAmil = [...new Set(result.data.map(obj => obj.situacaoAmil))]

            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const relatorio = () => {
        try {
            RelatorioPadraoTele(propostas, 'Relatorio implantacao')
        } catch (error) {
            console.log(error);
        }
    }

    const filtrarPorSituacao = async () => {
        try {
            setLoading(true)
            const result = await filtrarImplantadas(
                page,
                limit,
                situacaoAmil,
                tipoContrato
            )
            setPropostas(result.filter)
            setTotalPages(result.total)
            setLoading(false)
            console.log(result);
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    useEffect(() => {
        setFlushHook(false)
        buscarPropostas(page)
    }, [flushHook, page, limit])

    return (
        <>
            <Sidebar>
                <Container maxWidth>
                    <Title size={'medium'}>Implantação</Title>
                    {
                        loading ? (
                            <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%' }} />
                        ) : null
                    }
                    <Box mt={2} >
                        <Box>
                            <Button onClick={relatorio} variant='contained'>Relatório</Button>
                            <ModalUploadImplantacao setFlushHook={setFlushHook} />
                        </Box>
                        <Box mt={2} display='flex'>
                            <FormControl style={{ width: '150px' }} size='small'>
                                <InputLabel>Contrato</InputLabel>
                                <Select
                                    label='Contrato'
                                    value={tipoContrato}
                                    onChange={e => {
                                        setTipoContrato(e.target.value)
                                    }}
                                >
                                    <MenuItem>
                                        <em>Contrato</em>
                                    </MenuItem>
                                    <MenuItem value='Todos'>
                                        Todos
                                    </MenuItem>
                                    {
                                        tiposContrato.map(contrato => {
                                            return (
                                                <MenuItem value={contrato}>
                                                    {contrato}
                                                </MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                            <Button style={{ marginLeft: '15px' }} variant='contained' onClick={buscarPropostas}>Filtrar</Button>
                            <FormControl style={{ width: '150px', marginLeft: '20px' }} size='small'>
                                <InputLabel>Situações Amil</InputLabel>
                                <Select
                                    label='Situações Amil'
                                    value={situacaoAmil}
                                    onChange={e => {
                                        setSituacaoAmil(e.target.value)
                                    }}
                                >
                                    <MenuItem>
                                        <em>Situação Amil</em>
                                    </MenuItem>
                                    <MenuItem value='Todos'>
                                        Todos
                                    </MenuItem>
                                    {
                                        situacoesAmil.map(item => {
                                            return (
                                                <MenuItem value={item}>
                                                    {item}
                                                </MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                            <Button style={{ marginLeft: '15px' }} variant='contained' onClick={filtrarPorSituacao}>Filtrar</Button>
                        </Box>
                    </Box>
                    <TableContainer>
                        <Box display={'flex'} justifyContent={'space-between'} sx={{ mb: 2, mt: 2 }}>
                            <Chip label={`Quantidade de Pedidos: ${totalPages}`} color='warning' sx={{ fontSize: '15px' }} />
                        </Box>
                        <Box display={'flex'} justifyContent={'space-between'} sx={{ mb: 2, mt: 2 }}>
                            <FormControl size="small" disabled={loading}>
                                <InputLabel>Linhas</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Linhas"
                                    sx={{ width: '100px', borderRadius: '10px' }}
                                    value={limit}
                                    onChange={(e) => setLimit(e.target.value)}
                                >
                                    <MenuItem value={10} >10</MenuItem>
                                    <MenuItem value={20} >20</MenuItem>
                                    <MenuItem value={30} >30</MenuItem>
                                    <MenuItem value={40} >40</MenuItem>
                                    <MenuItem value={50} >50</MenuItem>
                                    <MenuItem value={100} >100</MenuItem>
                                </Select>
                            </FormControl>
                            <Pagination count={
                                totalPages % limit === 0 ?
                                    Math.floor(totalPages / limit) :
                                    Math.floor(totalPages / limit) + 1
                            } page={page} onChange={(e, value) => setPage(value)} disabled={loading} />
                        </Box>
                        <Table className='table'>
                            <TableHead className='table-header'>
                                <TableRow>
                                    <TableCell>Vigência</TableCell>
                                    <TableCell>Proposta</TableCell>
                                    <TableCell>Nome</TableCell>
                                    <TableCell>Situação</TableCell>
                                    <TableCell>Tipo Contrato</TableCell>
                                    <TableCell>Houve Divergencia</TableCell>
                                    <TableCell>Cids</TableCell>
                                    <TableCell>Divergência</TableCell>
                                    <TableCell>Concluir</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    propostas.map(e => {
                                        return (
                                            <TableRow key={e._id}>
                                                <TableCell>{moment(e.vigencia).format('DD/MM/YYYY')}</TableCell>
                                                <TableCell>{e.proposta}</TableCell>
                                                <TableCell>{e.nome}</TableCell>
                                                <TableCell>{e.situacaoAmil}</TableCell>
                                                <TableCell>{e.tipoContrato}</TableCell>
                                                <TableCell>{e.houveDivergencia}</TableCell>
                                                <TableCell>{e.cids}</TableCell>
                                                <TableCell>{e.divergencia}</TableCell>
                                                <TableCell><Button onClick={() => {
                                                    setModalImplantar(true)
                                                    setProposta(e.proposta)
                                                    setNome(e.nome)
                                                    setId(e._id)
                                                }} color='success' variant='contained' size='small'>Concluir</Button></TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Modal
                        open={modalImplantar}
                        onClose={() => { setModalImplantar(false) }}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Deseja mandar para implantação?
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Proposta: {proposta} - Nome: {nome}
                            </Typography>
                            <Box mt={2} display='flex' justifyContent='space-around'>
                                <Button variant="contained" color='inherit' onClick={() => { setModalImplantar(false) }}>Fechar</Button>
                                <Button variant="contained" color="success" onClick={() => {
                                    implantar(id)
                                }}>Implantar</Button>
                            </Box>
                        </Box>
                    </Modal>
                </Container>
            </Sidebar>
        </>
    )
}

export default Implantacao