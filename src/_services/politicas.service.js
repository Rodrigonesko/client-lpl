import { getCookie } from "react-use-cookie";
import { ApiCall } from "./api";
const token = getCookie('token')

export const uploadPolitica = async (formData, politica, versao) => {
    return await new ApiCall(`/politicas/${politica}/${versao}`, process.env.REACT_APP_API_KEY, token, { headers: { "Content-Type": `multipart/form-data; boundary=${formData._boundary}` } }).post(formData)
}

export const getPoliticas = async () => {
    return await new ApiCall('/politicas').get()
}

export const getPoliticasAtivas = async () => {
    return await new ApiCall('/politicas/ativos').get()
}

export const getPoliticaPorId = async (id) => {
    return await new ApiCall(`/politicas/politica/${id}`).get()
}

export const assinarPolitica = async (data) => {
    return await new ApiCall('/politicas/assinar').put(data)
}