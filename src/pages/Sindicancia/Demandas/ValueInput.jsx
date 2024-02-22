import MaskedInput from "react-text-mask"
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { Save } from "@mui/icons-material";
import { createValor, getValor } from "../../../_services/sindicancia.service";
import Toast from "../../../components/Toast/Toast";

const defaultMaskOptions = {
    prefix: 'R$ ',
    suffix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: ',',
    decimalLimit: 2,
    integerLimit: 12,
    allowNegative: false,
    allowLeadingZeroes: true
}

function TextMaskCustom(props) {
    const { inputRef, onChange, ...other } = props;

    const numberMask = createNumberMask(defaultMaskOptions);

    const handleChange = (e) => {
        const value = e.target.value;
        onChange({
            target: {
                value: value
            }
        });
    };

    return (
        <MaskedInput
            {...other}
            inputRef={ref => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={numberMask}
            placeholderChar={'\u2000'}
            showMask
            onChange={handleChange}
        />
    );
}

const ValueInput = ({ id }) => {

    const [value, setValue] = useState('R$ ')
    const [periodo, setPeriodo] = useState('')
    const [toast, setToast] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            const result = await getValor(id)
            if (result.id) {
                setValue(`R$ ${result.valor.toFixed(2).replace('.', ',')}`)
                setPeriodo(result.periodo)
            }
            console.log(result);
        }
        fetch()
    }, [])

    const handleSubmit = async () => {
        setLoading(true)
        let valorCorrigido = parseFloat(value.replace('R$ ', '').replaceAll('.', '').replace(',', '.'))
        if (isNaN(valorCorrigido)) {
            valorCorrigido = 0
        }
        console.log(valorCorrigido);
        const data = {
            valor: valorCorrigido,
            periodo,
            id_demanda: id
        }
        if (!periodo) {
            setLoading(false)
            setMessage('Preencha o campo de período!')
            setSeverity('error')
            setToast(true)
            return
        }
        await createValor(data)
        setLoading(false)
        setMessage('Valor cadastrado com sucesso!')
        setSeverity('success')
        setToast(true)
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: '100%'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    width: '100%'
                }}
            >
                <TextField
                    label="Valor"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={value}
                    type="text"
                    onChange={(e) => {
                        setValue(e.target.value)
                    }}
                    InputProps={{
                        inputComponent: TextMaskCustom,
                        onChange: (e) => {
                            setValue(e.target.value);
                        }
                    }}
                    InputLabelProps={{
                        shrink: true
                    }}
                    disabled={loading}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {
                        loading ? <CircularProgress size={'20px'} /> : <Save />
                    }
                </Button>
            </Box>
            <FormControl
                fullWidth
                size="small"
            >
                <InputLabel>Período</InputLabel>
                <Select
                    value={periodo}
                    onChange={(e) => setPeriodo(e.target.value)}
                    label="Período"
                    disabled={loading}
                >
                    <MenuItem>
                        <em>Período</em>
                    </MenuItem>
                    <MenuItem value={"Mensal"}>Mensal</MenuItem>
                    <MenuItem value={"Bimestral"}>Bimestral</MenuItem>
                    <MenuItem value={"Trimestral"}>Trimestral</MenuItem>
                    <MenuItem value={"Semestral"}>Semestral</MenuItem>
                    <MenuItem value={"Anual"}>Anual</MenuItem>
                </Select>
            </FormControl>
            <Toast
                open={toast}
                message={message}
                severity={severity}
                onClose={() => setToast(false)}
            />
        </Box>
    );
};

export default ValueInput