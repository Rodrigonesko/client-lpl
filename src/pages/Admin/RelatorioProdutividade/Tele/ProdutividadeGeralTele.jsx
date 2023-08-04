import { Box, Paper, Typography, Accordion, AccordionSummary, AccordionDetails, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";


const ProdutividadeGeralTele = ({ mes }) => {

    const [expandedTable, setExpandedTable] = useState(true)

    useEffect(() => {
        console.log(mes);
    }, [])

    return (
        <Box component={Paper} p={2}>
            <Box p={1}>
                <Typography fontWeight='bold'>
                    Média:
                </Typography>
                <Typography fontWeight='bold'>
                    Total:
                </Typography>
            </Box>
            <Accordion expanded={expandedTable} onChange={() => setExpandedTable(!expandedTable)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography fontWeight='500'>
                        Tabela Produção Geral
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Analista
                                </TableCell>
                                <TableCell>
                                    Total
                                </TableCell>
                                <TableCell>
                                    D0
                                </TableCell>
                                <TableCell>
                                    D1
                                </TableCell>
                                <TableCell>
                                    D2
                                </TableCell>
                                <TableCell>
                                    D3
                                </TableCell>
                                <TableCell>
                                    D4+
                                </TableCell>
                                <TableCell>
                                    Divergência
                                </TableCell>
                                <TableCell>
                                    Agendados
                                </TableCell>
                                <TableCell>
                                    Não Agendados
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                        </TableBody>
                    </Table>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}

export default ProdutividadeGeralTele