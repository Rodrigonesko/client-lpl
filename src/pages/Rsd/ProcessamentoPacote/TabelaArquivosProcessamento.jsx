import { Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import moment from "moment"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { anexarGravacao } from "../../../_services/rsd.service"

const TabelaArquivosProcessamento = ({ arquivos, flushHook, salvar }) => {

    const { idPacote } = useParams()

    const [open, setOpen] = useState(false)
    const [gravacao, setGravacao] = useState()

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const download = (url, filename) => {
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = filename;
                link.click();
            })
            .catch(console.error);
    }

    const handlerAnexarGravacao = async () => {
        try {

            let formData = new FormData()

            formData.append('file', gravacao, gravacao.name)

            await anexarGravacao(
                formData,
                idPacote
            )

            salvar()
            flushHook(true)
            handleClose()

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box>
            <Typography mt={1} mb={1} p={1} bgcolor='lightgray' borderRadius='5px'>
                Arquivos
            </Typography>
            <TableContainer>
                <Table className="table">
                    <TableHead className="table-header">
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Data</TableCell>
                            <TableCell>Tipo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            arquivos.map(item => {
                                return (
                                    <TableRow key={item._id}>
                                        <TableCell>
                                            <Typography sx={{ color: 'blue', ":hover": { textDecoration: 'underline', cursor: 'pointer' } }}>
                                                <span onClick={() => {
                                                    download(`${process.env.REACT_APP_API_KEY}/rsd/download/${idPacote}/${item.arquivo}`, item.arquivo)
                                                }} >{item.arquivo}</span>
                                            </Typography>
                                        </TableCell>
                                        <TableCell>{moment(item.createdAt).format('DD/MM/YYYY')}</TableCell>
                                        <TableCell>{item.tipo}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Button sx={{ mt: 1, ml: 1 }} variant="contained" size="small" onClick={handleOpen} >Anexar</Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    Anexar gravação
                </DialogTitle>
                <DialogContent>
                    <input type="file" name="gravacao" id="gravacao" onChange={e => setGravacao(e.target.files[0])} />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" size="small" color='inherit' onClick={handleClose}>Fechar</Button>
                    <Button onClick={handlerAnexarGravacao} variant="contained" size="small" autoFocus>
                        Anexar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default TabelaArquivosProcessamento