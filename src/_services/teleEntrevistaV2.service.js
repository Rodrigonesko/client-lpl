import { ApiCall } from "./api";
const URL_API = 'http://localhost:5000'

export const createPropostasEntrevistas = async (data) => {
    return await new ApiCall('/tele-entrevista/propostas', URL_API).post(data)
}