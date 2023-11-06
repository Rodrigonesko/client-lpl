import { ApiCall } from "./api";
import { getCookie } from "react-use-cookie";
const URL_API = process.env.REACT_APP_CHAT_SERVICE
const token = getCookie('token')

export const sendMessageInterno = async ({ receptor, mensagem, chatId, resposta }) => {
    return await new ApiCall('/sendMessage', URL_API).post({ receptor, mensagem, chatId, resposta })
}

export const getChats = async () => {
    return await new ApiCall('/getChats', URL_API).get()
}

export const getMessages = async ({ chatId, nome }) => {
    return await new ApiCall('/getMessages', URL_API).post({ chatId, nome })
}

export const createGroupChat = async ({ participantes, nome }) => {
    return await new ApiCall('/createGroup', URL_API).post({ participantes, nome })
}

export const seeInternalMessage = async ({ chatId }) => {
    return await new ApiCall('/seeMessage', URL_API).patch({ chatId })
}

export const uploadArquivosChat = async (data) => {
    return await new ApiCall('/upload', URL_API, token, { headers: { "Content-Type": `multipart/form-data; boundary=${data._boundary}` } }).post(data)
}

export const createPrivateChat = async ({ receptor }) => {
    return await new ApiCall('/createPrivateChat', URL_API).post({ receptor })
}

export const leaveChat = async ({ chatId }) => {
    return await new ApiCall('/leaveChat', URL_API).patch({ chatId })
}

export const addPartipant = async ({ chatId, participante }) => {
    return await new ApiCall('/addParticipant', URL_API).patch({ chatId, participante })
}

export const deleteParticipant = async ({ chatId, participante }) => {
    return await new ApiCall('/leaveChat', URL_API).patch({ chatId, participante })
}