import React, { useEffect, useState } from 'react'
import Sidebar from '../../../../components/Sidebar/Sidebar'
import Axios from 'axios'
import moment from 'moment/moment'
import { Box, CircularProgress, TableContainer, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Modal, FormControl, Select, MenuItem, InputLabel } from '@mui/material'
import RelatorioPadraoTele from '../../../../components/RelatorioPadraoTele/RelatorioPadraoTele'
import ModalUploadImplantacao from './Modais/ModalUploadImplantacao'

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

    const implantar = async (id) => {
        try {

            await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/implantar`, {
                id
            }, {
                withCredentials: true
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

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/naoImplantadas`, { withCredentials: true })

            if (tipoContrato === 'Todos') {
                setPropostas(result.data)
            } else {
                const arrAux = result.data.filter(proposta => {
                    return proposta.tipoContrato === tipoContrato
                })
                setPropostas(arrAux)
            }

            const arrAuxTiposContrato = [...new Set(result.data.map(obj => obj.tipoContrato))]
            const arrAuxSituacoesAmil = [...new Set(result.data.map(obj => obj.situacaoAmil))]

            setTiposContrato(arrAuxTiposContrato)
            setSituacoesAmil(arrAuxSituacoesAmil)
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

        setLoading(true)

        const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/naoImplantadas`, { withCredentials: true })

        if (situacaoAmil === 'Todos') {
            setPropostas(result.data)
        } else {
            const arrAux = result.data.filter(proposta => {
                return proposta.situacaoAmil === situacaoAmil
            })
            setPropostas(arrAux)
        }

        setLoading(false)
    }

    useEffect(() => {
        setFlushHook(false)
        buscarPropostas()
    }, [flushHook])

    return (
        <>
            <Sidebar />
            <Box>
                <Typography m={2} variant='h5'>
                    Implantação: {propostas.length}
                </Typography>
                {
                    loading ? (
                        <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%' }} />
                    ) : null
                }
                <Box m={2} >
                    <Box>
                        <Button onClick={relatorio} variant='contained'>Relatório</Button>
                        <ModalUploadImplantacao setFlushHook={setFlushHook} />
                    </Box>
                    <Box m={2} display='flex'>
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
            </Box>
        </>
    )
}

export default Implantacao