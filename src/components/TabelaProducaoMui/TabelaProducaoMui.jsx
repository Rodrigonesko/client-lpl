import React, { useState } from 'react'
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import moment from 'moment/moment';

function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);
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
                <TableCell align="center" component="th" scope="row">
                    {row.data}
                </TableCell>
                <TableCell align="center">{row.quantidade}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Analistas/Quantidade
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead className='table-header'>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell align="center">Analista</TableCell>
                                        <TableCell align="center">Quantidade</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.quantidadeAnalistaMes.map((analista) => (
                                        <Row2 row={analista}></Row2>
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

const Row2 = (props) => {
    const { row } = props;
    const [open, setOpen] = useState(false);
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
                <TableCell align="center" component="th" scope="row">
                    {row.analista}
                </TableCell>
                <TableCell align="center">{row.quantidade}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Analistas/Quantidade
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead className='table-header'>
                                    <TableRow>
                                        <TableCell align="center">Data</TableCell>
                                        <TableCell align="center">Quantidade</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.quantidadeAnalistaDia.map((data) => {
                                        return (
                                            <TableRow>
                                                <TableCell align="center">{moment(data.data).format('DD/MM/YYYY')}</TableCell>
                                                <TableCell align="center">{data.quantidade}</TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const TabelaProducaoMui = ({ producao }) => {

    return (
        <>
            <TableContainer component={Paper} style={{maxWidth: '400px'}}>
                <Table aria-label='collapsible table' className='table'>
                    <TableHead class='table-header'>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell align="center">Mês</TableCell>
                            <TableCell align="center">Quantidade</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            producao.map(row => (
                                <Row key={row.data} row={row} />
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default TabelaProducaoMui