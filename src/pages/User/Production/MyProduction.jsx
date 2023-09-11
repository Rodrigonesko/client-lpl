import Sidebar from "../../../components/Sidebar/Sidebar"
import { Container, Box, Paper, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getInfoUser } from "../../../_services/user.service";
import moment from "moment";
import { getProdutividadeMensalRsd } from "../../../_services/rsd.service";
import { getProducaoMensalElegi } from "../../../_services/elegibilidade.service";
import MyProductionTele from "./Celulas/MyProductionTele";
import MyProductionRsd from "./Celulas/MyProductionRsd";
import MyProductionElegi from "./Celulas/MyProductionElegi";

const MyProduction = () => {

    const { name } = useParams()
    const [productionComponent, setProductionComponent] = useState(null)
    const [celula, setCelula] = useState('')
    const [mes, setMes] = useState('')

    const fetchData = async () => {

        const { user } = await getInfoUser()

        if (user.atividadePrincipal === 'Tele Entrevista') {
            setProductionComponent(<MyProductionTele />)
        } else if (user.atividadePrincipal === 'RSD') {
            const result = await getProdutividadeMensalRsd(moment().format('YYYY-MM'), user.name)
        } else if (user.atividadePrincipal === 'Elegibilidade') {
            const result = await getProducaoMensalElegi(moment().format('YYYY-MM'), user.name)
        }
    }

    const handleChange = (event) => {
        setCelula(event.target.value)
    }



    const handleClick = () => {


        // Em seguida, realize as verificações condicionais
        let mesAux = mes;

        if (mesAux === '') {
            mesAux = moment().format('YYYY-MM');
        }

        // Atualize o estado primeiro
        setProductionComponent(null)

        if (celula === 'Tele Entrevista') {
            setProductionComponent(<MyProductionTele key={mesAux} mes={mesAux} />);
        } else if (celula === 'RSD') {
            setProductionComponent(<MyProductionRsd key={mesAux} mes={mesAux} />)
        } else if (celula === 'Elegibilidade') {
            setProductionComponent(<MyProductionElegi key={mesAux} mes={mesAux} />)
        } else if (celula === 'Sindicância') {
            // ...
        } else {
            setProductionComponent(null);
        }
    };

    useEffect(() => {
        fetchData()
    }, [name])

    return (
        <>
            <Sidebar />
            <Container>
                <Typography variant="h5" mt={2}>
                    Bem vindo de volta, {name}!
                </Typography>
                <Typography variant="body2" color='gray' mt={2}>
                    De uma olhada nos seus resultados
                </Typography>
                <Box display='flex' component={Paper} p={1} mt={1} mb={1}>
                    <TextField type='month' size="small" sx={{ mr: '10px' }} focused label='Mês' value={mes} onChange={event => setMes(event.target.value)} />
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
                        </Select>
                    </FormControl>
                    <Button onClick={handleClick} sx={{ mr: '10px' }} variant="contained" >Alterar</Button>
                </Box>
                {
                    productionComponent
                }
            </Container>
        </>
    )
}

export default MyProduction