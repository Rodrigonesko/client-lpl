import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { green, grey } from "@mui/material/colors";
import { useState } from "react";
import { getAllCelulas } from "../../../../_services/celula.service";
import { useEffect } from "react";
import Toast from "../../../../components/Toast/Toast";
import { createUser } from "../../../../_services/user.service";
import { createAdmissao } from "../../../../_services/admissaoDemissao.service";

const inputStyle = {
    '& label.Mui-focused': {
        color: 'black',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'black',
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: 'black',
        },
    },
}

const ModalAdicionarUsuario = ({ setFlushHook }) => {

    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [sector, setSector] = useState('');
    const [fullName, setFullName] = useState('');
    const [admissionDate, setAdmissionDate] = useState('');
    const [registration, setRegistration] = useState('');
    const [admin, setAdmin] = useState(false);
    const [sectors, setSectors] = useState([]);

    const [openToast, setOpenToast] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        if (name === '' || sector === '' || fullName === '' || admissionDate === '' || registration === '') {
            setSeverity('error');
            setMessage('Preencha todos os campos');
            setOpenToast(true);
            return;
        }
        try {

            const result = await createUser({
                email,
                name,
                atividade: sector,
                nomeCompleto: fullName,
                dataAdmissao: admissionDate,
                matricula: registration,
                administrador: admin
            })

            console.log(result);

            if (result.msg === 'Email ja cadastrado') {
                setSeverity('error');
                setMessage('Email ja cadastrado');
                setOpenToast(true);
                return;
            }

            setSeverity('success');
            setMessage('Usuário criado com sucesso');
            setOpenToast(true);
            setOpen(false);

            await createAdmissao({ _id: result._id })

            setName('');
            setEmail('');
            setSector('');
            setFullName('');
            setAdmissionDate('');
            setRegistration('');
            setAdmin(false);
            setFlushHook(true);

        } catch (error) {
            setSeverity('error');
            setMessage('Algo deu errado na criação do usuário');
            setOpenToast(true);
            return;
        }

    }

    const getSectors = async () => {
        const result = await getAllCelulas()
        console.log(result);
        setSectors(result)
    }

    useEffect(() => {
        getSectors()
    }, [])

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                variant="contained"
                sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: '#000',
                        color: 'white',
                    },
                }}
            >
                Adicionar
            </Button>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle>Adicionar Usuário</DialogTitle>
                <DialogContent>
                    <Box>
                        <TextField
                            label="Nome do Usuário"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            sx={inputStyle}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            label="E-mail"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            sx={inputStyle}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FormControl
                            fullWidth
                            margin="normal"
                            sx={inputStyle}
                        >
                            <InputLabel>Setor</InputLabel>
                            <Select
                                label="Setor"
                                value={sector}
                                onChange={(e) => setSector(e.target.value)}
                            >
                                {sectors.map((sector) => (
                                    <MenuItem key={sector._id} value={sector.celula}>{sector.celula}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label="Nome completo"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            sx={inputStyle}
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        <TextField
                            label="Data Admissão"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={inputStyle}
                            value={admissionDate}
                            onChange={(e) => setAdmissionDate(e.target.value)}
                        />
                        <TextField
                            label="Matricula"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            type="number"
                            sx={inputStyle}
                            value={registration}
                            onChange={(e) => setRegistration(e.target.value)}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    sx={{
                                        color: 'black',
                                        '&.Mui-checked': {
                                            color: 'black',
                                        }
                                    }}

                                />}
                            label="Administrador"
                            value={admin}
                            onChange={(e) => setAdmin(e.target.value)}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpen(false)}
                        variant="contained"
                        sx={{
                            backgroundColor: grey[500],
                            color: 'white',
                            '&:hover': {
                                backgroundColor: grey[700],
                                color: 'white',
                            },
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={() => handleSubmit()}
                        variant="contained"
                        sx={{
                            backgroundColor: green[500],
                            color: 'white',
                            '&:hover': {
                                backgroundColor: green[700],
                                color: 'white',
                            },
                        }}
                    >
                        Cadastrar
                    </Button>
                </DialogActions>
            </Dialog>
            <Toast
                open={openToast}
                onClose={() => setOpenToast(false)}
                severity={severity}
                message={message}
            />
        </>
    );
}

export default ModalAdicionarUsuario;