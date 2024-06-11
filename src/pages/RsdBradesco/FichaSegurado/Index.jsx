import { Box, Divider, TextField, Grid } from "@mui/material";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Title from "../../../components/Title/Title";
import { indigo, red } from "@mui/material/colors";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPacotesBySegurado, getSeguradoById } from "../../../_services/rsdBradesco.service";
import Pacotes from "./components/Pacotes";

const arrProps = [
    {
        label: 'CPF',
        value: '123.456.789-00',
        type: 'text'
    },
    {
        label: 'Telefone',
        value: '1234-5678',
        type: 'text'
    },
    {
        label: 'Email',
        value: '',
        type: 'email'
    },
    {
        label: 'Codigo Carteirinha',
        value: '',
        type: 'text'
    },
    {
        label: 'Nome',
        value: '',
        type: 'text'
    },
    {
        label: 'Codigo Titular',
        value: '',
        type: 'text'
    },
    {
        label: 'Nome Titular',
        value: '',
        type: 'text'
    },
    {
        label: 'Data Nascimento',
        value: '01/01/2000',
        type: 'date'
    },
    {
        label: 'Idade',
        value: '21',
        type: 'number'
    },
    {
        label: 'Whatsapp',
        value: '',
        type: 'text'
    }
]

const InfoInput = ({ label, value, type }) => {
    return (
        <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
        >
            <TextField
                size={'small'}
                label={label}
                type={type}
                fullWidth
                InputLabelProps={{
                    shrink: type === 'date' ? true : undefined,
                    sx: {
                        color: 'grey.800',
                        '&.Mui-focused': {
                            color: indigo[900],
                        },
                    },
                }}
                InputProps={{
                    sx: {
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: indigo[900],
                        },
                    },
                }}
            />
        </Grid>
    );
}

const FichaSegurado = () => {

    const { id } = useParams();
    const [pacotes, setPacotes] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            if (!id) return;
            try {
                const data = await getSeguradoById(id);
                const dataPacotes = await getPacotesBySegurado(id);
                setPacotes(dataPacotes);
                console.log(dataPacotes, data);
            } catch (error) {
                console.log(error);
            }
        }
        fetch();
    }, [id])

    return (
        <Sidebar>
            <Box
                m={2}
            >
                <Title
                    size={'medium'}
                    fontColor={indigo[900]}
                    lineColor={red[700]}
                >
                    Ficha do Segurado
                </Title>
                <Divider />
                <Grid
                    container
                    spacing={2}
                    mt={2}
                >
                    {
                        arrProps.map((prop, index) => (
                            <InfoInput
                                key={index}
                                label={prop.label}
                                value={prop.value}
                                type={prop.type}
                            />
                        ))
                    }
                </Grid>
                <Pacotes pacotes={pacotes} setPacotes={setPacotes} />
            </Box>

        </Sidebar>
    );
}

export default FichaSegurado;