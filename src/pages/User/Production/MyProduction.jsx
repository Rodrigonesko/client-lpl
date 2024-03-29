import Sidebar from "../../../components/Sidebar/Sidebar"
import { Container, Box, Paper, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { useEffect, useState, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { getInfoUser } from "../../../_services/user.service";
import moment from "moment";
import MyProductionTele from "./Celulas/MyProductionTele";
import MyProductionRsd from "./Celulas/MyProductionRsd";
import MyProductionElegi from "./Celulas/MyProductionElegi";
import Chart from "react-google-charts";
import AuthContext from "../../../context/AuthContext";
import ProducaoIndividualAgendamento from "../../../components/ProducaoIndividual/ProducaoIndividualAgendamento";
import ProducaoIndividualTele from "../../../components/ProducaoIndividual/ProduçãoIndividualTele/ProducaoIndividualTele";
import ProducaoIndividualElegi from "../../../components/ProducaoIndividual/ProducaoIndividualElegi/ProducaoIndividualElegi";
import ProducaoIndividualRsd from "../../../components/ProducaoIndividual/ProducaoIndividualRsd/ProducaoIndividual";

const MyProduction = () => {

    const { name } = useParams()
    const context = useContext(AuthContext)
    const navigate = useNavigate()
    const [productionComponent, setProductionComponent] = useState(null)
    const [celula, setCelula] = useState('')
    const [mes, setMes] = useState('')

    const handleChange = (event) => {
        setCelula(event.target.value)
    }

    const handleClick = () => {

        let mesAux = mes;
        if (mesAux === '') {
            mesAux = moment().format('YYYY-MM');
        }
        setProductionComponent(null)
        if (celula === 'Tele Entrevista') {
            setProductionComponent(<ProducaoIndividualTele key={mesAux} mes={mesAux} />);
        } else if (celula === 'RSD') {
            setProductionComponent(<ProducaoIndividualRsd mes={mesAux} key={mesAux} />)
        } else if (celula === 'Elegibilidade') {
            setProductionComponent(<ProducaoIndividualElegi key={mesAux} mes={mesAux} />)
        } else if (celula === 'Sindicância') {
            // ...
        } else if (celula === 'Agendamento') {
            setProductionComponent(<ProducaoIndividualAgendamento key={mesAux} mes={mesAux} />)
        } else {
            setProductionComponent(null);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (context.authToken) {
                if (context.name !== name && context.accessLevel !== 'true') {
                    navigate('/')
                }
            }
            const { user } = await getInfoUser()
            if (user.atividadePrincipal === 'Tele Entrevista') {
                setProductionComponent(<MyProductionTele />)
            } else if (user.atividadePrincipal === 'RSD') {
                setProductionComponent(<MyProductionRsd />)
            } else if (user.atividadePrincipal === 'Elegibilidade') {
                setProductionComponent(<MyProductionElegi />)
            }
        }

        fetchData()
    }, [name, context, navigate])

    return (

        <Sidebar>
            <Container>
                <Typography variant="h5" mt={2}>
                    Bem vindo de volta, {name}!
                </Typography>
                <Typography variant="body2" color='gray' mt={2}>
                    De uma olhada nos seus resultados
                </Typography>
                <Box display='flex' elevation={7} p={1} mt={1} mb={1}>
                    <TextField
                        type='month'
                        size="small"
                        sx={{ mr: '10px' }}
                        label='Mês'
                        value={mes}
                        onChange={event => setMes(event.target.value)}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <FormControl sx={{ width: '200px', mr: '10px' }} size="small">
                        <InputLabel>Célula</InputLabel>
                        <Select
                            label="Célula"
                            onChange={handleChange}
                        >
                            <MenuItem>
                                <em>
                                    Célula
                                </em>
                            </MenuItem>
                            <MenuItem value={'Tele Entrevista'}>Tele Entrevista</MenuItem>
                            <MenuItem value={'RSD'}>RSD</MenuItem>
                            <MenuItem value={'Sindicância'}>Sindicância</MenuItem>
                            <MenuItem value={'Elegibilidade'}>Elegibilidade</MenuItem>
                            <MenuItem value={'Agendamento'}>Agendamento</MenuItem>
                        </Select>
                    </FormControl>
                    <Button onClick={handleClick} sx={{ mr: '10px' }} variant="contained" >Alterar</Button>
                </Box>
                {
                    productionComponent
                }
            </Container>
            <Chart style={{ display: 'none' }} />
        </Sidebar>

    )
}

export default MyProduction