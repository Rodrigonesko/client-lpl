import { ApiCall } from "./api";
const URL_API = 'http://localhost:3005' //process.env.REACT_APP_API_TELE_KEY
//const token = getCookie('token')

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