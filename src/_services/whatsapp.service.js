import { ApiCall } from "./api";
const URL_API = process.env.REACT_APP_WHATSAPP_SERVICE
const URL_API_BRADESCO = 'http://localhost:3004'
const token = localStorage.getItem('token')

export const getTemplates = async () => {
    return await new ApiCall('/whatsapp/template', URL_API).get()
}

export const createTemplate = async ({ name, message, messagingServiceSid, contentVariables, contentSid }) => {
    return await new ApiCall('/whatsapp/template', URL_API).post({ name, message, messagingServiceSid, contentVariables, contentSid })
}

export const deleteTemplate = async (id) => {
    return await new ApiCall(`/whatsapp/template/${id}`, URL_API).delete()
}

export const createWhatsappNumber = async ({ nome, numero, celula }) => {
    return await new ApiCall('/whatsapp/whatsappNumber', URL_API).post({ nome, numero, celula })
}

export const getAllWhatsappNumbers = async () => {
    return await new ApiCall('/whatsapp/whatsappNumber', URL_API).get()
}

export const deleteWhatsappNumber = async (id) => {
    return await new ApiCall(`/whatsapp/whatsappNumber/${id}`, URL_API).delete()
}

export const sendTemplateMessage = async ({ de, para, mensagem, contentSid, contentVariables, messagingServiceSid }) => {
    return await new ApiCall('/whatsapp/sendTemplateMessage', URL_API).post({ de, para, mensagem, contentSid, contentVariables, messagingServiceSid })
}

export const getMessages = async (whatsapp) => {
    return await new ApiCall(`/whatsapp/chat/${whatsapp}`, URL_API).get()
}

export const getContacts = async (whatsapp, responsavel) => {
    return await new ApiCall(`/whatsapp/contacts/${whatsapp}/${responsavel}`, URL_API).get()
}

export const getFilterContactsRsd = async (whatsapp, filter, responsavel) => {
    return await new ApiCall(`/whatsapp/contacts/${whatsapp}/${filter}/${responsavel}`, URL_API).get()
}

export const getMessagesRsd = async (whatsapp) => {
    return await new ApiCall(`/whatsapp/messageByPessoa/${whatsapp}`, URL_API).get()
}

export const readMessagesRsd = async (whatsapp) => {
    return await new ApiCall(`/whatsapp/readMessagesPessoa/${whatsapp}`, URL_API).patch()
}

export const sendMessage = async ({ de, para, mensagem, mediaUrl }) => {
    return await new ApiCall('/whatsapp/message', URL_API).post({ de, para, mensagem, mediaUrl })
}

export const assumirConversaRsd = async (data) => {
    return await new ApiCall(`/whatsapp/assumirConversaRsd`, URL_API).patch(data)
}

export const sendFiles = async (data) => {
    return await new ApiCall('/whatsapp/sendFiles', URL_API, token, {
        headers: { "Content-Type": `multipart/form-data; boundary=${data._boundary}` }
    }).post(data)
}

/* SINDICANCIA BRADESCO */

export const getContactsBradesco = async (pesquisa, page, limit) => {
    return await new ApiCall(`/conversa/getNumbersByFilter?pesquisa=${pesquisa}&page=${page}&limit=${limit}`, URL_API_BRADESCO).get()
}

export const getChatBradescoByNumber = async (whatsapp) => {
    return await new ApiCall(`/conversa/getAllChat/${whatsapp}`, URL_API_BRADESCO).get()
}

export const sendMessageBradesco = async (data) => {
    return await new ApiCall('/conversa/sendMessage', URL_API_BRADESCO).post(data)
}

export const sendTemplateMessageBradesco = async (data) => {
    return await new ApiCall('/conversa/sendTemplateMessage', URL_API_BRADESCO).post(data)
}