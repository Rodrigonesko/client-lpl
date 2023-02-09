import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Modal, Box, Typography, Container } from "@mui/material";
import moment from "moment/moment";
import Axios from 'axios'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '5px',
    p: 4,
};


const TabelaAgendarRn = ({ propostas }) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [proposta, setProposta] = useState('');
    const [beneficiario, setBeneficiario] = useState('')
    const [id, setId] = useState('')

    const excluir = async () => {
        try {

            const result = await Axios.delete(`${process.env.REACT_APP_API_KEY}/rn/delete/${id}`, {
                withCredentials: true
            })

            console.log(result);

            if (result.status === 200) {
                window.location.reload()
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container >
            <Typography variant="h4" margin='1rem'>
                Rns: {propostas.length}
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead className='table-header'>
                        <TableRow>
                            <TableCell>Data Vigência</TableCell>
                            <TableCell>Proposta</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Telefone</TableCell>
                            <TableCell>Excluir</TableCell>
                            <TableCell>Formulario</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            propostas.map(row => {
                                return (
                                    <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell>{moment(row.vigencia).format('DD/MM/YYYY')}</TableCell>
                                        <TableCell>{row.proposta}</TableCell>
                                        <TableCell>{row.beneficiario}</TableCell>
                                        <TableCell><TextField size="small" variant="standard" defaultValue={row.telefones}></TextField></TableCell>
                                        <TableCell><Button variant="contained" onClick={() => {
                                            setProposta(row.proposta)
                                            setBeneficiario(row.beneficiario)
                                            setId(row._id)
                                            handleOpen()
                                        }} color="error" size="small">Excluir</Button></TableCell>
                                        <TableCell><Button variant="contained" href={`/rn/rns/${row._id}`} >Formulario</Button></TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                            <Typography variant="h6" component="div">
                                Deseja *EXCLUIR* a proposta: {proposta}
                            </Typography>
                            <Typography variant="h7" component="div" margin='10px'>
                                Do beneficiario: {beneficiario}
                            </Typography>
                            <Typography variant="body2" display='flex' justifyContent='space-around' width='100%' margin='1rem'>
                                <Button variant='contained' onClick={handleClose}>Fechar</Button>
                                <Button color="error" variant='contained' onClick={excluir}>Excluir</Button>
                            </Typography>
                        </Box>
                    </Box>
                </Modal>
            </TableContainer>
        </Container>

    )
}

export default TabelaAgendarRn