import { Box, Divider, TextField, Grid, Table, TableHead, TableCell, TableBody, TableRow, Paper, IconButton, Tooltip, Button } from "@mui/material";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Title from "../../../components/Title/Title";
import { deepPurple, indigo, red } from "@mui/material/colors";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPacotesBySegurado, getSeguradoById, getSeguradoByNome, updateSegurado } from "../../../_services/rsdBradesco.service";
import Pacotes from "./components/Pacotes";
import { useForm } from "react-hook-form";
import { ArrowForward, Save } from "@mui/icons-material";
import InputMask from "react-input-mask";
import { calcularIdade } from "../../../functions/functions";
import Toast from "../../../components/Toast/Toast";
import { arrProps } from "./components/arrProps";


const InfoInput = ({ label, value, type, register, disabled }) => {

    const handleClick = async () => {
        try {
            const data = await getSeguradoByNome(value);
            if (!data) return;
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
        >
            {label !== 'Celular' ? <TextField
                disabled={disabled}
                size={'small'}
                label={label}
                type={type}
                {...register}
                fullWidth
                InputLabelProps={{
                    shrink: true,
                    sx: {
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
                    endAdornment: label === 'Nome Titular' &&
                        <Tooltip title={'Ver Titular'} arrow>
                            <IconButton onClick={handleClick} >
                                <ArrowForward />
                            </IconButton>
                        </Tooltip>
                }}
            /> : (
                <CelularInput
                    label={label}
                    register={register}
                />
            )}
        </Grid>
    );
}

const CelularInput = ({ label, register }) => {
    return (
        <InputMask mask="(99) 99999-9999" {...register}>
            {() => <TextField
                {...register}
                label={label}
                size={'small'}
                fullWidth
                InputLabelProps={{
                    shrink: true,
                    sx: {
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
            />}
        </InputMask>
    )
}

const FichaSegurado = () => {

    const { id } = useParams();
    const { register, handleSubmit, setValue, getValues } = useForm();

    const [pacotes, setPacotes] = useState([]);
    const [segurado, setSegurado] = useState();
    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('')

    const onSubmit = async (data) => {
        try {
            if (data.celular) {
                const celular = data?.celular.replace(/\D/g, '');
                if (celular.length < 11 && celular.length > 0) {
                    setMessage('Celular inválido')
                    setSeverity('error')
                    setOpenToast(true)
                    return;
                }
                let wpp = celular ? `whatsapp:+55${celular}` : ''
                setValue('whatsapp', wpp)
            }
            if (data?.dataNascimento) {
                const idade = calcularIdade(data?.dataNascimento)
                setValue('idade', idade)
            }
            await updateSegurado(id, {
                ...data,
                whatsapp: getValues('whatsapp'),
                idade: getValues('idade')
            });
            setMessage('Dados salvos com sucesso')
            setSeverity('success')
            setOpenToast(true)
        } catch (error) {
            console.log(error);
            setMessage('Erro ao salvar dados')
            setSeverity('error')
            setOpenToast(true)
        }
    }

    const isDisabled = (key) => {
        if (key === 'whatsapp' || key === 'idade') return true;
        return false;
    }

    useEffect(() => {
        const fetch = async () => {
            if (!id) return;
            try {
                const data = await getSeguradoById(id);
                const dataPacotes = await getPacotesBySegurado(id);
                setPacotes(dataPacotes);
                arrProps.forEach(prop => {
                    setValue(prop.key, data[prop.key]);
                });
                setValue('celular', data.celular);
                setSegurado(data);
            } catch (error) {
                console.log(error);
                setMessage('Erro ao buscar dados')
                setSeverity('error')
                setOpenToast(true)
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
                <form onSubmit={handleSubmit(onSubmit)} >
                    <Grid
                        container
                        spacing={2}
                        mt={2}
                    >
                        {
                            segurado && arrProps.map((prop, index) => (
                                <InfoInput
                                    key={index}
                                    label={prop.label}
                                    value={segurado[prop.key]}
                                    type={prop.type}
                                    register={register(prop.key)}
                                    disabled={isDisabled(prop.key)}
                                />
                            ))
                        }
                        <InfoInput
                            label={'Celular'}
                            register={register('celular')}
                        />
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                        >
                            <Button
                                type='submit'
                                variant='contained'
                                sx={{
                                    bgcolor: red[900],
                                    color: 'white',
                                    '&:hover': {
                                        bgcolor: red[800]
                                    }
                                }}
                                endIcon={<Save />}
                            >
                                Salvar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Table size="small" sx={{ mb: 5, mt: 3 }}>
                    <TableHead sx={{ background: `linear-gradient(45deg, ${red[800]} 80%, ${deepPurple[700]} 95%)` }}>
                        <TableRow>
                            <TableCell ></TableCell>
                            <TableCell sx={{ color: 'white' }}>Código</TableCell>
                            <TableCell sx={{ color: 'white' }}>Responsável</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Status</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            pacotes.map((pacote) => (
                                <Pacotes
                                    key={pacote}
                                    pacote={pacote}
                                    setPacotes={setPacotes}
                                />
                            ))
                        }

                    </TableBody>
                </Table>
            </Box>
            <Toast
                open={openToast}
                onClose={() => setOpenToast(false)}
                message={message}
                severity={severity}
            />
        </Sidebar>
    );
}

export default FichaSegurado;