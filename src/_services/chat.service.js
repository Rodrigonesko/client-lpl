import { ApiCall } from "./api";
const URL_API = process.env.REACT_APP_CHAT_SERVICE
const token = localStorage.getItem('token')

export const sendMessageInterno = async ({ receptor, mensagem, chatId, resposta }) => {
    return await new ApiCall('/sendMessage', URL_API).post({ receptor, mensagem, chatId, resposta })
}

export const getChats = async () => {
    return await new ApiCall('/getChats', URL_API).get()
}

export const getChatDataByIdOrName = async ({ chatId, nome }) => {
    return await new ApiCall('/getChaDatatByIdOrName', URL_API).post({ chatId, nome })
}

export const getMessages = async ({ chatId, nome, skip }) => {
    return await new ApiCall('/getMessages', URL_API).post({ chatId, nome, skip })
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

export const addPartipants = async ({ chatId, participantes }) => {
    return await new ApiCall('/addParticipant', URL_API).patch({ chatId, participantes })
}

export const deleteParticipant = async ({ chatId, participante }) => {
    return await new ApiCall('/deleteParticipant', URL_API).patch({ chatId, participante })
}

export const addAdmin = async ({ chatId, participante }) => {
    return await new ApiCall('/addAdmin', URL_API).patch({ chatId, participante })
}


export const updateNameGroup = async ({ chatId, nome }) => {
    return await new ApiCall('/updateNameGroup', URL_API).put({ chatId, nome })
}

export const updateGroupImage = async (data) => {
    return await new ApiCall('/updateGroupImage', URL_API, token, { headers: { "Content-Type": `multipart/form-data; boundary=${data._boundary}` } }).post(data)
}

export const reagirMensagem = async ({ chatId, mensagemId, reacao }) => {
    return await new ApiCall('/reagirMensagem', URL_API).post({ chatId, mensagemId, reacao })
}