import React from "react";
import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, IconButton, Checkbox } from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState, useEffect } from "react"
import moment from "moment";
import TabelaPedidoRsd from "../../../../components/TabelaPedido/TabelaPedidoRsd";

function Row(props) {
    const { row, pedidos, flushHook, setCheckPedidos, checkPedidos } = props
    const [open, setOpen] = useState(false)
    const [check, setCheck] = useState(false)

    const handleChangeCheck = (e) => {
        if (e.target.checked) {
            const novoArray = [...checkPedidos]
            const arrIds = pedidos.filter(pedido => {
                return pedido._id && row.protocolo === pedido.protocolo && !pedido.pacote
            }).map(pedido => pedido._id)
            novoArray.push(...arrIds)
            setCheckPedidos(novoArray)
        } else {
            const novoArray = checkPedidos.filter(id => {
                return !pedidos.some(pedido => pedido._id === id && row.protocolo === pedido.protocolo);
            });
            setCheckPedidos(novoArray);
        }
        setCheck(!check)
    }

    const verifyPedidosChecked = () => {

        const array = pedidos.filter(pedido => {
            return pedido.protocolo === row.protocolo && !pedido.pacote
        })

        let count = 0

        checkPedidos.forEach(id => {
            if (array.some(pedido => pedido._id === id)) {
                count++
            }
        })

        if (count === array.length) {
            setCheck(true)
        } else {
            setCheck(false)
        }

    }

    useEffect(() => {
        verifyPedidosChecked()
    }, [JSON.stringify(checkPedidos)])

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
                    <Checkbox value={check} onChange={handleChangeCheck} checked={check} />
                </TableCell>
            </TableRow>
            <TabelaPedidoRsd
                flushHook={flushHook}
                open={open}
                pedidos={pedidos}
                protocolo={row.protocolo}
                checkPedidos={checkPedidos}
                setCheckPedidos={setCheckPedidos} />

        </React.Fragment>
    )

}

const PedidosReembolso = (props) => {

    const { protocolos, pedidos, flushHook, setCheckPedidos, checkPedidos } = props

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
                                return <Row
                                    flushHook={flushHook}
                                    key={protocolo.protocolo}
                                    row={protocolo}
                                    pedidos={pedidos}
                                    setCheckPedidos={setCheckPedidos}
                                    checkPedidos={checkPedidos}
                                />
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