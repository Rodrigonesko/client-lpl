import { Autocomplete, Box, Container, Divider, Tab, Tabs, TextField, Typography } from "@mui/material"
import Sidebar from "../../components/Sidebar/Sidebar"
import { useEffect, useState } from "react"
import TabelaAdmissional from "./Tabela/TabelaAdmissional"
import TabelaDemissional from "./Tabela/TabelaDemissional"
import { getUsers } from "../../_services/user.service"

const AdmissionalDemissional = () => {

    const [user, setUser] = useState({})
    const [flushHook, setFlushHook] = useState(false)
    // const [loading, setLoading] = useState(false)
    const [tipoExame, setTipoExame] = useState('')
    const [nomes, setNomes] = useState([])

    useEffect(() => {
        const buscarNomes = async () => {
            try {
                const result = await getUsers()
                setNomes(result)
                console.log(result)
            } catch (error) {
                console.log(error);
            }
        }
        buscarNomes()
    }, [])

    const handleChange = (e, newValue) => {
        setTipoExame(newValue)

        setFlushHook(true)
        console.log(e);
    }

    useEffect(() => {
        setFlushHook(false)
    }, [flushHook, setFlushHook])

    return (
        <>
            <Sidebar>
                <Container maxWidth>
                    <div className="title">
                        <h2>Admissional / Demissional</h2>
                    </div>
                    <br />
                    <Box display='flex'>
                        <Autocomplete
                            size="small"
                            disablePortal
                            id="nome-auto-complete"
                            options={nomes}
                            onChange={(event, item) => {
                                setUser(item);
                            }}
                            getOptionLabel={nomes => nomes.name}
                            sx={{ width: 400 }}
                            renderInput={(params) => <TextField {...params} label='Nome' />}
                        />
                    </Box>
                    <br />
                    <Divider />
                    <Box >
                        <br />
                        <Typography>Nome do colaborador: {user.name} | Número do colaborador: {user.numero} | E-mail do colaborador: {user.email}</Typography>
                    </Box>
                    <br />
                    <Divider />
                    <br />
                    <Box sx={{ width: '100%' }}>
                        <Tabs value={tipoExame} onChange={handleChange} aria-label="wrapped label tabs example" >
                            <Tab value="admissional" label="Admissional" />
                            <Tab value="demissional" label="Demissional" />
                        </Tabs>
                        {
                            tipoExame === 'admissional' ? (
                                <TabelaAdmissional user={user} key={user._id} setUser={setUser} />
                            ) : tipoExame === 'demissional' ? (
                                <TabelaDemissional user={user} key={user._id} setUser={setUser} />
                            ) : (
                                <>
                                </>
                            )
                        }
                    </Box>
                </Container >
            </Sidebar >
        </>
    )
}

export default AdmissionalDemissional