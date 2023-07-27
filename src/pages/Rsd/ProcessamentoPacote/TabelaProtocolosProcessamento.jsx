import React, { useState } from "react"
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import moment from "moment";
import TabelaPedidoRsd from "../../../components/TabelaPedido/TabelaPedidoRsd";
import { useParams } from "react-router-dom";

function Row(props) {

    const { row, pedidos, flushHook } = props
    const { idPacote } = useParams()

    const [open, setOpen] = useState(false)
    return (
        <>
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
                <TableCell align="center" >{row.protocolo}</TableCell>
                <TableCell align="center" >{moment(row.dataSolicitacao).format('DD/MM/YYYY')}</TableCell>
                <TableCell align="center" >{moment(row.dataPagamento).format('DD/MM/YYYY')}</TableCell>
                <TableCell align="center" >{row.statusProtocolo}</TableCell>
                <TableCell align="center" >{moment(row.updatedAt).format('DD/MM/YYYY')}</TableCell>
            </TableRow>
            <TabelaPedidoRsd
                open={open}
                protocolo={row.protocolo}
                pedidos={pedidos}
                todos={true}
                pacote={idPacote}
                flushHook={flushHook}
            />
        </>
    )

}

const TabelaProtocolosProcessamento = (props) => {

    const { protocolos, pedidos, flushHook } = props

    return (
        <TableContainer>
            <Table className="table">
                <TableHead className="table-header">
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="center">Protocolo</TableCell>
                        <TableCell align="center">Data Solicitação</TableCell>
                        <TableCell align="center">Data Pagamento</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Data Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        protocolos.map(item => {
                            return (
                                <Row row={item} pedidos={pedidos} flushHook={flushHook} />
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TabelaProtocolosProcessamento