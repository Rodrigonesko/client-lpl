import { getCookie } from "react-use-cookie";
import { ApiCall } from "./api";
const token = getCookie('token')

export const uploadContingencias = async (formData, contingencia, versao) => {
    return await new ApiCall(`/contingencias/${contingencia}/${versao}`, process.env.REACT_APP_API_KEY, token, { headers: { "Content-Type": `multipart/form-data; boundary=${formData._boundary}` } }).post(formData)
}

export const getContingencias = async () => {
    return await new ApiCall('/contingencias').get()
}