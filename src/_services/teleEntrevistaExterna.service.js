import { getCookie } from "react-use-cookie";
import { ApiCall } from "./api";
const URL_API = process.env.REACT_APP_API_TELE_KEY 
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