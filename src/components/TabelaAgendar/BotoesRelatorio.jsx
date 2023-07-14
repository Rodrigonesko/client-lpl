import React, { useState } from "react";
import { Button, Box, CircularProgress } from "@mui/material";
import moment from "moment/moment";
import 'moment-business-days'
import { getPropostasADevolver, showPropostas } from "../../_services/teleEntrevista.service";

const feriados = [
    moment('2022-01-01'),
    moment('2022-04-21'),
    moment('2022-05-01'),
    moment('2022-09-07'),
    moment('2022-10-12'),
    moment('2022-11-02'),
    moment('2022-11-15'),
    moment('2022-12-25'),
    moment('2023-01-01'),
    moment('2023-02-20'),
    moment('2023-02-21'),
    moment('2023-02-22'),
    moment('2023-04-07'),
    moment('2023-04-21'),
    moment('2023-05-01'),
    moment('2023-06-08'),
    moment('2023-09-07'),
    moment('2023-10-12'),
    moment('2023-11-02'),
    moment('2023-11-15'),
    moment('2023-12-25')
];

function calcularDiasUteis(dataInicio, dataFim, feriados) {
    let diasUteis = 0;
    let dataAtual = moment(dataInicio);

    while (dataAtual.isSameOrBefore(dataFim, 'day')) {
        if (dataAtual.isBusinessDay() && !feriados.some(feriado => feriado.isSame(dataAtual, 'day'))) {
            diasUteis++;
        }
        dataAtual.add(1, 'day');
    }

    return diasUteis - 1;
}

const BotoesRelatorios = () => {

    const [loading, setLoading] = useState(false)

    const relatorioPropostas = async () => {
        try {

            setLoading(true)

            const result = await showPropostas()

            let xls = '\ufeff'
            xls += "<table border='1'>"
            xls += "<thead><tr>"
            xls += "<th>Data Recebimento</th>"
            xls += "<th>Data Vigencia</th>"
            xls += "<th>Proposta</th>"
            xls += "<th>Nome</th>"
            xls += "<th>Cpf</th>"
            xls += "<th>Data Nascimento</th>"
            xls += "<th>Administrador</th>"
            xls += "<th>Risco</th>"
            xls += "<th>Sinistralidade</th>"
            xls += "<th>Divergencia</th>"
            xls += "<th>Cid Irregularidade</th>"
            xls += "<th>Status</th>"
            xls += "<th>Cid Identificado</th>"
            xls += "<th>Data Entrevista</th>"
            xls += "<th>Idade</th>"
            xls += "<th>Sexo</th>"
            xls += "<th>Telefone</th>"
            xls += "<th>DS 1</th>"
            xls += "<th>DS 2</th>"
            xls += "<th>DS 3</th>"
            xls += "<th>DS 4</th>"
            xls += "<th>DS 5</th>"
            xls += "<th>DS 6</th>"
            xls += "<th>DS 7</th>"
            xls += "<th>DS 8</th>"
            xls += "<th>DS 9</th>"
            xls += "<th>Status</th>"
            xls += "<th>Data Conclusão</th>"
            xls += "<th>Tipo Contrato</th>"
            xls += "<th>1° Contato</th>"
            xls += "<th>Responsavel 1° Contato</th>"
            xls += "<th>2° Contato</th>"
            xls += "<th>Responsavel 2° Contato</th>"
            xls += "<th>3° Contato</th>"
            xls += "<th>Responsavel 3° Contato</th>"
            xls += "<th>Dias uteis</th>"
            xls += "<th>Ret</th>"
            xls += "<th>Nome Operadora</th>"
            xls += "<th>Filial</th>"
            xls += "</tr>"
            xls += "</thead>"
            xls += "<tbody>"

            result.propostas.forEach(e => {

                xls += "<tr>"
                xls += `<td>${moment(e.dataRecebimento).format('DD/MM/YYYY')}</td>`
                xls += `<td>${moment(e.vigencia).format('DD/MM/YYYY')}</td>`
                xls += `<td>${e.proposta}</td>`
                xls += `<td>${e.nome}</td>`
                xls += `<td>${e.cpf}</td>`
                xls += `<td>${e.dataNascimento}</td>`
                xls += `<td>${e.administradora}</td>`
                xls += `<td>${e.riscoImc}</td>`
                xls += `<td>${e.sinistral}</td>`
                xls += `<td>${e.divergencia}</td>`
                xls += `<td>${e.cid}</td>`
                xls += `<td>${e.status}</td>`
                xls += `<td>${e.cids}</td>`
                xls += `<td>${e.dataEntrevista}</td>`
                xls += `<td>${e.idade}</td>`
                xls += `<td>${e.sexo}</td>`
                xls += `<td>${e.telefone}</td>`
                xls += `<td>${e.d1?.replaceAll('#', ' ')}</td>`
                xls += `<td>${e.d2?.replaceAll('#', ' ')}</td>`
                xls += `<td>${e.d3?.replaceAll('#', ' ')}</td>`
                xls += `<td>${e.d4?.replaceAll('#', ' ')}</td>`
                xls += `<td>${e.d5?.replaceAll('#', ' ')}</td>`
                xls += `<td>${e.d6?.replaceAll('#', ' ')}</td>`
                xls += `<td>${e.d7?.replaceAll('#', ' ')}</td>`
                xls += `<td>${e.d8?.replaceAll('#', ' ')}</td>`
                xls += `<td>${e.d9?.replaceAll('#', ' ')}</td>`
                xls += `<td>${e.status}</td>`

                if (e.dataConclusao) {
                    xls += `<td>${moment(e.dataConclusao).format('DD/MM/YYYY')}</td>`
                } else {
                    xls += `<td></td>`
                }
                xls += `<td>${e.tipoContrato}</td>`
                e.contato1 ? (
                    xls += `<td>${e.contato1}</td>`
                ) : (
                    xls += `<td></td>`
                )
                e.responsavelContato1 ? (
                    xls += `<td>${e.responsavelContato1}</td>`
                ) : (
                    xls += `<td></td>`
                )

                e.contato2 ? (
                    xls += `<td>${e.contato2}</td>`
                ) : (
                    xls += `<td></td>`
                )

                e.responsavelContato2 ? (
                    xls += `<td>${e.responsavelContato2}</td>`
                ) : (
                    xls += `<td></td>`
                )

                e.contato3 ? (
                    xls += `<td>${e.contato3}</td>`
                ) : (
                    xls += `<td></td>`
                )

                e.responsavelContato3 ? (
                    xls += `<td>${e.responsavelContato2}</td>`
                ) : (
                    xls += `<td></td>`
                )

                let diasUteis = calcularDiasUteis(moment(e.dataRecebimento), moment(e.dataConclusao), feriados)

                if (!e.dataConclusao) {
                    diasUteis = ''
                }

                xls += `<td>${diasUteis}</td>`

                e.retrocedido ? (
                    xls += `<td>${e.retrocedido}</td>`

                ) : (
                    xls += `<td></td>`
                )

                e.nomeOperadora ? (
                    xls += `<td>${e.nomeOperadora}</td>`
                ) : (
                    xls += `<td></td>`
                )

                e.filial ? (
                    xls += `<td>${e.filial}</td>`
                ) : (
                    xls += `<td></td>`
                )

                xls += `</tr>`
            })

            xls += "</tbody></table>"

            var a = document.createElement('a');
            var data_type = 'data:application/vnd.ms-excel';
            a.href = data_type + ', ' + xls.replace(/ /g, '%20');
            a.download = 'Relatório Propostas.xls'
            a.click()

            setLoading(false)


        } catch (error) {
            console.log(error);
        }
    }

    const relatorioNaoRealizadas = async () => {
        try {

            setLoading(true)

            const result = await showPropostas()

            console.log(result);

            const naoRealizadas = result.propostas.filter(e => {
                return e.status !== 'Concluído' && e.status !== 'Cancelado'
            })

            let xls = '\ufeff'
            xls += "<table border='1'>"
            xls += "<thead><tr>"
            xls += "<td>ID</td>"
            xls += "<td>Data Recebimento</td>"
            xls += "<td>Data Vigência</td>"
            xls += "<td>Proposta</td>"
            xls += "<td>Nome</td>"
            xls += "<td>CPF</td>"
            xls += "<td>Agendado</td>"
            xls += "<td>Data Entrevista</td>"
            xls += "<td>Responsável</td>"
            xls += "<td>Tipo de Contrato</td>"
            xls += "<th>1° Contato</th>"
            xls += "<th>Responsavel 1° Contato</th>"
            xls += "<th>2° Contato</th>"
            xls += "<th>Responsavel 2° Contato</th>"
            xls += "<th>3° Contato</th>"
            xls += "<th>Responsavel 3° Contato</th>"
            xls += "<td>"
            xls += "</tr>"
            xls += "</thead>"
            xls += "<tbody>"

            naoRealizadas.forEach(e => {
                xls += "<tr>"
                xls += `<td>${e._id}</td>`
                xls += `<td>${moment(e.dataRecebimento).format('DD/MM/YYYY')}</td>`
                xls += `<td>${moment(e.vigencia).format('DD/MM/YYYY')}</td>`
                xls += `<td>${e.proposta}</td>`
                xls += `<td>${e.nome}</td>`
                xls += `<td>${e.cpf}</td>`
                xls += `<td>${e.agendado}</td>`
                xls += `<td>${e.dataEntrevista}</td>`
                xls += `<td>${e.enfermeiro}</td>`
                xls += `<td>${e.tipoContrato}</td>`
                e.contato1 ? (
                    xls += `<td>${e.contato1}</td>`
                ) : (
                    xls += `<td></td>`
                )
                e.responsavelContato1 ? (
                    xls += `<td>${e.responsavelContato1}</td>`
                ) : (
                    xls += `<td></td>`
                )

                e.contato2 ? (
                    xls += `<td>${e.contato2}</td>`
                ) : (
                    xls += `<td></td>`
                )

                e.responsavelContato2 ? (
                    xls += `<td>${e.responsavelContato2}</td>`
                ) : (
                    xls += `<td></td>`
                )

                e.contato3 ? (
                    xls += `<td>${e.contato3}</td>`
                ) : (
                    xls += `<td></td>`
                )

                e.responsavelContato3 ? (
                    xls += `<td>${e.responsavelContato2}</td>`
                ) : (
                    xls += `<td></td>`
                )
                xls += `</tr>`
            })

            xls += "</tbody></table>"

            var a = document.createElement('a');
            var data_type = 'data:application/vnd.ms-excel';
            a.href = data_type + ', ' + xls.replace(/ /g, '%20');
            a.download = 'Relatório Não Realizadas.xls'
            a.click()

            setLoading(false)

        } catch (error) {
            console.log(error);
        }
    }

    const relatorioDevolver = async () => {
        try {

            setLoading(true)

            const result = await getPropostasADevolver()

            let xls = '\ufeff'
            xls += "<table border='1'>"
            xls += "<thead><tr>"
            xls += "<td>ID</td>"
            xls += "<td>Data Recebimento</td>"
            xls += "<td>Data Vigência</td>"
            xls += "<td>Proposta</td>"
            xls += "<td>Nome</td>"
            xls += "<td>CPF</td>"
            xls += "<td>Agendado</td>"
            xls += "<td>Data Entrevista</td>"
            xls += "<td>Responsável</td>"
            xls += "<td>Tipo de Contrato</td>"
            xls += "<th>1° Contato</th>"
            xls += "<th>Responsavel 1° Contato</th>"
            xls += "<th>2° Contato</th>"
            xls += "<th>Responsavel 2° Contato</th>"
            xls += "<th>3° Contato</th>"
            xls += "<th>Responsavel 3° Contato</th>"
            xls += "<td>"
            xls += "</tr>"
            xls += "</thead>"
            xls += "<tbody>"

            result.forEach(e => {
                xls += "<tr>"
                xls += `<td>${e._id}</td>`
                xls += `<td>${moment(e.dataRecebimento).format('DD/MM/YYYY')}</td>`
                xls += `<td>${moment(e.vigencia).format('DD/MM/YYYY')}</td>`
                xls += `<td>${e.proposta}</td>`
                xls += `<td>${e.nome}</td>`
                xls += `<td>${e.cpf}</td>`
                xls += `<td>${e.agendado}</td>`
                xls += `<td>${e.dataEntrevista}</td>`
                xls += `<td>${e.enfermeiro}</td>`
                xls += `<td>${e.tipoContrato}</td>`
                e.contato1 ? (
                    xls += `<td>${e.contato1}</td>`
                ) : (
                    xls += `<td></td>`
                )
                e.responsavelContato1 ? (
                    xls += `<td>${e.responsavelContato1}</td>`
                ) : (
                    xls += `<td></td>`
                )

                e.contato2 ? (
                    xls += `<td>${e.contato2}</td>`
                ) : (
                    xls += `<td></td>`
                )

                e.responsavelContato2 ? (
                    xls += `<td>${e.responsavelContato2}</td>`
                ) : (
                    xls += `<td></td>`
                )

                e.contato3 ? (
                    xls += `<td>${e.contato3}</td>`
                ) : (
                    xls += `<td></td>`
                )

                e.responsavelContato3 ? (
                    xls += `<td>${e.responsavelContato2}</td>`
                ) : (
                    xls += `<td></td>`
                )
                xls += `</tr>`
            })

            xls += "</tbody></table>"

            var a = document.createElement('a');
            var data_type = 'data:application/vnd.ms-excel';
            a.href = data_type + ', ' + xls.replace(/ /g, '%20');
            a.download = 'Relatório Devolver.xls'
            a.click()

            setLoading(false)

        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    return (
        <Box width='50%' display='flex' justifyContent='space-around' margin='1rem'>
            {
                loading ? (
                    <CircularProgress style={{ position: 'absolute' }} />
                ) : null
            }
            <Button variant='contained' onClick={relatorioPropostas}>Relatório Propostas</Button>
            <Button variant='contained' onClick={relatorioNaoRealizadas}>Relatório Não Realizadas</Button>
            <Button size="small" variant='outlined' onClick={relatorioDevolver} >Devolver Amil</Button>
        </Box>
    )
}

export default BotoesRelatorios