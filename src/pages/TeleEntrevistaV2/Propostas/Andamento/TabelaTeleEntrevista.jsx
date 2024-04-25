import { Table, TableCell, TableHead, TableRow } from "@mui/material"

const TabelaTeleEntrevista = () => {
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
                    !loading ? propostas.map((proposta, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                {proposta.proposta}
                            </TableCell>
                            <TableCell>
                                {proposta.beneficiario.nome}
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

export default TabelaTeleEntrevista