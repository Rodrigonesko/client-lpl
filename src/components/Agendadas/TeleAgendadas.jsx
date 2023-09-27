import React, { useState } from "react";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Typography, CircularProgress, useTheme, IconButton, TableFooter, TablePagination } from "@mui/material";
import moment from "moment";
import { alterarSexoEntrevista, alterarTelefoneEntrevista, alterarTelefoneRn, reagendarEntrevista, reagendarRn, tentativaContatoEntrevista } from "../../_services/teleEntrevista.service";
import ModalChangeWhatsapp from "../TabelaAgendar/modais/ModalChangeWhatsapp";
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import PropTypes from 'prop-types';

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

const TeleAgendadas = ({ propostas, atualizarPropostas, analista }) => {

    const [loading, setLoading] = useState(false)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(50);

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

    const tentativaContato = async (tentativa, id) => {
        try {
            await tentativaContatoEntrevista({ tentativa, id })

            atualizarPropostas(analista)

        } catch (error) {
            console.log(error);
        }
    }

    const reagendar = async (id) => {
        try {

            setLoading(true)

            await reagendarEntrevista({ id })

            console.log(analista);

            atualizarPropostas(analista)

            setLoading(false)

        } catch (error) {
            console.log(error);
        }
    }

    const reagendarEntrevistaRn = async (id) => {
        try {
            await reagendarRn({ id })

            window.location.reload()

        } catch (error) {
            console.log(error);
        }
    }

    const alterarTelefone = async (telefone, id) => {
        try {

            const result = await alterarTelefoneEntrevista({ telefone, id })

            console.log(result);

        } catch (error) {
            console.log(error);
        }
    }

    const alterarTelefoneEntrevistaRn = async (id, telefone) => {
        try {
            await alterarTelefoneRn({ id, telefone })

        } catch (error) {
            console.log(error);
        }
    }

    const alterarSexo = async (id, sexo) => {
        try {
            await alterarSexoEntrevista({ id, sexo })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box maxWidth='1300px' component={Paper} p={1} elevation={3}>
            {
                loading ? (
                    <CircularProgress style={{ position: 'absolute', top: '50%' }} />
                ) : null
            }
            <Typography variant="h5" m={2} width='100%'>
                Tele e Rn: {propostas.length}
            </Typography>
            <TableContainer>
                <Table style={{ display: 'block', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                    <TableHead className='table-header'>
                        <TableRow>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Data</TableCell>
                            <TableCell>Horário</TableCell>
                            <TableCell>Proposta</TableCell>
                            <TableCell>Telefone</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Idade</TableCell>
                            <TableCell>Sexo</TableCell>
                            <TableCell>Analista</TableCell>
                            <TableCell>Formulario</TableCell>
                            <TableCell>Reagendar</TableCell>
                            <TableCell>1° Contato</TableCell>
                            <TableCell>2° Contato</TableCell>
                            <TableCell>3° Contato</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (rowsPerPage > 0 ? propostas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : propostas).map(e => {

                                    if (e.tipo === 'Tele') {
                                        return (
                                            <TableRow>
                                                <TableCell>{e.tipo}</TableCell>
                                                <TableCell>{moment(e.dataEntrevista).format('DD/MM/YYYY')}</TableCell>
                                                <TableCell>{moment(e.dataEntrevista).format('HH:mm:ss')}</TableCell>
                                                <TableCell>{e.proposta}</TableCell>
                                                <TableCell>
                                                    <TextField style={{ minWidth: '150px' }} size="small" variant='standard' defaultValue={e.telefone} onKeyUp={element => alterarTelefone(element.target.value, e._id)} />
                                                    <ModalChangeWhatsapp whatsapp={e.whatsapp} _id={e._id} />
                                                </TableCell>
                                                <TableCell>{e.nome}</TableCell>
                                                <TableCell>{e.idade}</TableCell>
                                                <TableCell>
                                                    <select onChange={item => alterarSexo(e._id, item.target.value)} >
                                                        <option value="M" selected={e.sexo === 'M'}>M</option>
                                                        <option value="F" selected={e.sexo === 'F'} >F</option>
                                                    </select>
                                                </TableCell>
                                                <TableCell>{e.enfermeiro}</TableCell>
                                                <TableCell><Button size="small" variant='contained' href={`/entrevistas/formulario/${e._id}`}>Formulario</Button></TableCell>
                                                <TableCell><Button size="small" color='warning' onClick={() => reagendar(e._id)} variant='contained'>Reagendar</Button></TableCell>
                                                <TableCell>
                                                    {
                                                        e.contato1 ? (
                                                            <span>{e.contato1}</span>
                                                        ) : (
                                                            <Button variant='contained' size="small" onClick={() => {
                                                                tentativaContato('tentativa 1', e._id)
                                                            }} style={{ background: 'blue' }}>1° Contato</Button>
                                                        )
                                                    }

                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        e.contato2 === undefined && e.contato1 !== undefined ? (
                                                            <Button variant='contained' size="small" onClick={() => { tentativaContato('tentativa 2', e._id) }} style={{ background: 'blue' }}>2° Contato</Button>
                                                        ) : (
                                                            <span>{e.contato2}</span>
                                                        )
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        e.contato3 === undefined & e.contato2 !== undefined ? (
                                                            <Button variant='contained' size="small" onClick={() => { tentativaContato('tentativa 3', e._id) }} style={{ background: 'blue' }}>3° Contato</Button>
                                                        ) : (
                                                            <span>{e.contato3}</span>
                                                        )
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                    if (e.tipo === 'Rn') {
                                        return (
                                            <TableRow>
                                                <TableCell>{e.tipo}</TableCell>
                                                <TableCell>{moment(e.dataEntrevista).format('DD/MM/YYYY')}</TableCell>
                                                <TableCell>{moment(e.dataEntrevista).format('HH:mm:ss')}</TableCell>
                                                <TableCell>{e.proposta}</TableCell>
                                                <TableCell>
                                                    <TextField style={{ minWidth: '150px' }} size="small" variant='standard' defaultValue={e.telefone} onChange={item => {
                                                        alterarTelefoneEntrevistaRn(e._id, item.target.value)
                                                    }} />
                                                </TableCell>
                                                <TableCell>{e.nome}</TableCell>
                                                <TableCell>{e.idade}</TableCell>
                                                <TableCell></TableCell>
                                                <TableCell>{e.enfermeiro}</TableCell>
                                                <TableCell><Button size="small" variant='contained' href={`/rn/rns/${e._id}`}>Formulario</Button></TableCell>
                                                <TableCell><Button size="small" color='warning' onClick={() => reagendarEntrevistaRn(e._id)} variant='contained'>Reagendar</Button></TableCell>
                                            </TableRow>
                                        )
                                    }

                                    return null
                                })
                        }
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
            </TableContainer>
        </Box>
    )
}

export default TeleAgendadas