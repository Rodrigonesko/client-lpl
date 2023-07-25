import { ApiCall } from "./api";

export const createPatologia = async (data) => {
    return await new ApiCall('/patologias').post(data)
}

export const getAllPatologias = async () => {
    return await new ApiCall('/patologias').get()
}

export const getPatologiaById = async (celula, idCelula) => {
    return await new ApiCall(`/patologias/${celula}/${idCelula}`).get()
}