import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip, TextField, Grid, FormControl, InputLabel, Select, MenuItem, FormLabel, FormGroup, FormControlLabel, Checkbox, Fade } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import { useEffect, useState } from "react";
import { green, grey } from "@mui/material/colors";
import { updateInfoUser } from "../../../../_services/user.service";
import Toast from "../../../../components/Toast/Toast";
import { createDemissao } from "../../../../_services/admissaoDemissao.service";
import RestaurarSenha from "./RestaurarSenha";

const ModalEditarDados = ({ user, open, handleClose, celulas, setFlushHook }) => {

    const [userData, setUserData] = useState(user);
    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    const handleSubmit = async () => {
        const result = await updateInfoUser({ data: userData });

        if (userData.inativo) {
            await createDemissao({
                _id: userData._id
            })
        }

        if (result.msg === 'ok') {
            setMessage('Dados atualizados com sucesso!');
            setSeverity('success');
            setOpenToast(true);
            handleClose();
            setFlushHook(true);
        } else {
            setMessage('Erro ao atualizar dados!');
            setSeverity('error');
            setOpenToast(true);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setUserData({
            ...userData,
            [name]: value
        })
    }

    useEffect(() => {
        setUserData(user);
    }, [user])

    return (
        <>
            <Dialog
                open={open}
                onClose={() => handleClose()}
                fullWidth
                maxWidth="lg"
            >
                <DialogTitle>
                    Editar dados
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{
                        mt: 2
                    }}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Nome"
                                name="name"
                                value={userData.name}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={userData.email}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Célula</InputLabel>
                                <Select
                                    label="Célula"
                                    name="atividadePrincipal"
                                    value={userData.atividadePrincipal}
                                    onChange={handleInputChange}
                                >
                                    {celulas.map((celula) => (
                                        <MenuItem key={celula._id} value={celula.celula}>{celula.celula}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Nome Completo (mesmo nome do Ponto)"
                                name="nomeCompleto"
                                value={userData.nomeCompleto}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Data de Admissão"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                name="dataAdmissao"
                                value={userData.dataAdmissao}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Data de Nascimento"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                name="dataAniversario"
                                value={userData.dataAniversario}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Matricula"
                                value={userData.matricula}
                                onChange={handleInputChange}
                                name="matricula"
                            />
                        </Grid>
                        <Fade
                            in={userData.atividadePrincipal === 'Tele Entrevista'}
                            timeout={500}
                        >
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="COREN"
                                    value={userData.coren}
                                    onChange={handleInputChange}
                                    name="coren"
                                />
                            </Grid>
                        </Fade>

                    </Grid>
                    {/* Horários de Entrada e Saída */}
                    <Box sx={{
                        mt: 2
                    }}>
                        <Box sx={{ display: 'flex' }}>
                            <TextField
                                type="time"
                                label='1° Entrada'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={{
                                    mr: 2
                                }}
                                name="horarioEntrada1"
                                value={userData.horarioEntrada1}
                                onChange={handleInputChange}
                            />
                            <TextField
                                label='1° Saída'
                                type="time"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={{
                                    mr: 2
                                }}
                                name="horarioSaida1"
                                value={userData.horarioSaida1}
                                onChange={handleInputChange}
                            />
                            <TextField
                                type="time"
                                label='2° Entrada'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={{
                                    mr: 2
                                }}
                                name="horarioEntrada2"
                                value={userData.horarioEntrada2}
                                onChange={handleInputChange}
                            />
                            <TextField
                                type="time"
                                label='2° Saída'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={{
                                    mr: 2
                                }}
                                name="horarioSaida2"
                                value={userData.horarioSaida2}
                                onChange={handleInputChange}
                            />
                        </Box>
                    </Box>
                    {/* Acessos com checkbox */}
                    <Box sx={{
                        mt: 2
                    }}>
                        <FormControl
                            fullWidth
                            component={'fieldset'}
                            variant="standard"
                        >
                            <FormLabel component="legend">Acessos</FormLabel>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox
                                        checked={userData.rsd}
                                    />}
                                    label="RSD"
                                    onChange={() => setUserData({
                                        ...userData,
                                        rsd: !userData.rsd
                                    }
                                    )}

                                />
                                <FormControlLabel
                                    control={<Checkbox
                                        checked={userData.elegibilidade === 'true'}
                                    />}

                                    label="Elegibilidade"
                                    onChange={() => setUserData({
                                        ...userData,
                                        elegibilidade: userData.elegibilidade === 'true' ? 'false' : 'true'
                                    }
                                    )}
                                />
                                <FormControlLabel
                                    control={<Checkbox
                                        checked={userData.enfermeiro === 'true'}
                                    />}
                                    label="Tele Entrevista"
                                    onChange={() => setUserData({
                                        ...userData,
                                        enfermeiro: userData.enfermeiro === 'true' ? 'false' : 'true'
                                    }
                                    )}
                                />
                                <FormControlLabel
                                    control={<Checkbox
                                        checked={userData?.acessos?.agendamento}
                                    />}
                                    label="Agendamento"
                                    onChange={() => setUserData({
                                        ...userData,
                                        acessos: {
                                            ...userData.acessos,
                                            agendamento: !userData.acessos.agendamento
                                        }
                                    }
                                    )}
                                />
                                <FormControlLabel
                                    control={<Checkbox
                                        checked={userData?.acessos?.administrador}
                                    />}
                                    label="Administrador"
                                    onChange={() => setUserData({
                                        ...userData,
                                        acessos: {
                                            ...userData.acessos,
                                            administrador: !userData.acessos.administrador
                                        }
                                    }
                                    )}
                                />
                                <FormControlLabel
                                    control={<Checkbox
                                        checked={userData.deFerias}
                                    />}
                                    label="De férias"
                                    onChange={() => setUserData({
                                        ...userData,
                                        deFerias: !userData.deFerias

                                    }
                                    )}
                                />
                                <FormControlLabel
                                    control={<Checkbox
                                        defaultChecked={user.inativo}
                                        color="error"
                                    />}
                                    label="Inativo"
                                    onChange={() => setUserData({
                                        ...userData,
                                        inativo: !userData.inativo
                                    }
                                    )}
                                />
                            </FormGroup>
                        </FormControl>
                        <Box sx={{
                            mt: 2
                        }}>
                            <RestaurarSenha user={user} />
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => handleClose()}
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
                        Fechar
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
                        Salvar
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
    )
}

export default ModalEditarDados