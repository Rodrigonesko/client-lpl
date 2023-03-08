import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Modal, Box, Typography, InputLabel, MenuItem, FormControl, Select, TablePagination, TableFooter, IconButton } from "@mui/material";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import PropTypes from 'prop-types';
import Axios from 'axios'
import { useTheme } from '@mui/material/styles';

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

    const [propostaExcluir, setPropostaExcluir] = useState('');
    const [beneficiarioExcluir, setBeneficiarioExcluir] = useState('')
    const [idExcluir, setIdCExcluir] = useState('')

    const cancelar = async () => {
        try {

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/cancelar`, { id: idCancelar, motivoCancelamento: motivoCancelar }, { withCredentials: true })

            console.log(result);

            if (result.status === 200) {
                window.location.reload()
            }

        } catch (error) {
            console.log(error);
        }
    }

    const excluir = async () => {
        try {
            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/proposta/excluir`, { id: idExcluir }, { withCredentials: true })

            if (result.status === 200) {
                window.location.reload()
            }

        } catch (error) {
            console.log(error);
        }
    }

    const alterarVigencia = async (vigencia, id) => {
        try {
            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/propostas/vigencia/update`, { id, vigencia }, { withCredentials: true })

            if (result.status === 200) {
                window.location.reload()
            }

        } catch (error) {
            console.log(error);
        }
    }

    const alterarTelefone = async (telefone, id) => {
        try {

            await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/alterarTelefone`, { id, telefone }, { withCredentials: true })

        } catch (error) {
            console.log(error);
        }
    }

    const alterarSexo = async (id, sexo) => {
        try {
            await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/proposta/alterarSexo`, {
                id,
                sexo
            }, {
                withCredentials: true
            })
        } catch (error) {
            console.log(error);
        }
    }

    const tentativaContato = async (tentativa, id) => {
        try {
            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/tentativaContato`, {
                tentativa,
                id
            }, {
                withCredentials: true
            })

            atualizarTabela()

            console.log(result);

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
                <Table style={{ display: 'block', overflowX: 'auto', whiteSpace: 'nowrap' }} sx={{ minWidth: 500 }} aria-label="custom pagination table" className="table">
                    <TableHead className="table-header">
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
                        {(rowsPerPage > 0
                            ? propostas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : propostas
                        ).map((row) => (
                            <TableRow key={row._id}>
                                <TableCell component="th" scope="row">
                                    <TextField size="small" variant="standard" type='date' defaultValue={row.vigencia} />
                                    <Button size="small" color='warning' variant='contained' onClick={
                                        item => {
                                            alterarVigencia(item.target.parentElement.firstChild.firstChild.firstChild.value, row._id)
                                        }
                                    }>Alterar</Button>
                                </TableCell>
                                <TableCell align="left">
                                    {row.proposta}
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
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={() => {
                                        setPropostaCancelar(row.proposta)
                                        setBeneficiarioCancelar(row.nome)
                                        setIdCancelar(row._id)
                                        setModalCancelar(true)
                                    }} color="error" size="small">
                                        Cancelar
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={() => {
                                        setPropostaExcluir(row.proposta)
                                        setBeneficiarioExcluir(row.nome)
                                        setIdCExcluir(row._id)
                                        setModalExcluir(true)
                                    }} color="error" size="small">
                                        Excluir
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" href={`/entrevistas/formulario/${row._id}`} >
                                        Formulario
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    {
                                        row.contato1 ? (
                                            <span>{row.contato1}</span>
                                        ) : (
                                            <Button variant='contained' size="small" onClick={() => {
                                                tentativaContato('tentativa 1', row._id)
                                            }} style={{ background: 'blue' }}>1° Contato</Button>
                                        )
                                    }

                                </TableCell>
                                <TableCell>
                                    {
                                        row.contato2 === undefined && row.contato1 !== undefined ? (
                                            <Button variant='contained' size="small" onClick={() => { tentativaContato('tentativa 2', row._id) }} style={{ background: 'blue' }}>2° Contato</Button>
                                        ) : (
                                            <span>{row.contato2}</span>
                                        )
                                    }
                                </TableCell>
                                <TableCell>
                                    {
                                        row.contato3 === undefined & row.contato2 !== undefined ? (
                                            <Button variant='contained' size="small" onClick={() => { tentativaContato('tentativa 3', row._id) }} style={{ background: 'blue' }}>3° Contato</Button>
                                        ) : (
                                            <span>{row.contato3}</span>
                                        )
                                    }
                                </TableCell>
                            </TableRow>
                        ))}

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
            </TableContainer>
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
                            <Button color="error" variant='contained' onClick={excluir}>Excluir</Button>
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
                            <Button color="error" variant='contained' onClick={cancelar}>Cancelar</Button>
                        </Typography>
                    </Box>
                </Box>
            </Modal>
        </>

    )
}

export default TabelaAgendarTele