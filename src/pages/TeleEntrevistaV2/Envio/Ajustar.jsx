import { Box, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { getPropostaByStatus } from "../../../_services/teleEntrevistaV2.service"
import { Block, Check } from "@mui/icons-material"

const Row = ({ data }) => {

    const [proposta, setProposta] = useState(data || {})

    useEffect(() => {
        setProposta(data)
    }, [data])

    useEffect(() => {
        console.log(proposta.beneficiario.cpfTitular.toString().length)
    }, [proposta])

    return (
        <TableRow
            key={proposta._id}
            sx={{
                borderLeft: proposta.beneficiario.cpfTitular.toString().length !== 11 ? '2px solid red' : '2px solid green'
            }}
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
                <TextField
                    size="small"
                    value={proposta.beneficiario.cpfTitular || ''}
                    onChange={(e) => {
                        if (e.target.value.length > 11) return
                        setProposta({
                            ...proposta,
                            beneficiario: {
                                ...proposta.beneficiario,
                                cpfTitular: e.target.value
                            }
                        })
                    }}
                    type="number"
                    inputProps={{ min: "0", max: "99999999999" }}
                    sx={{
                        minWidth: '150px'
                    }}
                />
            </TableCell>
            <TableCell>
                {proposta.infoAdicional.tipoAssociado}
            </TableCell>
            <TableCell>
                {proposta.infoAdicional.contrato}
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
            <TableCell>
                {
                    proposta.beneficiario.cpfTitular.toString().length !== 11 ? (
                        <Block color="error" />
                    ) : (
                        <Check color="success" />
                    )
                }
            </TableCell>
        </TableRow>
    )
}

const Ajustar = () => {

    const [propostas, setPropostas] = useState([])
    const [loading, setLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            try {
                const result = await getPropostaByStatus('Ajustar', 0, 0)
                setPropostas(result.propostas)
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        }

        fetch()
    }, [refresh])

    return (
        <Box
            mt={2}
        >
            <TableContainer>
                <Table
                    size="small"
                >
                    <TableHead>
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
                            <TableCell>

                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            loading ? (
                                <TableRow>
                                    <TableCell colSpan={9}>
                                        <LinearProgress color="inherit" />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                propostas.map((proposta) => (
                                    <Row data={proposta} key={proposta._id} />
                                ))
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default Ajustar