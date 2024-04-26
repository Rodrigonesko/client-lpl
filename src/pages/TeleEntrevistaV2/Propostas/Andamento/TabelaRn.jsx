import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { PropostasContext } from "../context"
import { useContext } from "react"

const TabelaRn = ({ loading }) => {

    const { propostasRn } = useContext(PropostasContext)

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
                        Proposta
                    </TableCell>
                    <TableCell>
                        Nome
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    !loading ? propostasRn.map((proposta, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                {proposta.proposta}
                            </TableCell>
                            <TableCell>
                                {proposta.beneficiario}
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

export default TabelaRn