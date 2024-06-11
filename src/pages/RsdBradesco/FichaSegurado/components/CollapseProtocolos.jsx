import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Box, Chip, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from "@mui/material"
import { indigo, red } from "@mui/material/colors";
import { useState } from "react";
import { colorStatusRsdBradesco } from "../utils/types";
import SubCollapsePedidos from "./SubCollapsePedidos";

const CollapseProtocolos = ({ protocolo, openRow }) => {

    console.log(protocolo);
    const [protocolos, setProtocolos] = useState(protocolo)
    const [openSubRow, setOpenSubRow] = useState(false)

    return (
        <>
            {
                protocolos.map((protocolo, index) => (
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                        <Collapse in={openRow} timeout="auto" unmountOnExit>
                            <Table size="small" >
                                <TableHead sx={{ background: `linear-gradient(45deg, ${indigo[800]} 30%, ${red[700]} 75%)` }}>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell sx={{ color: 'white' }} >Protocolo</TableCell>
                                        <TableCell align="center" sx={{ color: 'white' }} >Status</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={index._id}>
                                        <TableCell><IconButton
                                            size="small"
                                            onClick={() => {
                                                setOpenSubRow(!openSubRow)
                                            }}
                                        >
                                            <Tooltip title='Detalhes'>
                                                {openSubRow ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                            </Tooltip>
                                        </IconButton>
                                        </TableCell>
                                        <TableCell>{protocolo.codigo}</TableCell>
                                        <TableCell
                                            align="center"
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                }}
                                            >
                                                <Chip
                                                    label={protocolo.status}
                                                    sx={{
                                                        color: 'white',
                                                        backgroundColor: colorStatusRsdBradesco[protocolo.status],
                                                    }}
                                                    size="small"
                                                />
                                            </Box>
                                        </TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableBody >
                            </Table>
                        </Collapse>
                        < SubCollapsePedidos
                            pedido={protocolo.pedidos}
                            openSubRow={openSubRow}
                        />
                    </TableCell>
                ))}
        </>
    )
}

export default CollapseProtocolos