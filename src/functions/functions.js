import moment from "moment";

export const gerarRelatorio = (titles, data, documentName) => {
    /**
* @param {Array} [titles] Array de titulos; EX: ['Proposta', 'Nome'...].
 * @param {Array} data Array de objetos que formam as linhas
 */
    let xls = '\ufeff';
    xls += "<table border='1'><thead><tr>";
    titles.forEach(item => {
        xls += `<th>${item}</th>`;
    });
    data.forEach(item => {
        Object.values(item).forEach(x => {
            xls += `<td>${x || ''}</td>`;
        });
    })
    xls += "</tbody></table>";
    var a = document.createElement('a');
    var data_type = 'data:application/vnd.ms-excel';
    a.href = data_type + ', ' + xls.replace(/ /g, '%20');
    a.download = `${documentName}.xls`
    a.click()

}

export function calcularDiasUteis(dataInicio, dataFim, feriados) {
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