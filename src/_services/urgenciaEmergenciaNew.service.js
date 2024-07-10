import { ApiCall } from "./api";
const url = process.env.REACT_APP_API_TELE_ENTREVISTA

export const uploadUrgenciaEmergencia = async (data) => {
    return await new ApiCall('/urgencia-emergencia/upload', url).post(data)
}

export const findByIdUrgenciaEmergencia = async (id) => {
    return await new ApiCall(`/urgencia-emergencia/id/${id}`, url).get()
}

export const filterUrgenciasEmergencias = async (data) => {
    const { status, pesquisa, dataInicioInclusao, dataFimInclusao, dataInicioConclusao, dataFimConclusao, page, limit } = data
    let query = ''
    if (status) query += `status=${status}&`
    if (pesquisa) query += `pesquisa=${pesquisa}&`
    if (dataInicioInclusao) query += `dataInicioInclusao=${dataInicioInclusao}&`
    if (dataFimInclusao) query += `dataFimInclusao=${dataFimInclusao}&`
    if (dataInicioConclusao) query += `dataInicioConclusao=${dataInicioConclusao}&`
    if (dataFimConclusao) query += `dataFimConclusao=${dataFimConclusao}&`
    if (page) query += `page=${page}&`
    if (limit) query += `limit=${limit}`
    return await new ApiCall(`/urgencia-emergencia/filterUrgenciaEmergencia?${query}`, url).get()
}

export const updateUrgenciaEmergencia = async (data) => {
    return await new ApiCall(`/urgencia-emergencia/${data._id}`, url).put(data)
}