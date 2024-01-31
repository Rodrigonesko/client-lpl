import React, { useState, useEffect } from "react";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import { Modal, FormControl, InputLabel, Select, MenuItem, Box, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, CircularProgress, Button } from "@mui/material";
import Axios from 'axios'
import { getCookie } from "react-use-cookie";

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

const ErroAoEnviar = () => {

    const [propostas, setPropostas] = useState([])
    const [loading, setLoading] = useState(false)

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

            setLoading(true)

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/cancelar`, { id: idCancelar, motivoCancelamento: motivoCancelar }, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })

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

            setLoading(true)

            const result = await Axios.delete(`${process.env.REACT_APP_API_TELE_KEY}/delete/${idExcluir}`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })

            if (result.status === 200) {
                window.location.reload()
            }

        } catch (error) {
            console.log(error);
        }
    }


    const tentativaContato = async (tentativa, id) => {
        try {

            setLoading(true)

            console.log(tentativa, id);

            const result = await Axios.put(`${process.env.REACT_APP_API_TELE_KEY}/tentativaContato`, {
                tentativa,
                id
            }, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })

            console.log(result);

            buscarPropostas()

            setLoading(false)

        } catch (error) {
            console.log(error);
        }
    }

    const buscarPropostas = async () => {
        try {

            setLoading(true)

            const result = await Axios.get(`${process.env.REACT_APP_API_TELE_KEY}/erroMensagem`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })

            console.log(result);

            setPropostas(result.data)
            setLoading(false)

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {

        buscarPropostas()

    }, [])

    return (
        <>
            <Sidebar>
                <Box>
                    <Box m={2}>
                        <Typography variant="h5">
                            Problema ao enviar mensagem: {propostas.length}
                        </Typography>
                        {
                            loading ? (
                                <CircularProgress style={{ position: 'absolute', top: '50%', right: '50%' }}></CircularProgress>
                            ) : null
                        }
                        <Box>
                            <TableContainer>
                                <Table className="table">
                                    <TableHead className="table-header">
                                        <TableRow>
                                            <TableCell>Proposta</TableCell>
                                            <TableCell>Nome</TableCell>
                                            <TableCell>Cpf</TableCell>
                                            <TableCell>Cpf Titular</TableCell>
                                            <TableCell>Tipo Associado</TableCell>
                                            <TableCell>Situação</TableCell>
                                            <TableCell>DDD</TableCell>
                                            <TableCell>Celular</TableCell>
                                            <TableCell>Formulario</TableCell>
                                            <TableCell>Contato 1</TableCell>
                                            <TableCell>Contato 2</TableCell>
                                            <TableCell>Contato 3</TableCell>
                                            <TableCell>Cancelar</TableCell>
                                            <TableCell>Excluir</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            propostas.map(e => {
                                                return (
                                                    <TableRow>
                                                        <TableCell>{e.proposta}</TableCell>
                                                        <TableCell>{e.nome}</TableCell>
                                                        <TableCell>{e.cpf}</TableCell>
                                                        <TableCell>{e.cpfTitular}</TableCell>
                                                        <TableCell>{e.tipoAssociado}</TableCell>
                                                        <TableCell>{e.situacao}</TableCell>
                                                        <TableCell>{e.ddd}</TableCell>
                                                        <TableCell>{e.celular}</TableCell>
                                                        <TableCell>
                                                            <Button variant="contained" href={`/entrevistas/formulario/${e._id}`} >
                                                                Formulario
                                                            </Button>
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                e.contato1 ? (
                                                                    <span>{e.contato1}</span>
                                                                ) : (
                                                                    <Button variant='contained' size="small" onClick={() => {
                                                                        tentativaContato('tentativa 1', e._id)
                                                                    }} style={{ background: 'blue' }}>1° Contato</Button>
                                                                )
                                                            }

                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                e.contato2 === undefined && e.contato1 !== undefined ? (
                                                                    <Button variant='contained' size="small" onClick={() => { tentativaContato('tentativa 2', e._id) }} style={{ background: 'blue' }}>2° Contato</Button>
                                                                ) : (
                                                                    <span>{e.contato2}</span>
                                                                )
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                e.contato3 === undefined & e.contato2 !== undefined ? (
                                                                    <Button variant='contained' size="small" onClick={() => { tentativaContato('tentativa 3', e._id) }} style={{ background: 'blue' }}>3° Contato</Button>
                                                                ) : (
                                                                    <span>{e.contato3}</span>
                                                                )
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button variant="contained" onClick={() => {
                                                                setPropostaCancelar(e.proposta)
                                                                setBeneficiarioCancelar(e.nome)
                                                                setIdCancelar(e._id)
                                                                setModalCancelar(true)
                                                            }} color="error" size="small">
                                                                Cancelar
                                                            </Button>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button variant="contained" onClick={() => {
                                                                setPropostaExcluir(e.proposta)
                                                                setBeneficiarioExcluir(e.nome)
                                                                setIdCExcluir(e._id)
                                                                setModalExcluir(true)
                                                            }} color="error" size="small">
                                                                Excluir
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Box>
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
                </Box>
            </Sidebar>
        </>
    )
}

export default ErroAoEnviar