import { ApiCall } from "./api";
const URL_API = process.env.REACT_APP_API_TELE_KEY
const token = localStorage.getItem('token')


export const showPropostas = async () => {
    return await new ApiCall('/show', URL_API).get()
}

export const uploadPropostas = async (result) => {
    return await new ApiCall('/upload', URL_API).post(result)
}

export const mostrarPropostaPorId = async (id) => {
    return await new ApiCall(`/proposta/${id}`, URL_API).get()
}

export const getPropostasNaoRealizadasTele = async () => {
    return await new ApiCall(`/naoRealizadas`, URL_API).get()
}

export const adicionaCid = async (cid, descricao) => {
    return await new ApiCall('/entrevistas/cid/adicionar').post(cid, descricao)
}

export const getPropostasAgendadas = async () => {
    return await new ApiCall('/agendadas', URL_API).get()
}

export const getRnsAgendadas = async () => {
    return await new ApiCall('/rn/agendadas').get()
}

export const getProposasNaoAgendadas = async () => {
    return await new ApiCall('/naoAgendadas', URL_API).get()
}

export const getRnsNaoAgendadas = async () => {
    return await new ApiCall('/rn/naoAgendadas').get()
}

export const getHorariosDisponiveis = async () => {
    return await new ApiCall('/entrevistas/horarios/disponiveis').get()
}

export const getDiasDisponiveis = async () => {
    return await new ApiCall('/entrevistas/diasDisponiveis').get()
}

export const getHorariosDisponiveisPorDia = async (dia) => {
    return await new ApiCall(`/entrevistas/horariosDisponiveis/${dia}`).get()
}

export const getAnalistasDisponiveis = async (dataEntrevista, horario) => {
    return await new ApiCall(`entrevistas/analistasDisponiveis/${dataEntrevista}/${horario}`).get()
}

export const agendarEntrevista = async (id, responsavel, data, horario) => {
    return await new ApiCall('/entrevistas/agendar').put(id, responsavel, data, horario)
}

export const reagendarEntrevista = async (id) => {
    return await new ApiCall('/entrevistas/reagendar').put(id)
}

export const reagendarRn = async (id) => {
    return await new ApiCall('/rn/reagendar').put(id)
}

export const alterarTelefoneEntrevista = async (data) => {
    return await new ApiCall('/alterarTelefone', URL_API).put(data)
}

export const alterarTelefoneRn = async (id, telefone) => {
    return await new ApiCall('/rn/alterarTelefone').put(id, telefone)
}

export const alterarSexoEntrevista = async (id, sexo) => {
    return await new ApiCall('/alterarSexo', URL_API).put(id, sexo)
}

export const tentativaContatoEntrevista = async (data) => {
    return await new ApiCall('/tentativaContato', URL_API).put(data)
}

export const preencherFormulario = async (data) => {
    return await new ApiCall('/entrevistas/formulario').post(data)
}

export const getPropostasADevolver = async () => {
    return await new ApiCall('/devolverPropostas', URL_API).get()
}

export const gerarHorariosEntrevistas = async (dataGerar) => {
    return await new ApiCall('/entrevistas/gerarHorarios').post(dataGerar)
}

export const excluirRn = async (id) => {
    return await new ApiCall(`/rn/delete/${id}`).delete()
}

export const cancelarRn = async (id) => {
    return await new ApiCall('/rn/cancelar').put(id)
}

export const cancelarEntrevista = async (id, motivoCancelamento) => {
    return await new ApiCall('/entrevistas/cancelar').put(id, motivoCancelamento)
}

export const excluirPropostaEntrevista = async (id) => {
    return await new ApiCall(`/delete/${id}`, URL_API).delete()
}

export const alterarVigenciaProposta = async (id, vigencia) => {
    return await new ApiCall('/alterarVigencia', URL_API).put(id, vigencia)
}

export const rnDuplicada = async (data) => {
    return await new ApiCall('/rn/duplicada').put(data)
}

export const updateRn = async (data) => {
    return await new ApiCall('/rn/rns/update').put(data)
}

export const concluirRn = async (data) => {
    return await new ApiCall('/rn/rns/concluir').put(data)
}

export const tentativaContatoRn = async (data) => {
    return await new ApiCall('/rn/tentativaContato').put(data)
}

export const getInfoRn = async (id) => {
    return await new ApiCall(`/rn/rns/${id}`).get()
}

export const getPedidoRn = async (proposta) => {
    return await new ApiCall(`/rn/pedido/${proposta}`).get()
}

export const getRns = async () => {
    return await new ApiCall('/rn/rns').get()
}

export const uploadRn = async (data) => {
    return await new ApiCall('/rn/upload').post(data)
}

export const filterRn = async (pesquisa) => {
    return await new ApiCall(`/rn/filter/${pesquisa}`).get()
}

export const alterarWhatsapp = async (data) => {
    return await new ApiCall('/alterarWhatsapp', URL_API).put(data)
}

export const mandarParaAtendimentoHumanizado = async (data) => {
    return await new ApiCall('/mandarAtendimentoHumanizado', URL_API).put(data)
}

export const relatorioProducaoTele = async () => {
    return await new ApiCall('/entrevistas/relatorioProducao').get()
}

export const getRendimentoMensalIndividualTele = async (mes, analista) => {
    return await new ApiCall(`/entrevistas/rendimentoIndividualMensal/${mes}/${analista}`).get()
}

export const getRelatorioAnexos = async (date) => {
    return await new ApiCall(`/entrevistas/reportAnexos/${date}`).get()
}

export const getPropostasEntreDatas = async (startDate, endDate, tipoRelatorio) => {
    return await new ApiCall(`/dadosEntreDatas?startDate=${startDate}&endDate=${endDate}&tipoRelatorio=${tipoRelatorio}`, URL_API).get()
}

export const getEntrevistasEntreDatas = async (startDate, endDate) => {
    return await new ApiCall(`/entrevistas/entrevistasEntreDatas?startDate=${startDate}&endDate=${endDate}`).get()
}

export const getEntrevistasEntreDatasAdesao = async (startDate, endDate) => {
    return await new ApiCall(`/entrevistas/entrevistasEntreDatasAdesao?startDate=${startDate}&endDate=${endDate}`).get()
}


export const getProducaoAnexos = async (analista, mes) => {
    return await new ApiCall(`/entrevistas/producao/anexos/${analista}/${mes}`).get()
}

export const getProducaoAgendamento = async (analista, mes) => {
    return await new ApiCall(`/producaoAgendamento/${analista}/${mes}`, URL_API).get()
}

export const uploadImplantacao = async (data) => {
    return await new ApiCall('/entrevistas/uploadImplantacao', process.env.REACT_APP_API_KEY, token, { headers: { "Content-Type": `multipart/form-data; boundary=${data._boundary}` } }).post(data)

}

export const getDataByCpfTitular = async (cpfTitular) => {
    return await new ApiCall(`/cpfTitular/${cpfTitular}`, URL_API).get()
}

export const getDiasDisponiveisAnalista = async (analista) => {
    return await new ApiCall(`/entrevistas/buscarDiasDisponiveis/${analista}`).get()
}

export const getHorariosDisponiveisPorDiaEAnalista = async (dia, analista) => {
    return await new ApiCall(`/entrevistas/buscarHorariosDisponiveis/${analista}/${dia}`).get()
}

export const retrocederEntrevista = async (id) => {
    return await new ApiCall('/entrevistas/voltar').put(id)
}

export const verificarAgendamento = async (data, horario, enfermeiro) => {
    return await new ApiCall(`/entrevistas/verificarAgendamento/${data}/${horario}/${enfermeiro}`).get()
}

export const getRelatorioPropostasPorMesTeleEntrevista = async (mes) => {
    return await new ApiCall(`/entrevistas/relatorioPropostasMes/${mes}`).get()
}

export const getRelatoiroRnUePorMes = async (mes) => {
    return await new ApiCall(`/entrevistas/relatorioRnUePorMes/${mes}`).get()
}

export const getAgendasFechadas = async () => {
    return await new ApiCall('/entrevistas/agendasFechadas').get()
}

export const getRelatorioProdutividadeAnexosMensal = async (mes) => {
    return await new ApiCall(`/entrevistas/relatorioProdutividadeAnexosMensal/${mes}`).get()
}

export const quantidadeAnalistasPorMes = async (dataInicio, dataFim) => {
    return await new ApiCall(`/entrevistas/quantidadeAnalistasPorMes?dataInicio=${dataInicio}&dataFim=${dataFim}`).get()
}

export const filterEntrevistasRealizadas = async ({ pesquisa, page, limit, entrevistaQualidade }) => {
    return await new ApiCall('/entrevistas/filterEntrevistasRealizdas').post({ pesquisa, page, limit, entrevistaQualidade })
}

export const getPropostasAAnexar = async () => {
    return await new ApiCall('/entrevistas/propostas/anexar').get()
}

export const mandarPropostaParaImplantacao = async ({ id }) => {
    return await new ApiCall('/entrevistas/mandarImplatacao').put({ id })
}

export const implantarProposta = async ({ id }) => {
    return await new ApiCall('/entrevistas/implantar').put({ id })
}

export const anexarProposta = async ({ id }) => {
    return await new ApiCall('/entrevistas/anexar').put({ id })
}

export const filterQueryDadosEntrevista = async ({ page, limit, query }) => {
    return await new ApiCall('/entrevistas/filterQueryDadosEntrevistas').post({ page, limit, query })
}

export const getCids = async (cid) => {
    return await new ApiCall(`/entrevistas/cids/pesquisa/${cid}`).get()
}

export const getPerguntas = async () => {
    return await new ApiCall('/entrevistas/perguntas').get()
}

export const getEntrevistasPorMes = async (mes) => {
    return await new ApiCall(`/entrevistas/quantidadeEntrevistasMes/${mes}`).get()
}

export const getProducaoIndividualAnexosPorMes = async (mes, analista) => {
    return await new ApiCall(`/entrevistas/produtividadeAnexosIndividual/${mes}/${analista}`).get()
}

export const getAnaliticoAnexos = async (mes) => {
    return await new ApiCall(`/entrevistas/dadosAnalaticoAnexos/${mes}`).get()
}

export const getProducaoIndividualEntrevistas = async (mes, analista) => {
    return await new ApiCall(`/entrevistas/producaoIndividualTele/${mes}/${analista}`).get()
}

export const getComparativoProducao = async (mes, analista) => {
    return await new ApiCall(`/entrevistas/comparativoProducao/${mes}/${analista}`).get()
}

export const getQuantidadeDivergencias = async (mes, analista) => {
    return await new ApiCall(`/entrevistas/totalDivergencias/${mes}/${analista}`).get()
}

export const getNextCloseSchedules = async () => {
    return await new ApiCall('/entrevistas/nextCloseSchedule').get()
}

export const createNextCloseSchedules = async (data) => {
    return await new ApiCall('/entrevistas/nextCloseSchedule').post(data)
}

export const deleteNextCloseSchedules = async (id) => {
    return await new ApiCall(`/entrevistas/nextCloseSchedule/${id}`).delete()
}

export const divergenciaAnexo = async (data) => {
    return await new ApiCall('/entrevistas/divergenciaAnexo').put(data)
}

export const alterarRetrabalhoEntrevista = async (data) => {
    return await new ApiCall('/entrevistas/retrabalho').put(data)
}


export const getSituacoesAmil = async () => {
    return await new ApiCall('/entrevistas/situacoesAmil').get()
}

export const getTiposContrato = async () => {
    return await new ApiCall('/entrevistas/tiposContrato').get()
}

export const naoImplantadas = async (page, limit) => {
    return await new ApiCall(`/entrevistas/naoImplantadas?page=${page}&limit=${limit}`).get()
}

export const filtrarImplantadas = async (page, limit, situacaoAmil, tipoContrato) => {
    return await new ApiCall(`/entrevistas/filtrarImplantadas?page=${page}&limit=${limit}&situacaoAmil=${situacaoAmil}&tipoContrato=${tipoContrato}`).get()

}

export const fecharHorarios = async ({ data, responsavel, horarios, justiticativa }) => {
    return await new ApiCall('/entrevistas/fecharHorarios').put({ data, responsavel, horarios, justiticativa })
}

export const reabrirHorarios = async ({ data, responsavel, horarios }) => {
    return await new ApiCall('/entrevistas/reabrirHorarios').put({ data, responsavel, horarios })
}