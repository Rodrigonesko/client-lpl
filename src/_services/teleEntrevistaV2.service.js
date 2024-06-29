import { ApiCall } from "./api";
const URL_API = 'http://localhost:3001'

/* Propostas */

export const getPropostasByStatus = async (status) => {
    return await new ApiCall(`/newPropostaEntrevista/status/${status}`, URL_API).get()
}

export const getPropostasByAgendamento = async (agendamento, sort, pesquisa, responsavel, limit, page) => {
    return await new ApiCall(`/newPropostaEntrevista/agendamento?agendamento=${agendamento}&sort=${sort}&pesquisa=${pesquisa}&responsavel=${responsavel}&limit=${limit}&page=${page}`, URL_API).get()
}

export const updatePropostaEntrevista = async (data) => {
    return await new ApiCall(`/newPropostaEntrevista/${data._id}`, URL_API).put(data)
}

/* Dados Entrevista  */

export const finalizarEntrevista = async (data) => {
    return await new ApiCall('/newTeleEntrevista/finalizarEntrevista', URL_API).post(data)
}

export const getDadosEntrevistaById = async (id) => {
    return await new ApiCall(`/newTeleEntrevista/id/${id}`, URL_API).get()
}

/* --------------------------------------------------------------- */

export const createPropostasEntrevistas = async (data) => {
    return await new ApiCall('/tele-entrevista/propostas', URL_API).post(data)
}

export const createBeneficiario = async (data) => {
    return await new ApiCall('/tele-entrevista/beneficiario', URL_API).post(data)
}

export const createProposta = async (data) => {
    return await new ApiCall('/tele-entrevista/proposta', URL_API).post(data)
}

export const createInfoAdicional = async (data) => {
    return await new ApiCall('/tele-entrevista/info-adicional', URL_API).post(data)
}

export const updateProposta = async (data) => {
    return await new ApiCall(`/tele-entrevista/proposta/${data._id}`, URL_API).put(data)
}

export const getPropostas = async (limit, page) => {
    return await new ApiCall(`/tele-entrevista/proposta?limit=${limit}&page=${page}`, URL_API).get()
}

export const deleteProposta = async (id) => {
    return await new ApiCall(`/tele-entrevista/proposta/${id}`, URL_API).delete()
}

export const getPropostaById = async (id) => {
    return await new ApiCall(`/tele-entrevista/proposta/${id}`, URL_API).get()
}

export const getPropostaByStatus = async (limit, page, data) => {
    return await new ApiCall(`/tele-entrevista/propostas/status?limit=${limit}&page=${page}`, URL_API).post(data)
}

export const getPropostasAgendar = async (limit, page, responsavel) => {
    return await new ApiCall(`/tele-entrevista/proposta/agendar?limit=${limit}&page=${page}&responsavel=${responsavel}`, URL_API).get()
}

export const getPropostasAgendadas = async (limit, page) => {
    return await new ApiCall(`/tele-entrevista/proposta/agendadas?limit=${limit}&page=${page}`, URL_API).get()
}

export const getPropostasConcluidas = async (limit, page) => {
    return await new ApiCall(`/tele-entrevista/proposta/concluidas?limit=${limit}&page=${page}`, URL_API).get()
}

export const getPropostasConcluidasByDate = async (dataInicio, dataFim) => {
    return await new ApiCall(`/tele-entrevista/proposta/concluidas/${dataInicio}/${dataFim}`, URL_API).get()
}

export const getPropostasByDate = async (dataInicio, dataFim) => {
    return await new ApiCall(`/tele-entrevista/proposta/data/${dataInicio}/${dataFim}`, URL_API).get()
}

export const updateInfoAdicional = async (data) => {
    return await new ApiCall(`/tele-entrevista/info-adicional/${data._id}`, URL_API).put(data)
}

export const updateBeneficiario = async (data) => {
    return await new ApiCall(`/tele-entrevista/beneficiario/${data._id}`, URL_API).put(data)
}

export const getBeneficiarioById = async (id) => {
    return await new ApiCall(`/tele-entrevista/beneficiario/${id}`, URL_API).get()
}

export const getBeneficiarioByName = async (nome) => {
    return await new ApiCall(`/tele-entrevista/beneficiario/nome/${nome}`, URL_API).get()
}

export const getBeneficiarios = async (limit, page) => {
    return await new ApiCall(`/tele-entrevista/beneficiario?limit=${limit}&page=${page}`, URL_API).get()
}

export const deleteBeneficiario = async (id) => {
    return await new ApiCall(`/tele-entrevista/beneficiario/${id}`, URL_API).delete()
}

export const getBeneficiarioByDesc = async (desc, limit, page) => {
    return await new ApiCall(`/tele-entrevista/beneficiario/desc/?desc=${desc}&limit=${limit}&page=${page}`, URL_API).get()
}

export const createPergunta = async (data) => {
    return await new ApiCall('/tele-entrevista/pergunta', URL_API).post(data)
}

export const getPerguntas = async () => {
    return await new ApiCall('/tele-entrevista/pergunta', URL_API).get()
}

export const deletePergunta = async (id) => {
    return await new ApiCall(`/tele-entrevista/pergunta/${id}`, URL_API).delete()
}

export const updatePergunta = async (data) => {
    return await new ApiCall(`/tele-entrevista/pergunta/${data._id}`, URL_API).put(data)
}

export const createQuestionario = async (data) => {
    return await new ApiCall('/tele-entrevista/questionario', URL_API).post(data)
}

export const getQuestionarios = async () => {
    return await new ApiCall('/tele-entrevista/questionarios', URL_API).get()
}

export const updateQuestionario = async (data) => {
    return await new ApiCall(`/tele-entrevista/questionario/${data._id}`, URL_API).put(data)
}

export const getQuestionarioByName = async (nome) => {
    return await new ApiCall(`/tele-entrevista/questionario/${nome}`, URL_API).get()
}

export const getCids = async (pesquisa) => {
    return await new ApiCall(`/tele-entrevista/cid?pesquisa=${pesquisa}`, URL_API).get()
}

export const concluirProposta = async ({ id, data }) => {
    return await new ApiCall(`/tele-entrevista/proposta/concluir/${id}`, URL_API).post(data)
}




// RN
export const uploadRn = async (data) => {
    return await new ApiCall('/tele-entrevista/rn/upload', URL_API).post(data)
}

export const getRnByFilter = async (data) => {
    return await new ApiCall(`/tele-entrevista/rn/filtro?$limit=${data.limit}&page=${data.page}`, URL_API).post({ pesquisa: data.pesquisa, status: data.status })
}

// UE

export const uploadUe = async (data) => {
    return await new ApiCall('/tele-entrevista/urgencia-emergencia/upload', URL_API).post(data)
}

export const getUeByFilter = async (data) => {
    return await new ApiCall(`/tele-entrevista/urgencia-emergencia/filtro?limit=${data.limit}&page=${data.page}`, URL_API).post({ pesquisa: data.pesquisa, status: data.status })
}