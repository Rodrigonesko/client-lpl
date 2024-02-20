import { ApiCall } from "./api";

export const getDemandas = async (limit, page, areaEmpresa, status, servico, analista, codigo, data) => {
    return await new ApiCall(`/sindicancia/demanda?limit=${limit}&page=${page}&areaEmpresa=${areaEmpresa}&status=${status}&servico=${servico}&analista=${analista}&codigo=${codigo}&data=${data}`).get();
}

export const getAreaEmpresa = async () => {
    return await new ApiCall('/sindicancia/areaEmpresa').get();
}

export const getTipoServico = async () => {
    return await new ApiCall('/sindicancia/tipoServico').get();
}

export const getStatus = async () => {
    return await new ApiCall('/sindicancia/status').get();
}

export const getAnalistasSindicancia = async () => {
    return await new ApiCall('/sindicancia/analistasExecucao').get();
}