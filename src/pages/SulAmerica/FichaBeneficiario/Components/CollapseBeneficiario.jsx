import { Box, Button, Collapse, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import moment from "moment"
import { valueToBRL } from "../../../../functions/functions"
import { blue } from "@mui/material/colors"
import { useContext, useState } from "react"
import Toast from "../../../../components/Toast/Toast"
import { updatePedido } from "../../../../_services/sulAmerica.service"
import AuthContext from "../../../../context/AuthContext"
import ModalUploadArquivo from "./ModalUploadArquivo"

const CollapseBeneficiario = ({ item, openRow }) => {

    const { name } = useContext(AuthContext)

    const [open, setOpen] = useState(false)
    const [severity, setSeverity] = useState('')
    const [msg, setMsg] = useState('')

    const [tentativasDeContato, setTentativasDeContato] = useState(item.tentativasDeContato || [])

    const handleAdicionarTentaivaDeContato = async () => {
        try {
            const data = {
                responsavel: name,
                data: moment().format('YYYY-MM-DD HH:mm:ss')
            }
            await updatePedido(item._id, { tentativasDeContato: [...tentativasDeContato, data] })
            setTentativasDeContato([...tentativasDeContato, data])
            setSeverity('success')
            setMsg('Tentativa de contato adicionada com sucesso')
            setOpen(true)
        } catch (error) {
            setSeverity('error')
            setMsg('Erro ao adicionar tentativa de contato')
            setOpen(true)
        }
    }

    return (
        <>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={15}>
                    <Collapse in={openRow} timeout="auto" unmountOnExit>
                        <Box
                            p={2}
                        >
                            <Grid container spacing={2}>
                                <Grid
                                    item
                                    xs={12}
                                    sm={2}
                                >
                                    <Typography>
                                        Menor data Execução
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        value={moment(item?.menorDataExecucao).format('DD/MM/YYYY')}
                                        size="small"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={2}
                                >
                                    <Typography>
                                        Maior data Execução
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        value={moment(item?.maiorDataExecucao).format('DD/MM/YYYY')}
                                        size="small"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={2}
                                >
                                    <Typography>
                                        Quantidade Serviços
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        value={item?.qtdServicosPagos}
                                        size="small"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={2}
                                >
                                    <Typography>
                                        Valor Pago
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        value={valueToBRL(item?.valorPago)}
                                        size="small"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={4}
                                >
                                    <Typography>
                                        Serviços
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        value={item?.servicos.map(servico => servico).join(' - ')}
                                        size="small"
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={2}
                                >
                                    <Typography>
                                        Data Criação
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        value={moment(item?.dataCriacao).format('DD/MM/YYYY')}
                                        size="small"
                                        disabled
                                    />
                                </Grid>
                                {
                                    item?.dataConclusao && (
                                        <Grid
                                            item
                                            xs={12}
                                            sm={2}
                                        >
                                            <Typography>
                                                Data Conclusão
                                            </Typography>
                                            <TextField
                                                fullWidth
                                                value={item.dataConclusao && moment(item?.dataConclusao).format('DD/MM/YYYY')}
                                                size="small"
                                                disabled
                                            />
                                        </Grid>
                                    )
                                }
                                {
                                    item?.justificativaCancelamento && (
                                        <Grid
                                            item
                                            xs={12}
                                            sm={2}
                                        >
                                            <Typography>
                                                Justitifativa Cancelamento
                                            </Typography>
                                            <TextField
                                                fullWidth
                                                value={item?.justificativaCancelamento}
                                                size="small"
                                                disabled
                                            />
                                        </Grid>
                                    )
                                }
                            </Grid>
                            <Divider sx={{ m: 2 }} />
                            <Grid
                                container
                                spacing={2}
                            >
                                <Grid item xs={12} sm={6}>
                                    {
                                        tentativasDeContato.map((tentativa, index) => (
                                            <Box
                                                key={index}
                                                display={'flex'}
                                                alignItems={'center'}
                                                gap={2}
                                                m={2}
                                            >
                                                <Typography>
                                                    Tentativa {index + 1}
                                                </Typography>
                                                <Typography>
                                                    Data: {moment(tentativa.data).format('DD/MM/YYYY HH:mm')}
                                                </Typography>
                                                <Typography>
                                                    Responsvel: {tentativa.responsavel}
                                                </Typography>
                                            </Box>
                                        ))
                                    }
                                    <Button
                                        variant="contained"
                                        sx={{
                                            mt: 2,
                                            bgcolor: blue[900],
                                            color: 'white',
                                            ':hover': {
                                                bgcolor: blue[800]
                                            }
                                        }}
                                        onClick={handleAdicionarTentaivaDeContato}
                                    >
                                        Tentativa de Contato
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box>
                                        <ModalUploadArquivo item={item} />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Collapse>
                </TableCell>
                <Toast
                    severity={severity}
                    msg={msg}
                    open={open}
                    onClose={() => setOpen(false)}
                />
            </TableRow >
        </>
    )
}

export default CollapseBeneficiario