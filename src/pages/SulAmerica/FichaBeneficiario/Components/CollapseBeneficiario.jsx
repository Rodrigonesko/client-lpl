import { Box, Button, Collapse, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import moment from "moment"
import { valueToBRL } from "../../../../functions/functions"
import { blue } from "@mui/material/colors"
import { useState } from "react"
import Toast from "../../../../components/Toast/Toast"
import { adicionarTentativaDeContato } from "../../../../_services/sulAmerica.service"
import ModalUploadArquivo from "./ModalUploadArquivo"
import { CloudDownload } from "@mui/icons-material"
import axios from "axios"

const CollapseBeneficiario = ({ item, openRow }) => {

    const [open, setOpen] = useState(false)
    const [severity, setSeverity] = useState('')
    const [msg, setMsg] = useState('')

    const [tentativasDeContato, setTentativasDeContato] = useState(item.tentativasDeContato || [])
    const [arquivos, setArquivos] = useState(item.arquivos || [])

    const handleAdicionarTentaivaDeContato = async () => {
        try {
            const response = await adicionarTentativaDeContato(item._id)
            setTentativasDeContato(response.tentativasDeContato)
            setSeverity('success')
            setMsg('Tentativa de contato adicionada com sucesso')
            setOpen(true)
        } catch (error) {
            setSeverity('error')
            setMsg('Erro ao adicionar tentativa de contato')
            setOpen(true)
        }
    }

    const fileDownload = async (arquivo) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_SUL_AMERICA_SERVICE}/pedido/download/${arquivo}`, {
                responseType: 'blob',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            const url = window.URL.createObjectURL(new Blob([res.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', arquivo)
            document.body.appendChild(link)
            link.click()
        } catch (error) {
            console.log(error);
            setOpen(true)
            setSeverity('error')
            setMsg(`Erro! ${error}`)
        }
    }

    return (
        <>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
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
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>
                                                        N° Tentativa
                                                    </TableCell>
                                                    <TableCell>
                                                        Responsável
                                                    </TableCell>
                                                    <TableCell>
                                                        Data
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    tentativasDeContato.map((tentativa, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell>
                                                                {index + 1}
                                                            </TableCell>
                                                            <TableCell>
                                                                {tentativa.responsavel}
                                                            </TableCell>
                                                            <TableCell>
                                                                {moment(tentativa.data).format('DD/MM/YYYY HH:mm')}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
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
                                        <TableContainer>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>
                                                            Nome
                                                        </TableCell>
                                                        <TableCell>
                                                            Link
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {
                                                        arquivos.map((arquivo, index) => (
                                                            <TableRow key={index}>
                                                                <TableCell>
                                                                    {arquivo}
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Button
                                                                        sx={{
                                                                            bgcolor: blue[900],
                                                                            color: 'white',
                                                                            ':hover': {
                                                                                bgcolor: blue[800]
                                                                            }
                                                                        }}
                                                                        endIcon={<CloudDownload />}
                                                                        size="small"
                                                                        variant='text'
                                                                        onClick={() => fileDownload(arquivo)}
                                                                    >
                                                                        Download
                                                                    </Button>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))
                                                    }
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Box>
                                    <ModalUploadArquivo item={item} setArquivos={setArquivos} />
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