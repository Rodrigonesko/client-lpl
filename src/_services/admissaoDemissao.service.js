import { ApiCall } from "./api";

export const updateStatus = async (data) => {
    return await new ApiCall(`/admissaoDemissao/status`).put(data)
}

export const getAll = async () => {
    return await new ApiCall(`/admissaoDemissao/findAll`).get()
}

export const getInfoName = async (nome) => {
    return await new ApiCall(`/admissaoDemissao/infoUser/${nome}`).get();
}