import { TableContainer, Table, TableBody, TableRow, TableCell, Typography, Checkbox, FormControlLabel, Radio, FormControl, RadioGroup, TextField, FormLabel } from "@mui/material"
import { useState } from "react";

const RoteiroProcessamento = ({ pedidos }) => {

    console.log(pedidos);

    const [contatoChecked, setContatoChecked] = useState(pedidos[0].contato)
    const [justificativa, setJustificativa] = useState(pedidos[0].justificativa)


    const handleChangeContato = (e) => {
        setContatoChecked(e.target.value)
    }

    return (
        <TableContainer>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            1°
                        </TableCell>
                        <TableCell>
                            <Typography>
                                Houve sucesso no Contato com o beneficiário?
                            </Typography>
                            <FormControl>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    defaultValue={contatoChecked}
                                >
                                    <FormControlLabel value='Sim' control={<Radio onClick={handleChangeContato} />} label='Sim' />
                                    <FormControlLabel value='Não' control={<Radio onClick={handleChangeContato} />} label='Não' />
                                    <FormControlLabel value='Necessário Agendar Horario' control={<Radio onClick={handleChangeContato} />} label='Necessário Agendar Horario' />
                                    <FormControlLabel value='Sem Retorno de Contato' control={<Radio onClick={handleChangeContato} />} label='Sem Retorno de Contato' />
                                    <FormControlLabel value='Não foi entrado em contato' control={<Radio onClick={handleChangeContato} />} label='Não foi entrado em contato' />
                                </RadioGroup>
                            </FormControl>
                            {
                                contatoChecked === 'Não foi entrado em contato' && (
                                    <TextField label='Justificativa' helperText='Justificativa por não entrar em contato' size="small" variant='standard' value={justificativa} onChange={e => setJustificativa(e.target.value)} />
                                )
                            }
                        </TableCell>
                        <TableCell>
                            <Checkbox />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            2°
                        </TableCell>
                        <TableCell>
                            <Typography fontWeight='bold'>
                                SELO CONTATO
                            </Typography>
                            <Typography>
                                Informar nome completo do beneficiário no início do contato. Se identifique como funcionário da Operadora Informar que a ligação é gravada e pedir para confirmar algumas informações, como 3 últimos números do CPF, ano de nascimento e idade.
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Checkbox />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            3°
                        </TableCell>
                        <TableCell>
                            <Typography fontWeight='bold'>
                                MOTIVO CONTATO
                            </Typography>
                            <Typography>
                                Reembolso referente ao atendimento da clínica TAL, realizado no dia XX, no valor de R$ XX. Confirmar se o beneficiário reconhece esse atendimento e cobrança?
                            </Typography>
                            {
                                pedidos.filter(pedido => pedido.fase !== 'Finalizado').map(pedido => {
                                    return (
                                        <FormControl sx={{ m: 1 }}>
                                            <FormLabel>Pedido {pedido.numero}, NF {pedido.nf}, Clínica: {pedido.clinica}, Valor Apresentado: R$ {pedido.valorApresentado}</FormLabel>
                                            <RadioGroup
                                                row
                                                defaultValue='Sim'
                                            >
                                                <FormControlLabel value='Sim' control={<Radio />} label='Sim' />
                                                <FormControlLabel value='Não' control={<Radio />} label='Não' />
                                            </RadioGroup>
                                        </FormControl>
                                    )
                                })
                            }
                        </TableCell>
                        <TableCell>
                            <Checkbox />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            4°
                        </TableCell>
                        <TableCell>
                            <Typography fontWeight='bold'>
                                CONFIRMAÇÃO SERVIÇO
                            </Typography>
                            <Typography>
                                Questionar como foi realizado e solicitar envio do comprovante/declaração em até 5 dias úteis e deixa-lo ciente que o pedido poderá ser cancelado caso a documentação não seja enviada. Questionar ao beneficiário como ficou acordado o pagamento destes serviços junto a clínica:
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Checkbox />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            5°
                        </TableCell>
                        <TableCell>
                            <Typography fontWeight='bold'>
                                FINALIZAÇÃO
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Checkbox>

                            </Checkbox>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )

}

export default RoteiroProcessamento