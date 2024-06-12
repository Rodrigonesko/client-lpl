import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Chip, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from "@mui/material"
import { deepPurple, red } from "@mui/material/colors";
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
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8} key={index}>
                        <Collapse in={openRow} timeout="auto" unmountOnExit>
                            <Table size="small" >
                                <TableHead sx={{ background: `linear-gradient(45deg, ${red[700]} 80%, ${deepPurple[800]} 95%)` }}>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell align="center" sx={{ color: 'white' }} >Protocolo</TableCell>
                                        <TableCell align="center" sx={{ color: 'white' }} >Status</TableCell>
                                        <TableCell align="center" sx={{ color: 'white' }} >Quantidade de Pedidos</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={index._id}>
                                        <TableCell align="left"><IconButton
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
                                        <TableCell align="center">{protocolo.codigo}</TableCell>
                                        <TableCell
                                            align="center"
                                        >
                                            <Chip
                                                label={protocolo.status}
                                                sx={{
                                                    color: 'white',
                                                    backgroundColor: colorStatusRsdBradesco[protocolo.status],
                                                }}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell align="center">{protocolo.pedidos.length}</TableCell>
                                    </TableRow>
                                </TableBody >
                            </Table>
                            < SubCollapsePedidos
                                pedido={protocolo.pedidos}
                                openSubRow={openSubRow}
                            />
                        </Collapse>
                    </TableCell>
                ))}
        </>
    )
}

export default CollapseProtocolos