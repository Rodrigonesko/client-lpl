import React from 'react'
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Button } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { assumirAtividade, encerrarAtividade } from '../../_services/controleAtividade.service';

async function handlerAssumirAtividade(atividade) {
    await assumirAtividade({ atividade })

    window.location.reload()
}

async function handlerEncerrarAtividade() {
    await encerrarAtividade()

    window.location.reload()
}

function Row(props) {
    const { row, atividade } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.celula}
                </TableCell>
                <TableCell align="right">{row.quantidade}</TableCell>
                <TableCell align="right">
                    {
                        atividade === row.celula ? (
                            <Button variant='contained' color='error' size='small' onClick={() => handlerEncerrarAtividade()}>Encerrar Atividade</Button>
                        ) : (
                            null
                        )
                    }
                    {
                        atividade === 'Nenhuma' ? (
                            <Button variant='contained' size='small' onClick={() => handlerAssumirAtividade(row.celula)}>Assumir Atividade</Button>
                        ) : null
                    }
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Analistas na célula
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Analista</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.analistas.map((analista) => (
                                        <TableRow key={analista}>
                                            <TableCell component="th" scope="row">
                                                {analista}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
const TabelaCelulas = ({ report, atividadeAtual }) => {

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Célula</TableCell>
                        <TableCell align="right">Quantidade Analista</TableCell>
                        <TableCell align="right">Assumir Atividade</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {report.map((row) => (
                        <Row key={row.celula} row={row} atividade={atividadeAtual} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TabelaCelulas