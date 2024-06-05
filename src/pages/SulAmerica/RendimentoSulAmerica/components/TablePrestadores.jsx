import { Box, Chip, Collapse, FormControl, IconButton, InputLabel, MenuItem, Pagination, Select, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { green, grey } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { valueToBRL } from "../../Pedidos/utils/types";

const Row = ({ clinica, valorSomado, pedidos }) => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow>
                <TableCell>{clinica}</TableCell>
                <TableCell
                    align="left"
                >
                    <Typography
                        fontWeight={'bold'}
                        bgcolor={green[100]}
                        color={green[900]}
                        borderRadius={'5px'}
                        p={0.5}
                        variant="caption"
                    >
                        {valueToBRL(valorSomado)}
                    </Typography>
                </TableCell>
                <TableCell>
                    <IconButton
                        onClick={() => setOpen(!open)}
                        size="small"
                    >
                        {
                            open ? <ArrowDropUp /> : <ArrowDropDown />
                        }
                    </IconButton>
                </TableCell>
            </TableRow>
            <Collapse
                in={open}
                timeout="auto"
                unmountOnExit
            >
                <TableRow>
                    <TableCell colSpan={3}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell >Beneficiaro</TableCell>
                                    <TableCell>Valor</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    pedidos.map((pedido, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{pedido.beneficiario.nome}</TableCell>
                                            <TableCell>
                                                {valueToBRL(pedido.valorPago)}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableCell>
                </TableRow>
            </Collapse>
        </>

    )
}

const TablePrestadores = ({ prestadores }) => {

    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const totalPages = prestadores.length

    useEffect(() => {
        setPage(1)
    }, [rowsPerPage])

    return (
        <Box
            sx={{
                borderRadius: '10px',
                bgcolor: grey[100],
                display: 'flex',
                flexDirection: 'column',
                p: 2,
                minHeight: '400px',
            }}
        >
            <Box display={'flex'} justifyContent={'space-between'} sx={{ mb: 2, mt: 2 }}>
                <FormControl size="small">
                    <InputLabel>Linhas</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Linhas"
                        sx={{ width: '100px', borderRadius: '10px' }}
                        value={rowsPerPage}
                        onChange={(e) => setRowsPerPage(e.target.value)}
                    >
                        <MenuItem value={5} >5</MenuItem>
                        <MenuItem value={10} >10</MenuItem>
                        <MenuItem value={20} >20</MenuItem>
                        <MenuItem value={50} >50</MenuItem>
                        <MenuItem value={Infinity} >50+</MenuItem>
                    </Select>
                </FormControl>
                <Pagination count={
                    totalPages % rowsPerPage === 0 ?
                        Math.floor(totalPages / rowsPerPage) :
                        Math.floor(totalPages / rowsPerPage) + 1
                } page={page} onChange={(_, value) => setPage(value)}
                />
            </Box>
            <Box
                display={'flex'}
                gap={1}
            >
                <Chip
                    label={`Total: ${prestadores.length}`}
                    color="primary"
                    sx={{ mb: 2 }}
                />
                <Chip
                    label={`Média: ${valueToBRL(prestadores.reduce((acc, prestador) => acc + prestador.valorSomado, 0) / prestadores.length)}`}
                    color="success"
                    variant="outlined"
                    sx={{ mb: 2 }}
                />
            </Box>
            <Table
                size="small"
            >
                <TableHead>
                    <TableRow>
                        <TableCell>Clinica</TableCell>
                        <TableCell align="left">R$</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody
                >
                    {
                        prestadores.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((prestador, index) => (
                            <Row key={index} clinica={prestador.clinica} valorSomado={prestador.valorSomado} pedidos={prestador.pedidos} />
                        ))
                    }
                </TableBody>
            </Table>
        </Box>
    )
}

export default TablePrestadores;