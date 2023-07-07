import React from "react";
import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, IconButton, Checkbox } from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from "react"
import moment from "moment";
import TabelaPedidoRsd from "../../../../components/TabelaPedido/TabelaPedidoRsd";

function Row(props) {
    const { row, pedidos } = props
    const [open, setOpen] = useState(false)

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
                <TableCell align='center' component="th" scope="row" >
                    {row.protocolo}
                </TableCell>
                <TableCell align='center' >
                    {moment(row.dataSolicitacao).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell align='center' >
                    {moment(row.dataPagamento).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell align='center' >
                    {row.status}
                </TableCell>
                <TableCell align='center' >
                    {moment(row.updatedAt).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell>
                    <Checkbox />
                </TableCell>
            </TableRow>
            <TabelaPedidoRsd open={open} pedidos={pedidos} protocolo={row.protocolo}  />
        </React.Fragment>
    )

}

const PedidosReembolso = (props) => {

    const {protocolos, pedidos} = props

    return (
        <TableContainer component={Paper} >
            <Table className="table">
                <TableHead className="table-header">
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell align='center' >Protocolo</TableCell>
                        <TableCell align='center'>Data Solicitação</TableCell>
                        <TableCell align='center'>Data Pagamento</TableCell>
                        <TableCell align='center' >Status</TableCell>
                        <TableCell align='center'>Data Status</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        protocolos.map(protocolo => {

                            if (protocolo.status === 'A iniciar') {
                                return <Row key={protocolo.protocolo} row={protocolo} pedidos={pedidos} />
                            }

                            return null
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default PedidosReembolso