import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip, TextField, Grid, FormControl, InputLabel, Select, MenuItem, FormLabel, FormGroup, FormControlLabel, Checkbox } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import { useState } from "react";
import { green, grey } from "@mui/material/colors";
import { getAllCelulas } from "../../../../_services/celula.service";

const ModalEditarDados = ({ user }) => {

    /*
    accessLevel
: 
"true"
acessos
: 
{agendamento: true}
admissao
: 
[]
atividadePrincipal
: 
"Sindicância"
bancoHoras
: 
""
dataAdmissao
: 
"2022-04-11"
dataAniversario
: 
"1989-07-06"
dataBancoHoras
: 
"2023-12-04"
demissao
: 
[]
elegibilidade
: 
"false"
email
: 
"fribeiro@lplseguros.com.br"
enfermeiro
: 
"false"
firstAccess
: 
"Não"
horarioSaida
: 
"2023-12-22 17:24"
horarioSaida2
: 
"17:30"
liminares
: 
"true"
liminaresAj
: 
"false"
name
: 
"Fernanda Ribeiro"
nomeCompleto
: 
"Fernanda Aparecida Ribeiro"
online
: 
true
password
: 
"$2b$08$E.zqQ/yOi5NI0.jm5FJD6OaflO.M7ZKchxV9lTkKGj93fHeMK6qDy"
politicasLidas
: 
(6) ['64b6974349ad1d342bdcd93f', '64d673cb372904acc9402ffc', '64de5a79372904acc94232ed', '64f77445080c3c20759642e3', '65392e627ae401d0ed955efb', '6581c7ba0f9ff738fe9629b2']
prorrogacao
: 
true
socketId
: 
"q_PZZsfM1rt3tt5ZAF6R"
treinamentos
: 
(7) ['650c458b9c387a21e94dc757', '650c459c9c387a21e94dc772', '650c4bfe9c387a21e94dd0fd', '652d32ecbbda8c10aeeeaa8b', '652d32ecbbda8c10aeeeaa8b', '652d411bbbda8c10aeeebd1e', '652d411bbbda8c10aeeebd1e']
vencimentoFerias
: 
(2) [{…}, {…}]
_id
: 
"6332e7608016397133492a40"
    */

    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState(user);
    const [celulas, setCelulas] = useState([]);

    const handleClickOpen = async () => {
        setOpen(true);
        const result = await getAllCelulas()
        setCelulas(result)
    };

    const handleSubmit = () => {
        console.log(userData)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setUserData({
            ...userData,
            [name]: value
        })
    }

    return (
        <>
            <Tooltip title="Editar">
                <IconButton
                    onClick={handleClickOpen}
                >
                    <EditIcon />
                </IconButton>
            </Tooltip>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
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
                                defaultValue={user.matricula}

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="COREN"
                                defaultValue={user.coren}
                            />
                        </Grid>
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
                                value={userData.horarioEntrada}
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
                                    control={<Checkbox />}
                                    label="RSD"

                                />
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Elegibilidade"
                                />
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Tele Entrevista"
                                />
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Agendamento"
                                />
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Administrador"
                                />
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="De férias"
                                />
                                <FormControlLabel
                                    control={<Checkbox
                                        defaultChecked={user.inativo}
                                        color="error"
                                    />}
                                    label="Inativo"
                                />
                            </FormGroup>
                        </FormControl>
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
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalEditarDados