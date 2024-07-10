import { ApiCall } from "./api";
const url = process.env.REACT_APP_TELE_ENTREVISTA

export const filterUrgenciasEmergencias = async (status, pesquisa, page, limit) => {
    return await new ApiCall(`/urgencia-emergencia/filterUrgenciaEmergencia?status=${status}&pesquisa=${pesquisa}&page=${page}&limit=${limit}`, url).get()
}

export const createUrgenciasEmergencias = async (data) => {
    return await new ApiCall('/urgencia-emergencia/planilha', url).post(data)
}

export const deleteUrgenciaEmergencia = async (id) => {
    return await new ApiCall(`/urgencia-emergencia/${id}`, url).delete()
}