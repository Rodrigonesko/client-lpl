import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Modal, Box, Typography, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
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


const TabelaAgendarTele = ({ propostas }) => {

    const [modalCancelar, setModalCancelar] = useState(false);
    const [modalExcluir, setModalExcluir] = useState(false);

    const [propostaCancelar, setPropostaCancelar] = useState('');
    const [beneficiarioCancelar, setBeneficiarioCancelar] = useState('')
    const [motivoCancelar, setMotivoCancelar] = useState('Sem Sucesso de Contato!')
    const [idCancelar, setIdCancelar] = useState('')

    const [propostaExcluir, setPropostaExcluir] = useState('');
    const [beneficiarioExcluir, setBeneficiarioExcluir] = useState('')
    const [idExcluir, setIdCExcluir] = useState('')

    const cancelar = async () => {
        try {

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/cancelar`, { id: idCancelar, motivoCancelamento: motivoCancelar }, { withCredentials: true })

            console.log(result);

            if (result.status === 200) {
                window.location.reload()
            }

        } catch (error) {
            console.log(error);
        }
    }

    const excluir = async () => {
        try {
            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/proposta/excluir`, { id: idExcluir }, { withCredentials: true })

            if (result.status === 200) {
                window.location.reload()
            }

        } catch (error) {
            console.log(error);
        }
    }

    const alterarVigencia = async (vigencia, id) => {
        try {
            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/propostas/vigencia/update`, { id, vigencia }, { withCredentials: true })

            if (result.status === 200) {
                window.location.reload()
            }

        } catch (error) {
            console.log(error);
        }
    }

    const alterarTelefone = async (telefone, id) => {
        try {

            await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/alterarTelefone`, { id, telefone }, { withCredentials: true })

        } catch (error) {
            console.log(error);
        }
    }

    const alterarSexo = async (id, sexo) => {
        try {
            await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/proposta/alterarSexo`, {
                id,
                sexo
            }, {
                withCredentials: true
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Typography variant='h4' width='100%'>
                Tele: {propostas.length}
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead className='table-header' >
                        <TableRow>
                            <TableCell>Data Vigência</TableCell>
                            <TableCell>Proposta</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Data Nascimento</TableCell>
                            <TableCell>Sexo</TableCell>
                            <TableCell>Telefone</TableCell>
                            <TableCell>Cancelar</TableCell>
                            <TableCell>Excluir</TableCell>
                            <TableCell>Formulario</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            propostas.map(row => {
                                return (
                                    <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell>
                                            <TextField size="small" variant="standard" type='date' defaultValue={row.vigencia} />
                                            <Button size="small" color='warning' variant='contained' onClick={
                                                item => {
                                                    alterarVigencia(item.target.parentElement.firstChild.firstChild.firstChild.value, row._id)
                                                }
                                            }>Alterar</Button>
                                        </TableCell>
                                        <TableCell>{row.proposta}</TableCell>
                                        <TableCell>{row.nome}</TableCell>
                                        <TableCell>{row.dataNascimento}</TableCell>
                                        <TableCell>
                                            <select onChange={item => alterarSexo(row._id, item.target.value)} >
                                                <option value="M" selected={row.sexo === 'M'}>M</option>
                                                <option value="F" selected={row.sexo === 'F'} >F</option>
                                            </select>
                                        </TableCell>
                                        <TableCell>
                                            <TextField size="small" variant="standard" type='tel' defaultValue={row.telefone} onKeyUp={element => alterarTelefone(element.target.value, row._id)} />
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="contained" onClick={() => {
                                                setPropostaCancelar(row.proposta)
                                                setBeneficiarioCancelar(row.nome)
                                                setIdCancelar(row._id)
                                                setModalCancelar(true)
                                            }} color="error" size="small">
                                                Cancelar
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="contained" onClick={() => {
                                                setPropostaExcluir(row.proposta)
                                                setBeneficiarioExcluir(row.nome)
                                                setIdCExcluir(row._id)
                                                setModalExcluir(true)
                                            }} color="error" size="small">
                                                Excluir
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="contained" href={`/entrevistas/formulario/${row._id}`} >
                                                Formulario
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
                <Modal
                    open={modalExcluir}
                    onClose={() => setModalExcluir(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                            <Typography variant="h6" component="div">
                                Deseja *EXCLUIR* a proposta: {propostaExcluir}
                            </Typography>
                            <Typography variant="h7" component="div" margin='10px'>
                                Do beneficiario: {beneficiarioExcluir}
                            </Typography>
                            <Typography variant="body2" display='flex' justifyContent='space-around' width='100%' margin='1rem'>
                                <Button variant='contained' onClick={() => setModalExcluir(false)}>Fechar</Button>
                                <Button color="error" variant='contained' onClick={excluir}>Excluir</Button>
                            </Typography>
                        </Box>
                    </Box>
                </Modal>
                <Modal
                    open={modalCancelar}
                    onClose={() => setModalCancelar(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                            <Typography variant="h6" component="div">
                                Deseja Cancelar a proposta: {propostaCancelar}
                            </Typography>
                            <Typography variant="h7" component="div" margin='10px' marginBottom='30px'>
                                Do beneficiario: {beneficiarioCancelar}
                            </Typography>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Motivo cancelamento</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Motivo cancelamento"
                                    size="small"
                                    onChange={e => {
                                        console.log(e.target.value);
                                        setMotivoCancelar(e.target.value)
                                    }}
                                >
                                    <MenuItem value='Sem Sucesso de Contato!'>Sem Sucesso de Contato!</MenuItem>
                                    <MenuItem value='Beneficiario Solicitou o Cancelamento'>Beneficiario Solicitou o Cancelamento</MenuItem>
                                </Select>
                            </FormControl>
                            <Typography variant="body2" display='flex' justifyContent='space-around' width='100%' margin='1rem'>
                                <Button variant='contained' onClick={() => setModalCancelar(false)}>Fechar</Button>
                                <Button color="error" variant='contained' onClick={cancelar}>Cancelar</Button>
                            </Typography>
                        </Box>
                    </Box>
                </Modal>
            </TableContainer>
        </>

    )
}

export default TabelaAgendarTele