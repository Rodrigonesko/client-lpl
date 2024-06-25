import { ArrowBackOutlined, ArrowForwardOutlined, CloudDownload, Phone } from "@mui/icons-material"
import { Box, Button, Divider, Drawer, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material"
import { blue } from "@mui/material/colors"
import { useState } from "react"
import { tentativaDeContato } from "../../../../_services/rsdBradesco.service"
import axios from "axios"
import moment from "moment"
import ModalUploadArquivo from "./ModalUploadArquivo"
import ModalAdicionarObs from "./ModalAdicionarObs"

const DrawerMaisInfos = ({ pacote, setPacote, id, setOpenToast, setMessage, setSeverity }) => {

    const [openDrawer, setOpenDrawer] = useState(false)

    const handleOpen = () => {
        setOpenDrawer(true)
    }
    const handleClose = () => {
        setOpenDrawer(false)
    }

    const fileDownload = async (arquivo) => {
        console.log(arquivo);
        try {
            const res = await axios.get(`${process.env.REACT_APP_RSD_BRADESCO_SERVICE}/download/${arquivo}`, {
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
            setOpenToast(true)
            setSeverity('error')
            setMessage(`Erro! ${error}`)
        }
    }

    const handleTentativaContato = async () => {
        try {
            const result = await tentativaDeContato(id)
            setPacote(result)
            setMessage('Tentativa de contato registrada com sucesso')
            setSeverity('success')
            setOpenToast(true)
        } catch (error) {
            console.log(error);
            setMessage('Erro ao registrar tentativa de contato')
            setSeverity('error')
            setOpenToast(true)
        }

    }

    return (
        <>
            <Tooltip title='Detalhes'>
                <IconButton size='large' color='secondary' onClick={handleOpen} ><ArrowBackOutlined /></IconButton>
            </Tooltip>
            <Drawer
                anchor='right'
                open={openDrawer}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        width: 500,
                    }
                }}
            >
                <Box>
                    <Tooltip title='Fechar'>
                        <IconButton size='large' color='secondary' onClick={handleClose} ><ArrowForwardOutlined /></IconButton>
                    </Tooltip>
                    <Divider mt={{ mt: 1, mb: 2 }} />
                </Box>
                <Box m={2}>
                    <Box>
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
                                        pacote?.tentativasDeContato?.map((tentativa, index) => (
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
                                mt: 2
                            }}
                            onClick={handleTentativaContato}
                            endIcon={<Phone />}
                        >
                            Tentativa de Contato
                        </Button>
                    </Box>
                    <Divider sx={{ mt: 2 }} />
                    <Box>
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
                                            pacote?.arquivos?.map((arquivo, index) => (
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
                        <ModalUploadArquivo item={pacote} setItem={setPacote} />
                    </Box>
                    <Divider sx={{ mt: 2 }} />
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Responsável
                                    </TableCell>
                                    <TableCell>
                                        Observação
                                    </TableCell>
                                    <TableCell>
                                        Data/Hora
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            {pacote?.observacoes?.map((observacao, index) => (
                                <TableBody>
                                    <TableRow key={index}>
                                        <TableCell>{observacao.responsavel}</TableCell>
                                        <TableCell>{observacao.observacao}</TableCell>
                                        <TableCell>{moment(observacao.data).format('DD/MM/YYYY HH:mm')}</TableCell>
                                    </TableRow>
                                </TableBody>
                            ))}
                        </Table>
                    </TableContainer>
                    <Box>
                        <ModalAdicionarObs id={id} setOpenToast={setOpenToast} setMessage={setMessage} setSeverity={setSeverity} setPacote={setPacote} />
                    </Box>
                </Box>
            </Drawer>

        </>
    )
}

export default DrawerMaisInfos