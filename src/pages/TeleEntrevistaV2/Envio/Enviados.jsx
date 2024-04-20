import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { getPropostaByStatus } from "../../../_services/teleEntrevistaV2.service"
import { blue } from "@mui/material/colors"

const Enviados = () => {

    const [propostas, setPropostas] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            const result = await getPropostaByStatus(0, 0, {
                status: ['Enviado']
            })
            setPropostas(result.propostas)
            setLoading(false)
        }
        fetch()
    }, [])

    return (
        <Box
            mt={1}
        >
            <Button
                variant="contained"
                sx={{
                    mt: 2,
                    backgroundColor: blue[500],
                    color: 'white',

                }}
            >
                Reenviar
            </Button>
            <TableContainer
                sx={{
                    mt: 2,
                }}
            >
                <Table
                    size="small"
                >
                    <TableHead
                        sx={{
                            backgroundColor: '#F5F5F5',
                        }}
                    >
                        <TableRow>
                            <TableCell>
                                Proposta
                            </TableCell>
                            <TableCell>
                                Nome
                            </TableCell>
                            <TableCell>
                                CPF
                            </TableCell>
                            <TableCell>
                                CPF Titular
                            </TableCell>
                            <TableCell>
                                Tipo Associado
                            </TableCell>
                            <TableCell>
                                Contrato
                            </TableCell>
                            <TableCell>
                                Idade
                            </TableCell>
                            <TableCell>
                                DDD
                            </TableCell>
                            <TableCell>
                                Celular
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            loading ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={9}
                                    >
                                        Carregando...
                                    </TableCell>
                                </TableRow>
                            ) : (
                                propostas.map((proposta, index) => (
                                    <TableRow
                                        key={index}
                                    >
                                        <TableCell>
                                            {proposta.proposta}
                                        </TableCell>
                                        <TableCell>
                                            {proposta.beneficiario.nome}
                                        </TableCell>
                                        <TableCell>
                                            {proposta.beneficiario.cpf}
                                        </TableCell>
                                        <TableCell>
                                            {proposta.beneficiario.cpfTitular}
                                        </TableCell>
                                        <TableCell>
                                            {proposta.infoAdicional.tipoAssociado}
                                        </TableCell>
                                        <TableCell>
                                            {proposta.infoAdicional.tipoContrato}
                                        </TableCell>
                                        <TableCell>
                                            {proposta.beneficiario.idade}
                                        </TableCell>
                                        <TableCell>
                                            {proposta.beneficiario.ddd}
                                        </TableCell>
                                        <TableCell>
                                            {proposta.beneficiario.celular}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default Enviados