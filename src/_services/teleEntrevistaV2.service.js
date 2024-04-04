import { ApiCall } from "./api";
const URL_API = 'http://localhost:5000'

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