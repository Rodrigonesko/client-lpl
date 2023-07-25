import { ApiCall } from "./api";
const URL_API = process.env.REACT_APP_API_TELE_KEY //'http://localhost:3002' 


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

export const preencherFormulario = async (respostas,
    subRespostas,
    pessoa,
    simOuNao,
    cids,
    divergencia,
    entrevistaQualidade) => {
    return await new ApiCall('/entrevistas/formulario').post(respostas,
        subRespostas,
        pessoa,
        simOuNao,
        cids,
        divergencia,
        entrevistaQualidade)
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