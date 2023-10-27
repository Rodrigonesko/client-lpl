import { ApiCall } from "./api";
const URL_API = process.env.REACT_APP_CHAT_SERVICE

export const sendMessageInterno = async ({ receptor, mensagem, chatId }) => {
    return await new ApiCall('/sendMessage', URL_API).post({ receptor, mensagem, chatId })
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