import { Container, Select, Tab, Tabs, Typography, MenuItem, TextField, Grid, InputAdornment, FormControl, InputLabel, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Avatar, Chip, Box, Button, Divider, Icon, IconButton, Tooltip } from "@mui/material"
import Sidebar from "../../../components/Sidebar/Sidebar"
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { getUsers } from "../../../_services/user.service";
import { green, red } from "@mui/material/colors";
import EditIcon from '@mui/icons-material/Edit';

const Users = () => {

    const [value, setValue] = useState('Todos');
    const [users, setUsers] = useState([])
    const [quantidadeAtivos, setQuantidadeAtivos] = useState(0)
    const [quantidadeInativos, setQuantidadeInativos] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

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

    useEffect(() => {
        const fetchData = async () => {
            const usersFromServer = await getUsers()
            setUsers(usersFromServer)
            setQuantidadeAtivos(usersFromServer.filter(user => user.inativo !== true).length)
            setQuantidadeInativos(usersFromServer.filter(user => user.inativo === true).length)
        }
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
                    <Button
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
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
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
                <TableContainer
                    sx={{
                        mt: 2,
                    }}
                >
                    <Table>
                        <TableHead>
                            <TableRow
                                sx={{
                                    backgroundColor: '#F5F5F5',
                                }}
                            >
                                <TableCell
                                    sx={{
                                        width: 50,
                                    }}
                                ></TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell>Célula</TableCell>
                                <TableCell>Ativo</TableCell>
                                <TableCell>Editar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow
                                    key={user.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell
                                        sx={{
                                            width: 50,
                                        }}
                                    >
                                        <Avatar
                                            alt={user.name}
                                            src={user.avatar}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>
                                            {user.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            {user.email}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>{user.atividadePrincipal}</TableCell>
                                    <TableCell>{user.inativo ? <Chip label='Inativo' sx={{ color: red[800], backgroundColor: red[100] }} /> : <Chip label='Ativo' sx={{ color: green[800], backgroundColor: green[100] }} />}</TableCell>
                                    <TableCell>
                                        <Tooltip title="Editar">
                                            <IconButton>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Sidebar>
    )
}

export default Users