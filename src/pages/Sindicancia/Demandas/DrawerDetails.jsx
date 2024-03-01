import { Add, ArrowForward, Close, Delete, Expand, ExpandMoreOutlined } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, CircularProgress, Drawer, FormControlLabel, FormGroup, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useContext, useState } from "react";
import { BiCollapse } from "react-icons/bi";
import { createBeneficiario, createIrregularidade, createPrestador, deleteBeneficiario, deleteIrregularidade, deletePrestador, getBeneficiarios, getIrregularidade, getPrestadores, getTipoIrregularidade } from "../../../_services/sindicancia.service";
import Toast from "../../../components/Toast/Toast";
import Agenda from "./Agenda";
import ValueInput from "./ValueInput";
import FinalizacaoDemanda from "./FinalizacaoDemanda";
import Complementacao from "./Complementacao";
import AuthContext from "../../../context/AuthContext";

const DrawerDetails = ({ data, setSelectedDemanda }) => {

    const { acessos } = useContext(AuthContext);


    const [demanda, setDemanda] = useState(data);
    const [open, setOpen] = useState(false);
    const [size, setSize] = useState('35%');
    const [beneficiarios, setBeneficiarios] = useState([]);
    const [prestadores, setPrestadores] = useState([]);
    const [novoBeneficiario, setNovoBeneficiario] = useState('');
    const [novoPrestador, setNovoPrestador] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingAddBeneficiario, setLoadingAddBeneficiario] = useState(false);
    const [loadingAddPrestador, setLoadingAddPrestador] = useState(false);
    const [loadingDeleteBeneficiario, setLoadingDeleteBeneficiario] = useState(false);
    const [loadingDeletePrestador, setLoadingDeletePrestador] = useState(false);
    const [tiposIrregularidades, setTiposIrregularidades] = useState([]);
    const [irregularidades, setIrregularidades] = useState([]);
    const [irregularidadeId, setIrregularidadeId] = useState(0);
    const [loadingIrregularidade, setLoadingIrregularidade] = useState(false);
    const [openToast, setOpenToast] = useState(false);
    const [msg, setMsg] = useState('');
    const [severity, setSeverity] = useState('success');
    const [valor, setValor] = useState('');

    const handleOpen = async () => {
        setSelectedDemanda(demanda.id);
        setOpen(true);
        setLoading(true);
        const result = await getBeneficiarios(demanda.id);
        setBeneficiarios(result);
        const result2 = await getPrestadores(demanda.id);
        setPrestadores(result2);
        const result3 = await getTipoIrregularidade();
        setTiposIrregularidades(result3);
        const result4 = await getIrregularidade(demanda.id);
        setIrregularidades(result4);
        setLoading(false);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSize = () => {
        if (size === '35%') {
            setSize('90%');
        } else {
            setSize('35%');
        }
    }

    const handleAddBeneficiario = async () => {
        setLoadingAddBeneficiario(true);
        const result = await createBeneficiario({
            id: demanda.id,
            beneficiario: novoBeneficiario
        })
        if (result.msg === 'ok') {
            setBeneficiarios([...beneficiarios, { nome: novoBeneficiario, id: result.id }]);
            setNovoBeneficiario('');
            setMsg('Beneficiário adicionado com sucesso');
            setSeverity('success');
            setOpenToast(true);
        }
        setLoadingAddBeneficiario(false);
    }

    const handleAddPrestador = async () => {
        setLoadingAddPrestador(true);
        const result = await createPrestador({
            id: demanda.id,
            prestador: novoPrestador
        })
        if (result.msg === 'ok') {
            setPrestadores([...prestadores, { nome: novoPrestador, id: result.id }]);
            setNovoPrestador('');
            setLoadingAddPrestador(false);
            setMsg('Prestador adicionado com sucesso');
            setSeverity('success');
            setOpenToast(true);
        }
    }

    const handleDeleteBeneficiario = async (id) => {
        setLoadingDeleteBeneficiario(true);
        const result = await deleteBeneficiario({
            id
        })
        if (result.msg === 'ok') {
            setBeneficiarios(beneficiarios.filter(b => b.id !== id));
            setMsg('Beneficiário removido com sucesso');
            setSeverity('success');
            setOpenToast(true);
        }
        setLoadingDeleteBeneficiario(false);

    }

    const handleDeletePrestador = async (id) => {
        setLoadingDeletePrestador(true);
        const result = await deletePrestador({
            id
        })
        if (result.msg === 'ok') {
            setPrestadores(prestadores.filter(p => p.id !== id));
            setMsg('Prestador removido com sucesso');
            setSeverity('success');
            setOpenToast(true);
        }
        setLoadingDeletePrestador(false);
    }

    const handleToggleIrregularidade = async (id, irregularidade, idIrregularidade) => {
        setLoadingIrregularidade(true);
        setIrregularidadeId(id);
        if (irregularidades.some(i => i.nome === irregularidade)) {
            const result = await deleteIrregularidade(idIrregularidade)
            if (result.msg === 'ok') {
                setIrregularidades(irregularidades.filter(i => i.nome !== irregularidade));
                setMsg('Irregularidade removida com sucesso');
                setSeverity('success');
                setOpenToast(true);
            }
        } else {
            const result = await createIrregularidade({
                id_demanda: demanda.id,
                nome: irregularidade
            })
            if (result.msg === 'ok') {
                setIrregularidades([...irregularidades, { nome: irregularidade, id: result.id }]);
                setMsg('Irregularidade adicionada com sucesso');
                setSeverity('success');
                setOpenToast(true);
            }
        }
        setLoadingIrregularidade(false);

    }

    return (
        <>
            <IconButton
                size='small'
                onClick={handleOpen}
            >
                <ArrowForward />
            </IconButton>

            <Drawer
                anchor='right'
                open={open}
                onClose={() => setOpen(false)}
                PaperProps={{
                    sx: {
                        width: size,
                    }
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        bgcolor: grey[300],
                        p: 1
                    }}
                >
                    <IconButton
                        onClick={handleSize}
                    >
                        {
                            size === '35%' ? <Expand sx={{ transform: 'rotate(90deg)' }} /> : <BiCollapse />
                        }

                    </IconButton>
                    <IconButton
                        onClick={handleClose}
                    >
                        <Close />
                    </IconButton>
                </Box>
                <Typography variant="h6" sx={{
                    m: 2,
                }}>

                    Detalhes da Demanda {demanda.codigo}
                </Typography>
                <Accordion
                    disabled={loading}
                >
                    <AccordionSummary
                        expandIcon={loading ? <CircularProgress size={'20px'} /> : <ExpandMoreOutlined />}
                    >
                        Beneficiarios {beneficiarios.length}
                    </AccordionSummary>
                    <AccordionDetails>
                        <TableContainer>
                            <Table
                                size="small"
                            >
                                <TableHead
                                    sx={{
                                        bgcolor: grey[200]
                                    }}
                                >
                                    <TableRow>
                                        <TableCell>
                                            Nome
                                        </TableCell>
                                        <TableCell>

                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        beneficiarios.map((beneficiario, index) => (
                                            <TableRow
                                                key={index}
                                            >
                                                <TableCell>
                                                    {beneficiario.nome}
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                >
                                                    <IconButton
                                                        size="small"
                                                        color="error"
                                                        onClick={() => handleDeleteBeneficiario(beneficiario.id)}
                                                        disabled={loadingDeleteBeneficiario}
                                                    >
                                                        <Delete />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>

                            </Table>
                        </TableContainer>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                                mt: 2
                            }}
                        >
                            <TextField
                                placeholder="Nome"
                                size="small"
                                fullWidth
                                variant="standard"
                                value={novoBeneficiario}
                                onChange={(e) => setNovoBeneficiario(e.target.value)}
                                disabled={loadingAddBeneficiario}
                            />
                            <Button
                                variant="contained"
                                size="small"
                                sx={{
                                    ml: 1
                                }}
                                onClick={handleAddBeneficiario}
                                disabled={loadingAddBeneficiario}
                            >
                                {
                                    loadingAddBeneficiario ? <CircularProgress size={'20px'} /> : <Add />
                                }

                            </Button>
                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    disabled={loading}
                >
                    <AccordionSummary
                        expandIcon={loading ? <CircularProgress size={'20px'} /> : <ExpandMoreOutlined />}
                    >
                        Prestadores {prestadores.length}
                    </AccordionSummary>
                    <AccordionDetails>
                        <TableContainer>
                            <Table
                                size="small"
                            >
                                <TableHead
                                    sx={{
                                        bgcolor: grey[200]
                                    }}
                                >
                                    <TableRow>
                                        <TableCell>
                                            Nome
                                        </TableCell>
                                        <TableCell>

                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        prestadores.map((prestador, index) => (
                                            <TableRow
                                                key={index}
                                            >
                                                <TableCell>
                                                    {prestador.nome}
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                >
                                                    <IconButton
                                                        size="small"
                                                        color="error"
                                                        onClick={() => handleDeletePrestador(prestador.id)}
                                                        disabled={loadingDeletePrestador}
                                                    >
                                                        <Delete />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                                mt: 2
                            }}
                        >
                            <TextField
                                placeholder="Nome"
                                size="small"
                                fullWidth
                                variant="standard"
                                value={novoPrestador}
                                onChange={(e) => setNovoPrestador(e.target.value)}
                                disabled={loadingAddPrestador}
                            />
                            <Button
                                variant="contained"
                                size="small"
                                sx={{
                                    ml: 1
                                }}
                                onClick={handleAddPrestador}
                                disabled={loadingAddPrestador}
                            >
                                {
                                    loadingAddPrestador ? <CircularProgress size={'20px'} /> : <Add />
                                }
                            </Button>
                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    disabled={loading}
                >
                    <AccordionSummary
                        expandIcon={loading ? <CircularProgress size={'20px'} /> : <ExpandMoreOutlined />}
                    >
                        Irregularidades
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box>
                            <FormGroup>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        width: '100%',
                                        mt: 1
                                    }}
                                >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={irregularidades.some(i => i.nome === "Sem Irregularidade")}
                                                disabled={loading}
                                            />
                                        }
                                        label={"Sem Irregularidade"}
                                        onChange={() => handleToggleIrregularidade(0, "Sem Irregularidade", irregularidades.find(i => i.nome === "Sem Irregularidade")?.id)}
                                    />
                                    {
                                        loadingIrregularidade && irregularidadeId === 0 ? <CircularProgress size={'20px'} /> : null
                                    }
                                </Box>
                                {
                                    tiposIrregularidades.sort((a, b) => {
                                        if (a.nome > b.nome) {
                                            return 1;
                                        }
                                        if (a.nome < b.nome) {
                                            return -1;
                                        }
                                        return 0;
                                    }).map((tipo, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                width: '100%',
                                                mt: 1
                                            }}
                                        >
                                            <FormControlLabel
                                                key={index}
                                                control={
                                                    <Checkbox
                                                        checked={irregularidades.some(i => i.nome === tipo.nome)}
                                                        disabled={loading}
                                                    />
                                                }
                                                label={tipo.nome}
                                                onChange={() => handleToggleIrregularidade(tipo.id, tipo.nome, irregularidades.find(i => i.nome === tipo.nome)?.id)}
                                            />
                                            {
                                                loadingIrregularidade && irregularidadeId === tipo.id ? <CircularProgress size={'20px'} /> : null
                                            }
                                        </Box>
                                    ))
                                }
                            </FormGroup>
                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Agenda
                    id={demanda.id}
                />
                <Box
                    sx={{
                        display: 'flex',
                        m: 2
                    }}
                >
                    <ValueInput
                        id={demanda.id}
                        value={valor}
                    />
                </Box>
                {
                    acessos.administrador ? <Complementacao data={demanda} setData={setDemanda} /> : null
                }
                <FinalizacaoDemanda
                    demanda={demanda}
                />
            </Drawer>
            <Toast
                message={msg}
                severity={severity}
                open={openToast}
                onClose={() => setOpenToast(false)}
            />
        </>
    )

}

export default DrawerDetails;