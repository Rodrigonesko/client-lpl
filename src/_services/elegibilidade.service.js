import { ApiCall } from "./api";

export const showPropostas = async () => {
    return await new ApiCall('/elegibilidade/show').get()
}

export const getBlacklist = async () => {
    return await new ApiCall('/elegibilidade/blacklist').get()
}

export const getPropostas = async (fase, analista) => {
    return await new ApiCall(`/elegibilidade/propostas/${fase}/${analista}`).get()
}

export const getEntidades = async (fase) => {
    return await new ApiCall(`/elegibilidade/entidades/${fase}`).get()
}

export const filterElegibilidade = async (analista, entidade, status, fase, vigencia) => {
    return await new ApiCall(`/elegibilidade/proposta/filtro?analista=${analista}&entidade=${entidade}&status=${status}&fase=${fase}&vigencia=${vigencia}`).get()
}