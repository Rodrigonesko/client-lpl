import { ApiCall } from "./api";

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