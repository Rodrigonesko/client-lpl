import { Box, Button, FormControl, FormControlLabel, FormLabel, Popover, Radio, RadioGroup, TextField, Tooltip, Typography } from "@mui/material"
import ReviewsIcon from '@mui/icons-material/Reviews';
import { useState } from "react";
import moment from "moment";

const MensagemPadrao = ({ setMessage, nome }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [modelo, setModelo] = useState('1')
    const [data1, setData1] = useState('')
    const [data2, setData2] = useState('')

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleGerarMensagem = () => {
        let msg = ''

        if (modelo === '1') {
            msg = modelo1()
        }
        if (modelo === '2') {
            msg = modelo2()
        }

        setMessage(msg)
        handleClose()
    }

    const modelo1 = () => {
        return `Prezado Sr.(a) ${nome},
Somos da Área de Implantação da Amil e para concluirmos a contratação do Plano de Saúde do Sr.(a), e dos seus dependentes (caso tenha) precisamos confirmar alguns dados médicos.
Por gentileza, escolha o *NÚMERO* referente a janela de horários para entrarmos em contato com o Sr.(a)
*${moment(data1).format('DD/MM/YYYY')}*
1. Das 12:00 às 14:00
2. Das 14:00 às 16:00
3. Das 16:00 às 18:00
*${moment(data2).format('DD/MM/YYYY')}*
4. Das 08:00 às 10:00
5. Das 10:00 às 12:00
6. Das 12:00 às 14:00
7. Das 14:00 às 16:00
8. Das 16:00 às 18:00
Qual o melhor horário?
Informamos que vamos ligar dos números 11 42404975 ou 42403554, pedimos tirar do spam para evitar bloqueio da ligação. Desde já agradecemos.
Atenção: o preenchimento dos horários é feito em tempo real. Caso o horário informado não esteja mais disponível, apresentarei uma nova opção.`
    }

    const modelo2 = () => {
        return `Prezado Sr.(a) ${nome},
Somos da Área de Implantação da Amil e para concluirmos a contratação do Plano de Saúde do Sr.(a), e dos seus dependentes (caso tenha) precisamos confirmar alguns dados médicos.
Por gentileza, escolha o *NÚMERO* referente a janela de horários para entrarmos em contato com o Sr.(a)
*${moment(data1).format('DD/MM/YYYY')}*
4. Das 08:00 às 10:00
5. Das 10:00 às 12:00
6. Das 12:00 às 14:00
7. Das 14:00 às 16:00
8. Das 16:00 às 18:00
*${moment(data2).format('DD/MM/YYYY')}*
4. Das 08:00 às 10:00
5. Das 10:00 às 12:00
6. Das 12:00 às 14:00
7. Das 14:00 às 16:00
8. Das 16:00 às 18:00
Qual o melhor horário?
Informamos que vamos ligar dos números 11 42404975 ou 42403554, pedimos tirar do spam para evitar bloqueio da ligação. Desde já agradecemos.
Atenção: o preenchimento dos horários é feito em tempo real. Caso o horário informado não esteja mais disponível, apresentarei uma nova opção.`
    }


    return (
        <>
            <Tooltip title='Mensagem padrão'>
                <Button onClick={handleClick} aria-describedby={id} sx={{ marginLeft: '10px' }} variant="contained" size="small">
                    <ReviewsIcon />
                </Button>
            </Tooltip>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box p={1} display={'flex'} flexDirection={'column'} width={'300px'}>
                    <FormControl sx={{ m: 1 }}>
                        <FormLabel id="demo-row-radio-buttons-group-label">Modelo</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={modelo}
                            onChange={e => setModelo(e.target.value)}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="1" />
                            <FormControlLabel value="2" control={<Radio />} label="2" />
                        </RadioGroup>
                    </FormControl>
                    <TextField value={data1} onChange={e => setData1(e.target.value)} size="small" focused sx={{ m: 1 }} label='Data 1' type="date" />
                    <TextField value={data2} onChange={e => setData2(e.target.value)} size="small" focused sx={{ m: 1 }} label='Data 2' type="date" />
                    <Button onClick={handleGerarMensagem} variant="contained">
                        Gerar
                    </Button>
                </Box>
            </Popover>
        </>
    )
}

export default MensagemPadrao