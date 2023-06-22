import { ApiCall } from "./api";

export const getAtividadesEmAndamento = async () => {
    return await new ApiCall('/controleAtividade/andamento').get()
}

export const getAtividadeAtual = async () => {
    return await new ApiCall('/controleAtividade/atual').get()
}

export const assumirAtividade = async (atividade) => {
    return await new ApiCall('/controleAtividade/assumir').put(atividade)
}

export const encerrarAtividade = async () => {
    return await new ApiCall('/controleAtividade/encerrar').put()
}

export const getReport = async () => {
    return await new ApiCall('/controleAtividade/report').get()
}