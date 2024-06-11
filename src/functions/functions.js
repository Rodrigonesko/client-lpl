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

export function diasUteisNoMes(ano, mes) {
    const hoje = moment(); // Obtenha a data de hoje
    const primeiroDia = moment([ano, mes - 1, 1]);
    const ultimoDia = primeiroDia.clone().endOf('month');
    let diasUteis = 0;

    for (let dia = primeiroDia; dia.isSameOrBefore(hoje) && dia.isSameOrBefore(ultimoDia); dia.add(1, 'days')) {
        // Verifique se o dia não é sábado (6) ou domingo (0)
        if (dia.day() !== 0 && dia.day() !== 6) {
            // Verifique se o dia não é um feriado
            const isFeriado = feriados.some((feriado) => dia.isSame(feriado, 'day'));
            if (!isFeriado) {
                diasUteis++;
            }
        }
    }
    return diasUteis;
}

export function ajustarCpf(cpf) {
    cpf = typeof cpf === 'number' ? cpf.toString().replace(/\D/g, '') : cpf.replace(/\D/g, '');
    return cpf.padStart(11, '0');
}

export function ajustarCep(cep) {
    cep = cep.replace(/\D/g, '');
    return cep.padStart(8, '0');
}

export function valueToBRL(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function invertDate(date) {
    return date.split('/').reverse().join('-');
}

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

export function calcularIdade(dataNascimento) {
    return moment().diff(dataNascimento, 'years');
}