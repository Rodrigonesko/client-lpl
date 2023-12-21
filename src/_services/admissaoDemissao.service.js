import { ApiCall } from "./api";

export const createAdmissao = async (_id) => {
    return await new ApiCall('/admissaoDemissao/createAdmissao').post(_id)
}

export const createDemissao = async (_id) => {
    return await new ApiCall('/admissaoDemissao/createDemissao').post(_id)
}

export const setarStatus = async (_id, status, id, tipoExame) => {
    return await new ApiCall('/admissaoDemissao/status').put(_id, status, id, tipoExame)
}

export const updateObs = async (_id, obs, id, tipoExame) => {
    return await new ApiCall('/admissaoDemissao/obs').put(_id, obs, id, tipoExame)
}

export const updateData = async (_id, data, id, tipoExame) => {
    return await new ApiCall('/admissaoDemissao/data').put(_id, data, id, tipoExame)
}

export const getAllItens = async () => {
    return await new ApiCall('/admissaoDemissao/itens').get()
}

export const updateProrrogacao = async (name, prorrogacao) => {
    return await new ApiCall('/admissaoDemissao/prorrogacao').put(name, prorrogacao)
}

export const filterTable = async (_id, status, id, tipoExame) => {
    return await new ApiCall('/admissaoDemissao/status').put(_id, status, id, tipoExame)
}