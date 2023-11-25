import React, { useState } from "react";
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Modal, Box, Typography, InputLabel, MenuItem, FormControl, Select, TablePagination, TableFooter, IconButton, Snackbar, Alert, Tooltip, Chip } from "@mui/material";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { alterarSexoEntrevista, alterarTelefoneEntrevista, alterarVigenciaProposta, cancelarEntrevista, excluirPropostaEntrevista, tentativaContatoEntrevista } from "../../_services/teleEntrevista.service";
import { FaWpforms, FaTrash } from 'react-icons/fa'
import { TiCancel } from 'react-icons/ti'
import { BsFillTelephoneFill } from 'react-icons/bs'
import ModalChangeWhatsapp from "./modais/ModalChangeWhatsapp";
import { MdPublishedWithChanges } from 'react-icons/md'

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

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const TabelaAgendarTele = ({ propostas, atualizarTabela }) => {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - propostas.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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
            atualizarTabela()
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
            atualizarTabela()
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
            atualizarTabela()
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Typography variant='h4' width='100%'>
                Tele: {propostas.length}
            </Typography>
            <TableContainer>
                {
                    loading ? (
                        <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%' }} />
                    ) : null
                }
                <Table size="small" style={{ display: 'block', overflowX: 'auto', whiteSpace: 'nowrap' }} sx={{ minWidth: 500 }} aria-label="custom pagination table" className="table">
                    <TableHead className="table-header">
                        <TableRow>
                            <TableCell padding="none">Vigência</TableCell>
                            <TableCell padding="none">Proposta</TableCell>
                            <TableCell padding="none">Nome</TableCell>
                            <TableCell padding="none">Data Nascimento</TableCell>
                            <TableCell padding="none">Sexo</TableCell>
                            <TableCell padding="none">Telefone</TableCell>
                            <TableCell padding="none">Cancelar</TableCell>
                            <TableCell padding="none">Excluir</TableCell>
                            <TableCell padding="none">Formulario</TableCell>
                            <TableCell padding="none">Contato 1</TableCell>
                            <TableCell padding="none">Contato 2</TableCell>
                            <TableCell padding="none">Contato 3</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? propostas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : propostas
                        ).map((row) => {

                            const conditionPf = row.tipoContrato.indexOf('PF') !== -1 || row.tipoContrato.indexOf('pf') !== -1

                            if (row.proposta === '19403306') {
                                console.log(row);
                            }

                            return (
                                <TableRow key={row._id} style={{ background: conditionPf ? '#e6ee9c' : '' }} >
                                    <TableCell padding="none" scope="row">
                                        <TextField size="small" variant="standard" type='date' defaultValue={row.vigencia} />
                                        <Tooltip title='Alterar vigência'>
                                            <Button style={{ marginLeft: '10px' }} color='warning' variant='contained' onClick={
                                                item => {
                                                    alterarVigencia(item.target.parentElement.firstChild.firstChild.firstChild.value, row._id)
                                                }
                                            }><MdPublishedWithChanges /></Button>
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
                                        <TextField style={{ minWidth: '200px' }} size="small" variant="standard" type='tel' defaultValue={row.telefone} onKeyUp={element => alterarTelefone(element.target.value, row._id)} />
                                        <ModalChangeWhatsapp whatsapp={row.whatsapp} _id={row._id} whatsappsAnteriores={row.whatsappsAnteriores} />
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title='Cancelar'>
                                            <Button variant="contained" onClick={() => {
                                                setPropostaCancelar(row.proposta)
                                                setBeneficiarioCancelar(row.nome)
                                                setIdCancelar(row._id)
                                                setModalCancelar(true)
                                            }} color="error">
                                                <TiCancel />
                                            </Button>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title='Excluir'>
                                            <Button variant="contained" onClick={() => {
                                                setPropostaExcluir(row.proposta)
                                                setBeneficiarioExcluir(row.nome)
                                                setIdCExcluir(row._id)
                                                setModalExcluir(true)
                                            }} color="error">
                                                <FaTrash />
                                            </Button>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title='Formulario'>
                                            <Button variant="contained" href={`/entrevistas/formulario/${row._id}`} >
                                                <FaWpforms />
                                            </Button>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>
                                        {
                                            row.contato1 ? (
                                                <span>{row.contato1}</span>
                                            ) : (
                                                <Button variant='contained' size="small" onClick={() => {
                                                    tentativaContato('tentativa 1', row._id)
                                                }} style={{ background: 'blue' }}>1° <BsFillTelephoneFill /></Button>
                                            )
                                        }

                                    </TableCell>
                                    <TableCell>
                                        {
                                            row.contato2 === undefined && row.contato1 !== undefined ? (
                                                <Button variant='contained' size="small" onClick={() => { tentativaContato('tentativa 2', row._id) }} style={{ background: 'blue' }}>2° <BsFillTelephoneFill /></Button>
                                            ) : (
                                                <span>{row.contato2}</span>
                                            )
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {
                                            row.contato3 === undefined & row.contato2 !== undefined ? (
                                                <Button variant='contained' size="small" onClick={() => { tentativaContato('tentativa 3', row._id) }} style={{ background: 'blue' }}>3° <BsFillTelephoneFill /></Button>
                                            ) : (
                                                <span>{row.contato3}</span>
                                            )
                                        }
                                    </TableCell>
                                </TableRow>
                            )
                        })}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                                colSpan={3}
                                count={propostas.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                labelRowsPerPage='Linhas por página'
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'Linhas por página',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
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
        </>
    )
}

export default TabelaAgendarTele