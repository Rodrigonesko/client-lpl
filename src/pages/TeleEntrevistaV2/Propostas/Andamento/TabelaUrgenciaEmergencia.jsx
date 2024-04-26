import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { PropostasContext } from "../context"
import { useContext } from "react"

const TabelaUrgenciaEmergencia = ({ loading }) => {

    const { propostasUe } = useContext(PropostasContext)

    return (
        <Table
            size="small"
        >
            <TableHead
                sx={{
                    backgroundColor: '#f5f5f5'
                }}
            >
                <TableRow>
                    <TableCell>
                        Pedido
                    </TableCell>
                    <TableCell>
                        Nome
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    !loading ? propostasUe.map((proposta, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                {proposta.pedido}
                            </TableCell>
                            <TableCell>
                                {proposta.nomeAssociado}
                            </TableCell>
                        </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan={1}>
                                Carregando...
                            </TableCell>
                        </TableRow>
                    )
                }
            </TableBody>
        </Table>
    )
}

export default TabelaUrgenciaEmergencia