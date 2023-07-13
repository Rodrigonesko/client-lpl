import { getCookie } from "react-use-cookie";
import { ApiCall } from "./api";
const token = getCookie('token')

export const uploadPolitica = async (formData, politica, versao) => {
    return await new ApiCall(`/politicas/${politica}/${versao}`, process.env.REACT_APP_API_KEY, token, { headers: { "Content-Type": `multipart/form-data; boundary=${formData._boundary}` } }).post(formData)
}

export const getPoliticas = async () => {
    return await new ApiCall('/politicas').get()
}

export const downloadPolitica = async (data) => {
    return await new ApiCall('/politicas/download').post(data)
}