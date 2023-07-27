import { TableContainer, Table, TableBody, TableRow, TableCell, Typography, Checkbox, FormControlLabel, Radio, FormLabel, FormControl, RadioGroup } from "@mui/material"

const RoteiroProcessamento = ({ pedidos }) => {

    console.log(pedidos);

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
                                >
                                    <FormControlLabel value='Sim' control={<Radio checked={pedidos.houveSucesso === 'Sim'} />} label='Sim' />
                                    <FormControlLabel value='Não' control={<Radio />} label='Não' />
                                    <FormControlLabel value='Necessário Agendar Horario' control={<Radio />} label='Necessário Agendar Horario' />
                                    <FormControlLabel value='Sem Retorno de Contato' control={<Radio />} label='Sem Retorno de Contato' />
                                    <FormControlLabel value='Não foi entrado em contato' control={<Radio />} label='Não foi entrado em contato' />
                                </RadioGroup>
                            </FormControl>
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