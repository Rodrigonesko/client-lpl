import { useState } from "react"
import { Box, Typography, TextField, Button, Paper } from "@mui/material"
import { getHorariosDisponiveis } from "../../../../../_services/teleEntrevista.service"
import moment from "moment"

const MensagemDiaAnterior = (props) => {

    const [dataDiaAnterior, setDataDiaAnterior] = useState('')

    const handlerSemContatoDiaAnterior = async () => {
        try {

            props.setLoading(true)

            const { obj } = await getHorariosDisponiveis()

            const dataFormatada = moment(dataDiaAnterior).format('DD/MM/YYYY')

            let msg = `Bom dia!
Tentamos contato contigo no horário agendado, porém sem sucesso. Sendo assim, teremos que reagendar. Vou te passar os horários disponíveis atualizados.
Horários disponíveis para o dia ${dataFormatada} -`

            if (obj.hasOwnProperty(dataFormatada)) {
                obj[dataFormatada].forEach(horario => {
                    msg += ` ${horario} -`
                })

            } else {

            }

            msg += ` ⚠️ Atenção: o preenchimento dos horários é feito em tempo real. Caso o horário informado não esteja mais disponível, apresentarei uma nova opção.`

            console.log(msg);

            props.setMensagem(msg)

            props.setLoading(false)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box component={Paper} p={2} m={1} >
            <Typography>
                Mensagem não atenderam dia anterior
            </Typography>
            <Box display='flex'>
                <TextField type='date' size='small' style={{ marginRight: '10px' }} value={dataDiaAnterior} onChange={element => setDataDiaAnterior(element.target.value)} />
                <Button variant='contained' color='secondary' onClick={handlerSemContatoDiaAnterior} >Gerar</Button>
            </Box>
        </Box>
    )
}

export default MensagemDiaAnterior