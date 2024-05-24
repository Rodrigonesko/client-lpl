import { ApiCall } from "./api";
const token = localStorage.getItem('token')

export const getAllTreinamentos = async () => {
    return await new ApiCall('/treinamento').get()
}

export const createTreinamento = async (data) => {
    return await new ApiCall('/treinamento').post(data)
}

export const updateTreinamento = async (data) => {
    return await new ApiCall('/treinamento').put(data)
}

export const deleteTreinamento = async (id) => {
    return await new ApiCall(`/treinamento/${id}`).delete()
}

export const getByIdTreinamentos = async (id) => {
    return await new ApiCall(`/treinamento/${id}`).get()
}

export const treinamentoRealizado = async (data) => {
    return await new ApiCall('/treinamento/treinamentoRealizado').put(data)
}

export const getVerificarTreinamento = async () => {
    return await new ApiCall(`/treinamento/verificar/treinamento`).get()
}

export const naoPrecisaTreinamento = async (data) => {
    return await new ApiCall(`/treinamento/naoPrecisaTreinamento`).put(data)
}

export const deleteColaboradorDoTreinamento = async (idTreinamento, _id) => {
    return await new ApiCall(`/treinamento/deleteColaboradores/${idTreinamento}/${_id}`).patch()
}

export const uploadCertificados = async (formData, _id) => {
    return await new ApiCall(`/treinamento/${_id}`, process.env.REACT_APP_API_KEY, token, { headers: { "Content-Type": `multipart/form-data; boundary=${formData._boundary}` } }).post(formData)
}

export const addColaboradoresManual = async (data, id) => {
    return await new ApiCall(`/treinamento/addColaboradoresManual/${id}`).post(data)
}