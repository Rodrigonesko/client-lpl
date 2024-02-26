import { ApiCall } from "./api";

export const getProducaoMensalRn = async (mes, analista) => {
    return await new ApiCall(`/rn/producaoMensal/${mes}/${analista}`).get()
}

export const getRnByDate = async (dataInicio, dataFim) => {
    return await new ApiCall(`/rn/data/${dataInicio}/${dataFim}`).get()
}