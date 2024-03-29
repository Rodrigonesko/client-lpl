import moment from "moment"

const RelatorioPadraoTele = (propostas, nomeRelatorio) => {
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
    xls += "</tr>"
    xls += "</thead>"
    xls += "<tbody>"

    propostas.forEach(e => {
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
        xls += `</tr>`
    })

    xls += "</tbody></table>"

    var a = document.createElement('a');
    var data_type = 'data:application/vnd.ms-excel';
    a.href = data_type + ', ' + xls.replace(/ /g, '%20');
    a.download = `${nomeRelatorio}.xls`
    a.click()
}

export default RelatorioPadraoTele