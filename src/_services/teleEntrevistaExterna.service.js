import { getCookie } from "react-use-cookie";
import { ApiCall } from "./api";
const URL_API = process.env.REACT_APP_API_TELE_KEY //'http://localhost:3002'
const token = getCookie('token')

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

export const filterPropostasNaoRealizadas = async ({ pesquisa, page, limit }) => {
    return await new ApiCall('/filterPropostasNaoRealizadas', URL_API).post({ pesquisa, page, limit })
}

export const quantidadePropostasNaoRealizadas = async () => {
    return await new ApiCall('/totalPropostasNaoRealizadas', URL_API).get()
}

export const filterPropostasAgendadas = async ({ responsavel, page, limit }) => {
    return await new ApiCall('/filterPropostasAgendadas', URL_API).post({ responsavel, page, limit })
}

export const visualizarMensagem = async ({ whatsapp }) => {
    return await new ApiCall('/visualizarMensagem', URL_API).put({ whatsapp })
}

export const changeWhatsappSender = async ({ whatsapp, wppSender }) => {
    return await new ApiCall('/changeWhatsappSender', URL_API).put({ whatsapp, wppSender })
}