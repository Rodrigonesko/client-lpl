import { Collapse, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { blue, orange } from "@mui/material/colors"

const CollapseBeneficiario = ({ item, openRow }) => {
    return (
        <>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={15}>
                    <Collapse in={openRow} timeout="auto" unmountOnExit>
                        <TableContainer>
                            <Table size="small">
                                <TableHead sx={{ background: blue[900] }} >
                                    <TableRow>
                                        <TableCell sx={{ color: 'white' }} >1° Tentativa de Contato</TableCell>
                                        <TableCell sx={{ color: 'white' }} >2° Tentativa de Contato</TableCell>
                                        <TableCell sx={{ color: 'white' }} >3° Tentativa de Contato</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>1° Tentativa de Contato</TableCell>
                                        <TableCell>2° Tentativa de Contato</TableCell>
                                        <TableCell>3° Tentativa de Contato</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Collapse>
                </TableCell>
            </TableRow >
        </>
    )
}

export default CollapseBeneficiario