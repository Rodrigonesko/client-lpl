import { Container, Select, Tab, Tabs, Typography, MenuItem, TextField, Grid, InputAdornment } from "@mui/material"
import Sidebar from "../../../components/Sidebar/Sidebar"
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';

const Users = () => {

    const [value, setValue] = useState('Todos');

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
    }

    return (
        <Sidebar>
            <Container>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 'bold',
                        mt: 2,
                    }}
                >
                    Usuarios
                </Typography>
                <Tabs
                    value={value}
                    onChange={handleChange}

                    sx={{
                        mt: 2,
                        '& .MuiTabs-indicator': {
                            width: '100%',
                        },
                    }}
                >
                    <Tab
                        value="Todos"
                        label="Todos"
                        wrapped
                        sx={tabStyle}
                    />
                    <Tab value="Ativos" label="Ativos"
                        sx={tabStyle}
                    />
                    <Tab value="Inativos" label="Inativos"
                        sx={tabStyle}
                    />
                </Tabs>
                <Grid container alignItems="center">
                    <Grid item xs={12} sm={2} columnSpacing={1} >
                        <Select
                            label="Age"
                            sx={{
                                mt: 2,
                                width: '100%',
                            }}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
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
            </Container>
        </Sidebar>
    )
}

export default Users