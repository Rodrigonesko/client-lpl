import { TableContainer, Table, TableBody, TableRow, TableCell, Typography, Checkbox, FormControlLabel, Radio, FormControl, RadioGroup, TextField, FormLabel } from "@mui/material"
import { useState, useEffect } from "react";

const RoteiroProcessamento = ({ pedidos, formasPagamento, statusFinalizacao }) => {

    console.log(pedidos);

    const [contatoChecked, setContatoChecked] = useState(pedidos[0].contato)
    const [justificativa, setJustificativa] = useState(pedidos[0].justificativa)
    const [motivoContato, setMotivoContato] = useState([])
    const [confirmacaoServico, setConfirmacaoServico] = useState([])
    const [finalizacoes, setFinalizacoes] = useState([])

    const handleChangeContato = (e) => {
        setContatoChecked(e.target.value)
    }

    const handleMotivoContato = (id, reconhece) => {
        if (motivoContato.some(pedido => pedido[0] === id)) {
            const index = motivoContato.findIndex(pedido => pedido[0] === id)
            let arrAux = motivoContato
            arrAux[index] = [id, reconhece]
            setMotivoContato(arrAux)
        } else {
            let arrAux = motivoContato
            arrAux.push([id, reconhece])
            setMotivoContato(arrAux)
        }
    }

    const handleConfirmacaoServico = (id, servico) => {
        if (confirmacaoServico.some(pedido => pedido[0] === id)) {
            const index = confirmacaoServico.findIndex(pedido => pedido[0] === id)
            let arrAux = confirmacaoServico
            arrAux[index] = [id, servico]
            setConfirmacaoServico(arrAux)
        } else {
            let arrAux = confirmacaoServico
            arrAux.push([id, servico])
            setConfirmacaoServico(arrAux)
        }
        console.log(confirmacaoServico);
    }

    const handleFinalizacao = (id, finalizacao) => {
        if (finalizacoes.some(pedido => pedido[0] === id)) {
            const index = finalizacoes.findIndex(pedido => pedido[0] === id)
            let arrAux = finalizacoes
            arrAux[index] = [id, finalizacao]
            setFinalizacoes(arrAux)
        } else {
            let arrAux = finalizacoes
            arrAux.push([id, finalizacao])
            setFinalizacoes(arrAux)
        }
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
                                    console.log(pedido.reconhece);
                                    return (
                                        <FormControl sx={{ m: 1 }}>
                                            <FormLabel>Pedido {pedido.numero}, NF {pedido.nf}, Clínica: {pedido.clinica}, Valor Apresentado: R$ {pedido.valorApresentado}</FormLabel>
                                            <RadioGroup
                                                row
                                                defaultValue={pedido.reconhece && 'Sim'}
                                                onChange={item => handleMotivoContato(pedido._id, item.target.value)}
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
                            {
                                pedidos.filter(pedido => pedido.fase !== 'Finalizado').map(pedido => {
                                    return (
                                        <FormControl sx={{ m: 1 }}>
                                            <FormLabel>Pedido: {pedido.numero}</FormLabel>
                                            <RadioGroup
                                                row
                                                defaultValue={pedido.formaPagamento}
                                                onChange={item => {
                                                    handleConfirmacaoServico(pedido._id, item.target.value)
                                                }}
                                            >
                                                {
                                                    formasPagamento.map(formaPagamento => {
                                                        return (
                                                            <FormControlLabel value={formaPagamento.nome} control={<Radio />} label={formaPagamento.nome} />
                                                        )
                                                    })
                                                }
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
                            5°
                        </TableCell>
                        <TableCell>
                            <Typography fontWeight='bold'>
                                FINALIZAÇÃO
                            </Typography>
                            {
                                pedidos.filter(pedido => pedido.fase !== 'Finalizado').map(pedido => {
                                    return (
                                        <FormControl sx={{ m: 1 }}>
                                            <FormLabel>Pedido: {pedido.numero}</FormLabel>
                                            <RadioGroup
                                                row
                                            >
                                                {
                                                    statusFinalizacao.map(status => {
                                                        return (
                                                            <FormControlLabel value={status.descricao} control={<Radio />} label={status.descricao} />
                                                        )
                                                    })
                                                }
                                            </RadioGroup>
                                        </FormControl>
                                    )
                                })
                            }
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