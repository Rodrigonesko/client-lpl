import { Container, Select, Tab, Tabs, Typography, MenuItem, TextField, Grid, InputAdornment, FormControl, InputLabel, Box, FormControlLabel, Switch } from "@mui/material"
import Sidebar from "../../../components/Sidebar/Sidebar"
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { getUsers } from "../../../_services/user.service";
import { green, red } from "@mui/material/colors";
import ModalAdicionarUsuario from "./components/ModalAdicionarUsuario";
import { getAllCelulas } from "../../../_services/celula.service";
import TableUsers from "./components/TableUsers";

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
        if (selectedCelula === '') {
            setFilteredUsers(users.filter(user => user.name.toLowerCase().includes(filteredName.toLowerCase())))
        } else {
            setFilteredUsers(users.filter(user => user.name.toLowerCase().includes(filteredName.toLowerCase()) && user.atividadePrincipal === selectedCelula))
        }
    }

    useEffect(() => {
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
        fetchData()
        setFlushHook(false)
    }, [flushHook])

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
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 'bold',
                            position: 'relative',
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                width: '30%',
                                height: '2px',
                                bottom: 0,
                                left: '0%',
                                backgroundColor: 'currentColor',
                                transition: 'width 0.3s ease-in-out, left 0.3s ease-in-out',
                            },
                            '&:hover::after': {
                                width: '100%',
                                left: '0%',
                            },
                        }}
                    >
                        Usuarios
                    </Typography>
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
                    <Grid item xs={12} sm={2} columnSpacing={1} >
                        <FormControl
                            fullWidth
                            sx={{
                                mt: 2,
                            }}
                        >
                            <InputLabel id="demo-simple-select-label">Célula</InputLabel>
                            <Select
                                label="Célula"
                                value={selectedCelula}
                                onChange={(e) => {
                                    setSelectedCelula(e.target.value)
                                    handleFilter()
                                }}
                            >
                                {celulas.map((celula) => (
                                    <MenuItem key={celula._id} value={celula.celula}>{celula.celula}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <TextField
                            placeholder="Pesquisar"
                            sx={{
                                width: '100%',
                                mt: 2,
                            }}
                            value={filteredName}
                            onChange={(e) => {
                                setFilteredName(e.target.value)
                                handleFilter()
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
                />
            </Container>
        </Sidebar>
    )
}

export default Users