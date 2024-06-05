import { Container, Select, Tab, Tabs, Typography, MenuItem, TextField, Grid, InputAdornment, FormControl, InputLabel, Box, FormControlLabel, Switch, Chip } from "@mui/material"
import Sidebar from "../../../components/Sidebar/Sidebar"
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { getUsers } from "../../../_services/user.service";
import { green, red } from "@mui/material/colors";
import ModalAdicionarUsuario from "./components/ModalAdicionarUsuario";
import { getAllCelulas } from "../../../_services/celula.service";
import TableUsers from "./components/TableUsers";
import Title from "../../../components/Title/Title";

const tabStyle = {
    '&:hover': {
        color: 'gray',
        opacity: 1,
        backgroundColor: '#fff',
    },
    '&.Mui-selected': {
        color: 'black',
        backgroundColor: '#fff',
        fontWeight: 'bold',
    },
    Indicator: {
        backgroundColor: 'black',
    },
    color: 'gray',
    mr: 2,
}

const Users = () => {

    const [value, setValue] = useState('Todos');
    const [flushHook, setFlushHook] = useState(false)
    const [users, setUsers] = useState([])
    const [quantidadeAtivos, setQuantidadeAtivos] = useState(0)
    const [quantidadeInativos, setQuantidadeInativos] = useState(0)
    const [celulas, setCelulas] = useState([])
    const [dense, setDense] = useState(false)
    const [loading, setLoading] = useState(false)
    const [filteredName, setFilteredName] = useState('')
    const [selectedCelula, setSelectedCelula] = useState('')
    const [filteredUsers, setFilteredUsers] = useState([])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const handleFilter = () => {
        let filtered = users

        if (filteredName !== '') {
            filtered = filtered.filter(user => user.name.toLowerCase().includes(filteredName.toLowerCase()))
        }

        if (selectedCelula !== '') {
            filtered = filtered.filter(user => user.atividadePrincipal.toLowerCase().includes(selectedCelula.toLowerCase()))
        }

        if (value === 'Ativos') {
            filtered = filtered.filter(user => user.inativo !== true)
        } else if (value === 'Inativos') {
            filtered = filtered.filter(user => user.inativo === true)
        }

        setFilteredUsers(filtered)
    }

    useEffect(() => {
        handleFilter()
    }, [filteredName, selectedCelula, value, users])

    const fetchData = async () => {
        setLoading(true)
        const usersFromServer = await getUsers()
        const celulasFromServer = await getAllCelulas()
        setUsers(usersFromServer)
        setCelulas(celulasFromServer)
        setQuantidadeAtivos(usersFromServer.filter(user => user.inativo !== true).length)
        setQuantidadeInativos(usersFromServer.filter(user => user.inativo === true).length)
        setFilteredUsers(usersFromServer)
        setLoading(false)
    }


    useEffect(() => {
        const fetch = async () => {
            await fetchData()
            handleFilter()
            setFlushHook(false)
        }
        fetch()
    }, [flushHook])

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <Sidebar>
            <Container>
                <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    sx={{
                        mt: 2,
                    }}
                >
                    <Title size={'medium'}>Usuarios</Title>
                    <ModalAdicionarUsuario setFlushHook={setFlushHook} />
                </Box>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    sx={{
                        mt: 2,
                        '& .MuiTabs-indicator': {
                            width: '100%',
                            backgroundColor: 'black',
                        },
                    }}
                >
                    <Tab
                        value="Todos"
                        label="Todos"
                        icon={
                            <Typography
                                sx={{
                                    color: 'white',
                                    backgroundColor: 'black',
                                    borderRadius: '10%',
                                    padding: '3px',
                                }}
                            >
                                {users.length}
                            </Typography>
                        }
                        iconPosition="end"
                        sx={tabStyle}
                    />
                    <Tab
                        value="Ativos"
                        label="Ativos"
                        sx={tabStyle}
                        icon={
                            <Typography
                                sx={{
                                    color: value === "Ativos" ? 'white' : green[800],
                                    backgroundColor: value === "Ativos" ? green[500] : green[100],
                                    borderRadius: '10%',
                                    padding: '3px',
                                    transition: 'all 0.5s ease',
                                }}
                            >
                                {quantidadeAtivos}
                            </Typography>
                        }
                        iconPosition="end"
                    />
                    <Tab
                        value="Inativos"
                        label="Inativos"
                        icon={
                            <Typography
                                sx={{
                                    color: value === "Inativos" ? 'white' : red[800],
                                    backgroundColor: value === "Inativos" ? red[500] : red[100],
                                    borderRadius: '10%',
                                    padding: '3px',
                                    transition: 'all 0.5s ease',
                                }}
                            >
                                {quantidadeInativos}
                            </Typography>
                        }
                        iconPosition="end"
                        sx={tabStyle}
                    />
                </Tabs>
                <Grid container alignItems="center">
                    <Grid item xs={12} sm={2} columnSpacing={1} sx={{ m: 1 }}>
                        <FormControl
                            fullWidth
                            sx={{
                                mt: 2,
                            }}
                        >
                            <InputLabel>Célula</InputLabel>
                            <Select
                                label="Célula"
                                value={selectedCelula}
                                onChange={(e) => {
                                    setSelectedCelula(e.target.value)
                                }}
                            >
                                <MenuItem value={''}>Todos</MenuItem>
                                {celulas.map((celula) => (
                                    <MenuItem key={celula._id} value={celula.celula}>{celula.celula}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={9} sx={{ m: 2 }}>
                        <TextField
                            placeholder="Pesquisar"
                            sx={{
                                width: '100%',
                                mt: 2,
                            }}
                            value={filteredName}
                            onChange={(e) => {
                                setFilteredName(e.target.value)
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        mt: 2,
                    }}
                >
                    <Typography
                        variant="body2"
                        color="textSecondary"
                    >
                        {filteredUsers.length} {filteredUsers.length === 1 ? 'usuário encontrado' : 'usuários encontrados'}
                    </Typography>
                </Box>
                <Box>
                    {
                        selectedCelula !== '' &&
                        <Chip
                            label={selectedCelula}
                            onDelete={() => setSelectedCelula('')}
                            sx={{
                                mt: 2,
                            }}
                        />
                    }
                    {
                        filteredName !== '' &&
                        <Chip
                            label={filteredName}
                            onDelete={() => setFilteredName('')}
                            sx={{
                                mt: 2,
                            }}
                        />
                    }
                    {
                        value !== 'Todos' &&
                        <Chip
                            label={value}
                            onDelete={() => setValue('Todos')}
                            sx={{
                                mt: 2,
                            }}
                        />
                    }
                </Box>
                <FormControlLabel
                    control={
                        <Switch
                            checked={dense}
                            onChange={(e) => setDense(e.target.checked)}
                            color="success"
                        />
                    }
                    label="Dense"
                    sx={{
                        mt: 2,
                    }}
                />
                <TableUsers
                    users={filteredUsers}
                    dense={dense}
                    loading={loading}
                    setFlushHook={setFlushHook}
                />
            </Container>
        </Sidebar>
    )
}

export default Users