import { Box, Button, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { getPropostaByStatus, updateBeneficiario, updateProposta } from "../../../_services/teleEntrevistaV2.service"
import { Block, Check } from "@mui/icons-material"
import Toast from "../../../components/Toast/Toast"

const Row = ({ data, update, setRefresh, setTotal }) => {

    const [proposta, setProposta] = useState(data || {})
    const [open, setOpen] = useState(false)
    const [severity, setSeverity] = useState('success')
    const [message, setMessage] = useState('')

    useEffect(() => {
        setProposta({
            ...data,
            beneficiario: {
                ...data.beneficiario,
                cpfTitular: data.beneficiario.cpfTitular === '0' ? '' : data.beneficiario.cpfTitular
            }
        })
    }, [data])

    useEffect(() => {
        const ajustar = async () => {
            try {
                if (proposta.beneficiario.cpfTitular.toString().length !== 11) return
                await updateProposta({
                    _id: proposta._id,
                    status: 'Não enviado'
                })
                await updateBeneficiario({
                    ...proposta.beneficiario,
                    cpfTitular: Number(proposta.beneficiario.cpfTitular)
                })
                setSeverity('success')
                setMessage('Proposta ajustada com sucesso')
                setOpen(true)
                setRefresh(prev => !prev)
                setTotal(prev => ({
                    ...prev,
                    ajustar: prev.ajustar - 1,
                    naoEnviados: prev.naoEnviados + 1
                }))

            } catch (error) {
                console.log(error);
                setSeverity('error')
                setMessage('Erro ao ajustar proposta')
                setOpen(true)
            }
        }

        ajustar()
    }, [update])

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
                    value={proposta.beneficiario.cpfTitular}
                    onChange={(e) => {
                        if (!/^[0-9]*$/.test(e.target.value)) return;
                        if (e.target.value.length > 11) return
                        setProposta({
                            ...proposta,
                            beneficiario: {
                                ...proposta.beneficiario,
                                cpfTitular: e.target.value
                            }
                        })
                    }}
                    sx={{
                        minWidth: '150px'
                    }}
                />
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
            <TableCell>
                {
                    proposta.beneficiario.cpfTitular.toString().length !== 11 ? (
                        <Block color="error" />
                    ) : (
                        <Check color="success" />
                    )
                }
            </TableCell>
            <Toast
                open={open}
                severity={severity}
                message={message}
                onClose={() => setOpen(false)}
            />
        </TableRow>
    )
}

const Ajustar = ({ setTotal }) => {

    const [propostas, setPropostas] = useState([])
    const [loading, setLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            try {
                const result = await getPropostaByStatus(0, 0, {
                    status: ['Ajustar']
                })
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
            <Button
                onClick={() => setUpdate(!update)}
                variant="contained"
                color="secondary"
                sx={{
                    mt: 2
                }}
            >
                Ajustar
            </Button>
            <TableContainer
                sx={{
                    mt: 2,
                }}
            >
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
                                    <Row data={proposta} key={proposta._id} update={update} setRefresh={setRefresh} setTotal={setTotal} />
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