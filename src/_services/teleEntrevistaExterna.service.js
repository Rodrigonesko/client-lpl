//import { getCookie } from "react-use-cookie";
import { ApiCall } from "./api";
const URL_API = 'http://localhost:3002' //process.env.REACT_APP_API_TELE_KEY
//const token = getCookie('token')

export const getMessagesTele = async (whatsapp) => {
    return await new ApiCall(`/chat/${whatsapp}`, URL_API).get()
}

export const seeMessageTele = async ({ whatsapp }) => {
    return await new ApiCall(`/visualizarMensagem`, URL_API).put({ whatsapp })
}

export const sendMessageTele = async ({ whatsapp, mensagem }) => {
    return await new ApiCall(`/sendMessage`, URL_API).post({ whatsapp, mensagem })
}

export const assumirAtendimentoTele = async ({ id }) => {
    return await new ApiCall('/assumirConversa', URL_API).put({ id })
}

export const createComentario = async ({ text, cpfTitular }) => {
    return await new ApiCall('/comentario', URL_API).post({ text, cpfTitular })
}

export const getComentariosByCpf = async (cpf) => {
    return await new ApiCall(`/comentario/${cpf}`, URL_API).get()
}

export const deleteComentario = async (id) => {
    return await new ApiCall(`/comentario/${id}`, URL_API).delete()
}

export const alterarVigenciaPorCpfTitular = async ({ cpfTitular, vigencia }) => {
    return await new ApiCall('/alterarVigenciaPorCpfTitular', URL_API).put({ cpfTitular, vigencia })
}

export const filterPropostas = async ({ status, tipoContrato, vigencia, altoRisco, idade, page, limit }) => {
    return await new ApiCall('/filterPropostas', URL_API).post({ status, tipoContrato, vigencia, altoRisco, idade, page, limit })
}

export const filterPropostasNaoRealizadas = async ({ pesquisa, page, limit, filters }) => {
    return await new ApiCall('/filterPropostasNaoRealizadas', URL_API).post({ pesquisa, page, limit, filters })
}

export const quantidadePropostasNaoRealizadas = async () => {
    return await new ApiCall('/totalPropostasNaoRealizadas', URL_API).get()
}

export const filterPropostasAgendadas = async ({ responsavel, page, limit, pesquisa }) => {
    return await new ApiCall('/filterPropostasAgendadas', URL_API).post({ responsavel, page, limit, pesquisa })
}

export const visualizarMensagem = async ({ whatsapp }) => {
    return await new ApiCall('/visualizarMensagem', URL_API).put({ whatsapp })
}

export const changeWhatsappSender = async ({ whatsapp, wppSender }) => {
    return await new ApiCall('/changeWhatsappSender', URL_API).put({ whatsapp, wppSender })
}

export const encerrarAtendimentoHumanizado = async ({ id }) => {
    return await new ApiCall('/encerrarHumanizado', URL_API).put({ id })
}

export const encerrarAtendimentoJanela = async ({ id }) => {
    return await new ApiCall('/encerrarAtendimento', URL_API).put({ id })
}

export const paginacaoAgenda = async ({ page, limit }) => {
    return await new ApiCall('/paginacaoAgenda', URL_API).post({ page, limit })
}

export const quantidadePropostasPorMesFiltradas = async (data) => {
    return await new ApiCall('/quantidadePropostasPorMesFiltradas', URL_API).post(data)
}

export const graficoPropostasPorMesFiltradas = async (data) => {
    return await new ApiCall('/graficoPropostasPorMesFiltradas', URL_API).post(data)
}

export const getPropostaById = async (id) => {
    return await new ApiCall(`/proposta/${id}`, URL_API).get()
}

export const alterarFormularioEntrevista = async ({ id, formulario }) => {
    return await new ApiCall(`/alterarFormulario`, URL_API).put({ id, formulario })
}

export const getPropostaPorNomeEProposta = async (nome, proposta) => {
    return await new ApiCall(`/buscaPorPropostaENome/${nome}/${proposta}`, URL_API).get()
}

export const filterPropostasNaoEnviadas = async (data) => {
    return await new ApiCall(`/prototipoNaoEnviadas`, URL_API).post(data)
}

export const sendMessageSaudacao = async ({ _id }) => {
    return await new ApiCall(`/sendMessageSaudacao`, URL_API).post({ _id })
}

export const ajustarPropostasSemCpf = async ({ propostas }) => {
    return await new ApiCall(`/ajustar`, URL_API).put({ propostas })
}

export const getPropostasSemCpf = async () => {
    return await new ApiCall(`/ajustar`, URL_API).get()
}

export const getPropostasSemResposta = async () => {
    return await new ApiCall(`/semResposta`, URL_API).get()
}