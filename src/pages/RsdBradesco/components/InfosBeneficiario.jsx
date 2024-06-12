import { useForm } from "react-hook-form";
import { arrProps } from "../FichaSegurado/components/arrProps";
import { Button, Grid, TextField } from "@mui/material";
import { indigo, red } from "@mui/material/colors";
import { Save } from "@mui/icons-material";
import InputMask from "react-input-mask";
import { useEffect, useState } from "react";
import { calcularIdade } from "../../../functions/functions";
import Toast from "../../../components/Toast/Toast";

const InfoInput = ({ label, type, register, disabled, value, getValues, setValue }) => {
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
                    }
                }}
            /> : (
                <CelularInput
                    label={label}
                    value={value}
                    setValue={setValue}
                    getValues={getValues}
                />
            )}
        </Grid>
    );
}

const CelularInput = ({ label, setValue, getValues, value }) => {

    const [celular, setCelular] = useState(value)

    useEffect(() => {
        setValue('celular', celular)
    }, [celular])

    return (
        <div>
            <InputMask
                mask="(99) 99999-9999"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
            >
                {() => <TextField
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
                        }
                    }}
                />}
            </InputMask>
        </div>
    )
}

const InfosBeneficiario = ({ info, updateInfo }) => {

    const { register, handleSubmit, setValue, getValues } = useForm();

    const [openToast, setOpenToast] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('')

    const isDisabled = (key) => {
        if (key === 'whatsapp' || key === 'idade') return true;
        return false;
    }

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
            await updateInfo(info._id, {
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

    useEffect(() => {
        if (info) {
            arrProps.forEach(prop => {
                setValue(prop.key, info[prop.key])
            })
        }
    }, [info])

    return (
        <form>
            <Grid
                container
                spacing={2}
                mt={2}
            >
                {
                    info && arrProps.map((prop, index) => (
                        <InfoInput
                            key={index}
                            label={prop.label}
                            type={prop.type}
                            register={register(prop.key)}
                            disabled={isDisabled(prop.key)}
                            value={info[prop.key]}
                            getValues={getValues}
                            setValue={setValue}
                        />
                    ))
                }
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
                        onClick={handleSubmit(onSubmit)}
                    >
                        Salvar
                    </Button>
                </Grid>
            </Grid>
            <Toast
                open={openToast}
                onClose={() => setOpenToast(false)}
                message={message}
                severity={severity}
            />
        </form>
    )
}

export default InfosBeneficiario