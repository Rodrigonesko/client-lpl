import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, IconButton, Checkbox } from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from "react"

function Row(props) {
    const { row } = props
    const [open, setOpen] = useState()

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
                <TableCell align='center' >
                    {row.protocolo}
                </TableCell>
                <TableCell align='center' >
                    {row.dataSolicitacao}
                </TableCell>
                <TableCell align='center' >
                    {row.dataPagamento}
                </TableCell>
                <TableCell align='center' >
                    {row.status}
                </TableCell>
                <TableCell align='center' >
                    {row.dataStatus}
                </TableCell>
                <TableCell>
                    <Checkbox />
                </TableCell>
            </TableRow>
        </>
    )

}

const PedidosReembolso = (props) => {
    return (
        <TableContainer>
            <Table className="table">
                <TableHead className="table-header">
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Protocolo</TableCell>
                        <TableCell>Data Solicitação</TableCell>
                        <TableCell>Data Pagamento</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Data Status</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default PedidosReembolso