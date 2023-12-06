import { Box, Paper, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import moment from "moment"
import { useState } from "react"


const PrimeiroContato = ({ hookMsg }) => {

    const [modelo, setModelo] = useState('')
    const [data1, setData1] = useState('')
    const [data2, setData2] = useState('')
    const [nome, setNome] = useState('')

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
Atenção: o preenchimento dos horários é feito em tempo real. Caso o horário informado não esteja mais disponível, apresentarei uma nova opção.
Lembrando que em caso de menor de idade a entrevista será realizada com o responsável legal, não necessitando da presença do menor no momento da ligação.`
    }

    const modelo2 = () => {
        return `Prezado Sr.(a) ${nome},
Somos da Área de Implantação da Amil e para concluirmos a contratação do Plano de Saúde do Sr.(a), e dos seus dependentes (caso tenha) precisamos confirmar alguns dados médicos.
Por gentileza, escolha o *NÚMERO* referente a janela de horários para entrarmos em contato com o Sr.(a)
*${moment(data1).format('DD/MM/YYYY')}*
1. Das 08:00 às 10:00
2. Das 10:00 às 12:00
3. Das 12:00 às 14:00
4. Das 14:00 às 16:00
5. Das 16:00 às 18:00
*${moment(data2).format('DD/MM/YYYY')}*
6. Das 08:00 às 10:00
7. Das 10:00 às 12:00
8. Das 12:00 às 14:00
9. Das 14:00 às 16:00
10. Das 16:00 às 18:00
Qual o melhor horário?
Informamos que vamos ligar dos números 11 42404975 ou 42403554, pedimos tirar do spam para evitar bloqueio da ligação. Desde já agradecemos.
Atenção: o preenchimento dos horários é feito em tempo real. Caso o horário informado não esteja mais disponível, apresentarei uma nova opção.
Lembrando que em caso de menor de idade a entrevista será realizada com o responsável legal, não necessitando da presença do menor no momento da ligação.`
    }

    const gerarMensagem = () => {

        let msg = ''

        if (modelo === 'Modelo 1') {
            msg = modelo1()
        }
        if (modelo === 'Modelo 2') {
            msg = modelo2()
        }
        hookMsg(msg)

    }

    return (
        <Box component={Paper} m={1} elevation={3} p={2} >
            <Typography>
                Mensagem padrão
            </Typography>
            <Box mt={1}>
                <FormControl fullWidth size="small">
                    <InputLabel>Modelo</InputLabel>
                    <Select
                        label='Modelo'
                        value={modelo}
                        onChange={e => {
                            setModelo(e.target.value)
                        }}
                    >
                        <MenuItem>
                            <em>Modelo</em>
                        </MenuItem>
                        <MenuItem value='Modelo 1' >Modelo 1</MenuItem>
                        <MenuItem value='Modelo 2' >Modelo 2</MenuItem>
                    </Select>
                </FormControl>
                <TextField style={{ marginTop: '10px' }} label='Nome' onChange={e => setNome(e.target.value)} />
                <TextField style={{ marginTop: '10px' }} type='date' focused label='Data 1' onChange={e => setData1(e.target.value)} />
                <TextField style={{ marginTop: '10px' }} type='date' focused label='Data 2' onChange={e => setData2(e.target.value)} />
                <Button style={{ margin: '10px' }} variant="contained" onClick={gerarMensagem} >Gerar</Button>
            </Box>
        </Box>
    )
}

export default PrimeiroContato