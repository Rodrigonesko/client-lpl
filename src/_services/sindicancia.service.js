import { ApiCall } from "./api";

export const getDemandas = async () => {
    return await new ApiCall('/sindicancia/').get();
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
    return await new ApiCall('/sindicancia/analistas').get();
}