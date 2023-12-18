import React, { useEffect, useState } from "react";
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Modal, Box, Typography, InputLabel, MenuItem, FormControl, Select, Snackbar, Alert, Tooltip, Chip, Pagination, IconButton } from "@mui/material";
import { alterarSexoEntrevista, alterarTelefoneEntrevista, alterarVigenciaProposta, cancelarEntrevista, excluirPropostaEntrevista, tentativaContatoEntrevista } from "../../_services/teleEntrevista.service";
import { FaWpforms, FaTrash } from 'react-icons/fa'
import { TiCancel } from 'react-icons/ti'
import { BsFillTelephoneFill } from 'react-icons/bs'
import ModalChangeWhatsapp from "./modais/ModalChangeWhatsapp";
import { MdPublishedWithChanges } from 'react-icons/md'
import { paginacaoAgenda } from "../../_services/teleEntrevistaExterna.service";

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

const TabelaAgendarCopy = ({ atualizarTabela }) => {

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [propostas, setPropostas] = useState([])
    const [pesquisa, setPesquisa] = useState('')

    const [modalCancelar, setModalCancelar] = useState(false);
    const [modalExcluir, setModalExcluir] = useState(false);

    const [propostaCancelar, setPropostaCancelar] = useState('');
    const [beneficiarioCancelar, setBeneficiarioCancelar] = useState('')
    const [motivoCancelar, setMotivoCancelar] = useState('Sem Sucesso de Contato!')
    const [idCancelar, setIdCancelar] = useState('')
    const [loadingCancelar, setLoadingCancelar] = useState(false)

    const [propostaExcluir, setPropostaExcluir] = useState('');
    const [beneficiarioExcluir, setBeneficiarioExcluir] = useState('')
    const [idExcluir, setIdCExcluir] = useState('')

    const [loading, setLoading] = useState(false)
    const [openSnack, setOpenSnack] = useState(false)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

    const cancelar = async () => {
        try {
            setLoadingCancelar(true)
            await cancelarEntrevista({ id: idCancelar, motivoCancelamento: motivoCancelar })
            setLoadingCancelar(false)
            setModalCancelar(false)
            fetchPropostas(page)
        } catch (error) {
            console.log(error);
            setLoadingCancelar(false)
        }
    }

    const excluir = async () => {
        try {
            setLoadingCancelar(true)
            await excluirPropostaEntrevista(idExcluir)
            setLoadingCancelar(false)
            setModalExcluir(false)
            fetchPropostas(page)
        } catch (error) {
            console.log(error);
            setLoadingCancelar(false)
        }
    }

    const alterarVigencia = async (vigencia, id) => {
        try {
            setLoading(true)
            await alterarVigenciaProposta({ id, vigencia })
            setOpenSnack(true)
            setLoading(false)

        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const alterarTelefone = async (telefone, id) => {
        try {
            await alterarTelefoneEntrevista({ id, telefone })
        } catch (error) {
            console.log(error);
        }
    }

    const alterarSexo = async (id, sexo) => {
        try {
            setLoading(true)
            await alterarSexoEntrevista(id, sexo)
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    const tentativaContato = async (tentativa, id) => {
        try {
            setLoading(true)
            await tentativaContatoEntrevista({ tentativa, id })
            fetchPropostas()
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    const handlePageChange = (event, value) => {
        setPage(value);
        fetchPropostas(value)
    }

    const fetchPropostas = async (Page) => {
        try {
            setLoading(true)
            console.log('chamou')
            const result = await paginacaoAgenda({ page: Page, limit: 70 })
            console.log('terminou');
            setPropostas(result.result)
            setTotalPages(result.total)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const searchPropostas = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const result = await paginacaoAgenda({ page: 1, limit: 70, pesquisa })
            setPropostas(result.result)
            setTotalPages(result.total)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPropostas(page)
    }, [])

    return (
        <Box
            sx={{
                width: '100%',
                margin: '0 auto',
                marginTop: '1rem',
                marginBottom: '1rem',
                padding: '1rem',
                overflowX: 'auto',
                position: 'relative'
            }}
        >
            <Typography variant='h6' width='100%'>
                Tele: {totalPages}
            </Typography>
            <Box>
                <form
                    onSubmit={searchPropostas}
                    style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: '10px' }}
                >
                    <TextField
                        size="small"
                        variant="standard"
                        placeholder="Pesquisar"
                        onChange={e => setPesquisa(e.target.value)}
                        value={pesquisa}
                        style={{ marginRight: '10px' }}
                    />
                    <Button type="submit" variant='contained' onClick={searchPropostas}>Pesquisar</Button>
                </form>
            </Box>
            <Box display={'flex'} justifyContent={'flex-end'}>
                <Pagination count={Math.ceil(totalPages / 70)} page={page} onChange={handlePageChange} />
            </Box>
            <TableContainer >
                {
                    loading ? (
                        <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%' }} />
                    ) : null
                }
                <Table
                    size="small"
                    style={{ display: 'block', overflowX: 'auto', whiteSpace: 'nowrap' }}
                    sx={{ minWidth: 500 }}
                    aria-label="custom pagination table"
                >
                    <TableHead
                        sx={{
                            '& .MuiTableCell-root': {
                                background: '#3f51b5',
                                color: 'white',
                                fontWeight: 'bold'
                            }
                        }}

                    >
                        <TableRow>
                            <TableCell>Vigência</TableCell>
                            <TableCell>Proposta</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Data Nascimento</TableCell>
                            <TableCell>Sexo</TableCell>
                            <TableCell>Telefone</TableCell>
                            <TableCell>Cancelar</TableCell>
                            <TableCell>Excluir</TableCell>
                            <TableCell>Formulario</TableCell>
                            <TableCell>Contato 1</TableCell>
                            <TableCell>Contato 2</TableCell>
                            <TableCell>Contato 3</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {propostas.map((row) => {

                            const conditionPf = row.tipoContrato.indexOf('PF') !== -1 || row.tipoContrato.indexOf('pf') !== -1

                            if (row.proposta === '19403306') {
                                console.log(row);
                            }

                            return (
                                <TableRow key={row._id} style={{ background: conditionPf ? '#e6ee9c' : '' }} >
                                    <TableCell padding="none" scope="row">
                                        <input size="small" variant="standard" type='date' defaultValue={row.vigencia} />
                                        <Tooltip title='Alterar vigência'>
                                            <IconButton style={{ marginLeft: '10px' }} color='warning' variant='contained' onClick={
                                                item => {
                                                    alterarVigencia(item.target.parentElement.firstChild.firstChild.firstChild.value, row._id)
                                                }
                                            }><MdPublishedWithChanges /></IconButton>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.proposta}
                                        {
                                            row.retrocedido && (
                                                <Chip sx={{ ml: '2px' }} variant="outlined" label='ret' color="secondary" />
                                            )
                                        }
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.nome}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.dataNascimento}
                                    </TableCell>
                                    <TableCell>
                                        <select onChange={item => alterarSexo(row._id, item.target.value)} >
                                            <option value="M" selected={row.sexo === 'M'}>M</option>
                                            <option value="F" selected={row.sexo === 'F'} >F</option>
                                        </select>
                                    </TableCell>
                                    <TableCell>
                                        <input style={{ minWidth: '200px' }} size="small" variant="standard" type='tel' defaultValue={row.telefone} onKeyUp={element => alterarTelefone(element.target.value, row._id)} />
                                        <ModalChangeWhatsapp whatsapp={row.whatsapp} _id={row._id} whatsappsAnteriores={row.whatsappsAnteriores} />
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title='Cancelar'>
                                            <IconButton variant="contained" onClick={() => {
                                                setPropostaCancelar(row.proposta)
                                                setBeneficiarioCancelar(row.nome)
                                                setIdCancelar(row._id)
                                                setModalCancelar(true)
                                            }} color="error">
                                                <TiCancel />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title='Excluir'>
                                            <IconButton variant="contained" onClick={() => {
                                                setPropostaExcluir(row.proposta)
                                                setBeneficiarioExcluir(row.nome)
                                                setIdCExcluir(row._id)
                                                setModalExcluir(true)
                                            }} color="error">
                                                <FaTrash />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title='Formulario'>
                                            <IconButton variant="contained" href={`/entrevistas/formulario/${row._id}`} >
                                                <FaWpforms />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>
                                        {
                                            row.contato1 ? (
                                                <span>{row.contato1}</span>
                                            ) : (
                                                <IconButton variant='contained' size="small" onClick={() => {
                                                    tentativaContato('tentativa 1', row._id)
                                                }}>1° <BsFillTelephoneFill /></IconButton>
                                            )
                                        }

                                    </TableCell>
                                    <TableCell>
                                        {
                                            row.contato2 === undefined && row.contato1 !== undefined ? (
                                                <IconButton variant='contained' size="small" onClick={() => { tentativaContato('tentativa 2', row._id) }} >2° <BsFillTelephoneFill /></IconButton>
                                            ) : (
                                                <span>{row.contato2}</span>
                                            )
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {
                                            row.contato3 === undefined & row.contato2 !== undefined ? (
                                                <IconButton variant='contained' size="small" onClick={() => { tentativaContato('tentativa 3', row._id) }} >3° <BsFillTelephoneFill /></IconButton>
                                            ) : (
                                                <span>{row.contato3}</span>
                                            )
                                        }
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer >
            <Modal
                open={modalExcluir}
                onClose={() => setModalExcluir(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                        <Typography variant="h6" component="div">
                            Deseja *EXCLUIR* a proposta: {propostaExcluir}
                        </Typography>
                        <Typography variant="h7" component="div" margin='10px'>
                            Do beneficiario: {beneficiarioExcluir}
                        </Typography>
                        <Typography variant="body2" display='flex' justifyContent='space-around' width='100%' margin='1rem'>
                            <Button variant='contained' onClick={() => setModalExcluir(false)}>Fechar</Button>
                            <Button color="error" variant='contained' onClick={excluir} disabled={loadingCancelar}>Excluir {loadingCancelar ? <CircularProgress style={{ width: '15px', height: '15px', marginLeft: '10px', color: 'red' }} /> : null}</Button>
                        </Typography>
                    </Box>
                </Box>
            </Modal>
            <Modal
                open={modalCancelar}
                onClose={() => setModalCancelar(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                        <Typography variant="h6" component="div">
                            Deseja Cancelar a proposta: {propostaCancelar}
                        </Typography>
                        <Typography variant="h7" component="div" margin='10px' marginBottom='30px'>
                            Do beneficiario: {beneficiarioCancelar}
                        </Typography>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Motivo cancelamento</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Motivo cancelamento"
                                size="small"
                                onChange={e => {
                                    console.log(e.target.value);
                                    setMotivoCancelar(e.target.value)
                                }}
                            >
                                <MenuItem value='Sem Sucesso de Contato!'>Sem Sucesso de Contato!</MenuItem>
                                <MenuItem value='Beneficiario Solicitou o Cancelamento'>Beneficiario Solicitou o Cancelamento</MenuItem>
                            </Select>
                        </FormControl>
                        <Typography variant="body2" display='flex' justifyContent='space-around' width='100%' margin='1rem'>
                            <Button variant='contained' onClick={() => setModalCancelar(false)}>Fechar</Button>
                            <Button color="error" variant='contained' onClick={cancelar} disabled={loadingCancelar}>Cancelar {loadingCancelar ? <CircularProgress style={{ width: '15px', height: '15px', marginLeft: '10px', color: 'red' }} /> : null}</Button>
                        </Typography>
                    </Box>
                </Box>
            </Modal>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} variant="filled" severity="success">
                    Vigencia alterada com sucesso
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default TabelaAgendarCopy