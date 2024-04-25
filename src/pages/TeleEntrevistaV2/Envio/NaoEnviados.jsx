import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Alert, Tooltip } from "@mui/material"
import { useEffect, useState } from "react"
import { getPropostaByStatus, updateBeneficiario, updateProposta } from "../../../_services/teleEntrevistaV2.service"
import { Redo } from "@mui/icons-material"

const ModalEnviarMensagens = ({ propostas, setPropostas, setTotal }) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState(0)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setProgress(0)
    }

    const handleEnviar = async () => {
        try {
            setLoading(true)
            const total = propostas.length
            let count = 0
            for (let proposta of propostas) {
                await updateProposta({
                    _id: proposta._id,
                    status: 'Enviado'
                })
                count++
                setProgress((count / total) * 100)
                setPropostas(prevPropostas => prevPropostas.filter(p => p._id !== proposta._id))
                setTotal(prevTotal => ({
                    ...prevTotal,
                    naoEnviados: prevTotal.naoEnviados - 1,
                    enviados: prevTotal.enviados + 1,
                }))
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'black',
                    },
                    mt: 2,
                }}
                onClick={handleClickOpen}
            >
                Enviar
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                sx={{
                    '& .MuiDialog-paper': {
                        width: '100%',
                        maxWidth: '500px',
                    },
                }}

                disableBackdropClick={loading}
                disableEscapeKeyDown={loading}
            >
                <DialogTitle>
                    Enviar Mensagens
                </DialogTitle>
                <DialogContent>
                    <LinearProgress
                        color="inherit"
                        value={progress}
                        variant="determinate"
                    />
                    {
                        progress === 100 && (
                            <Alert
                                severity="success"
                            >
                                Mensagens enviadas com sucesso!
                            </Alert>
                        )
                    }
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        disabled={loading}
                        variant="contained"
                        color='inherit'
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleEnviar}
                        disabled={loading}
                        variant="contained"
                        color='primary'
                    >
                        Enviar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

const NaoEnviados = ({ setTotal }) => {

    const [propostas, setPropostas] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const result = await getPropostaByStatus(0, 0, {
                status: ['Não enviado']
            })
            setPropostas(result.propostas)
            setLoading(false)
        }
        fetchData()
    }, [])

    return (
        <Box
            sx={{
                mt: 2,
            }}
        >
            <ModalEnviarMensagens
                propostas={propostas}
                setPropostas={setPropostas}
                setTotal={setTotal}
            />
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
                            <TableCell>Proposta</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>CPF</TableCell>
                            <TableCell>CPF Titular</TableCell>
                            <TableCell>Tipo Associado</TableCell>
                            <TableCell>Contrato</TableCell>
                            <TableCell>Idade</TableCell>
                            <TableCell>DDD</TableCell>
                            <TableCell>Celular</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            loading ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={10}
                                    >
                                        <LinearProgress color="inherit" />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                propostas.map((proposta) => (
                                    <TableRow
                                        key={proposta._id}
                                    >
                                        <TableCell>{proposta.proposta}</TableCell>
                                        <TableCell>{proposta.beneficiario.nome}</TableCell>
                                        <TableCell>{proposta.beneficiario.cpf}</TableCell>
                                        <TableCell>{proposta.beneficiario.cpfTitular}</TableCell>
                                        <TableCell>{proposta.infoAdicional.tipoAssociado}</TableCell>
                                        <TableCell>{proposta.infoAdicional.contrato}</TableCell>
                                        <TableCell>{proposta.beneficiario.idade}</TableCell>
                                        <TableCell>{proposta.beneficiario.ddd}</TableCell>
                                        <TableCell>{proposta.beneficiario.celular}</TableCell>
                                        <TableCell>
                                            <Tooltip title='Ajustar'>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    onClick={async () => {
                                                        try {
                                                            await updateProposta({
                                                                _id: proposta._id,
                                                                status: 'Ajustar',
                                                            })
                                                            await updateBeneficiario({
                                                                _id: proposta.beneficiario._id,
                                                                cpfTitular: '0',
                                                            })

                                                            setPropostas(prevPropostas => prevPropostas.filter(p => p._id !== proposta._id))
                                                            setTotal(prevTotal => ({
                                                                ...prevTotal,
                                                                naoEnviados: prevTotal.naoEnviados - 1,
                                                                ajustar: prevTotal.ajustar + 1,
                                                            }))
                                                        } catch (error) {
                                                            console.log(error)
                                                        }
                                                    }}
                                                >
                                                    <Redo />
                                                </Button>
                                            </Tooltip>
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

export default NaoEnviados