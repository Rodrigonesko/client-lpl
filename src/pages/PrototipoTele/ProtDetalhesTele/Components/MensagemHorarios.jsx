import { Box, Button, Popover, TextField, Tooltip } from "@mui/material"
import WarningIcon from '@mui/icons-material/Warning';
import { useState } from "react";
import { getHorariosDisponiveis } from "../../../../_services/teleEntrevista.service";
import moment from "moment";

const MensagemHorarios = ({ setMessage }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [data, setData] = useState('')

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleGerarMensagem = async () => {
        const { obj } = await getHorariosDisponiveis()
        const dataFormatada = moment(data).format('DD/MM/YYYY')
        let msg = `Bom dia!
Tentamos contato contigo no horário agendado, porém sem sucesso. Sendo assim, teremos que reagendar. Vou te passar os horários disponíveis atualizados.
Horários disponíveis para o dia ${dataFormatada} -`

        if (obj.hasOwnProperty(dataFormatada)) {
            obj[dataFormatada].forEach(horario => {
                msg += ` ${horario} -`
            })
        }
        msg += ` ⚠️ Atenção: o preenchimento dos horários é feito em tempo real. Caso o horário informado não esteja mais disponível, apresentarei uma nova opção.`
        setMessage(msg)
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <Tooltip title='Mensagem Horários'>
                <Button onClick={handleClick} color="secondary" sx={{ marginLeft: '10px' }} variant="contained" size="small">
                    <WarningIcon />
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
                    <TextField value={data} color="secondary" onChange={e => setData(e.target.value)} size="small" focused sx={{ m: 1 }} label='Data' type="date" />
                    <Button onClick={handleGerarMensagem} color="secondary" variant="contained">
                        Gerar
                    </Button>
                </Box>
            </Popover>
        </>
    )
}

export default MensagemHorarios