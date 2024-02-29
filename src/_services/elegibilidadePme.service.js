import { ApiCall } from "./api";
const token = localStorage.getItem('token')

export const uploadPropostasElegibilidadePme = async (data) => {
    return await new ApiCall('/elegibilidadePme/upload', process.env.REACT_APP_API_KEY, token, { headers: { "Content-Type": `multipart/form-data; boundary=${data._boundary}` } }).post(data)
}

export const getPropostasElegibilidadePme = async () => {
    return await new ApiCall('/elegibilidadePme/propostas').get()
}

export const getPropostasElegibilidadePmePorStatus = async (status) => {
    return await new ApiCall(`/elegibilidadePme/propostas/${status}`).get()
}

export const getPropostasElegibilidadePmePorStatusEAnalista = async (status, analista) => {
    return await new ApiCall(`/elegibilidadePme/propostas/${status}/${analista}`).get()
}

export const getPropostaElegibilidadePmePorStatusEProposta = async (status, proposta) => {
    return await new ApiCall(`/elegibilidadePme/proposta/${status}/${proposta}`).get()
}

export const atribuirAnalistaPme = async (data) => {
    return await new ApiCall(`/elegibilidadePme/atribuirAnalista`).put(data)
}

export const getInfoPropostaElegibilidadePme = async (id) => {
    return await new ApiCall(`/elegibilidadePme/infoProposta/${id}`).get()
}

export const getAgendaElegibilidadePmePorProposta = async (proposta) => {
    return await new ApiCall(`/elegibilidadePme/agenda/${proposta}`).get()
}

export const adicionaComentarioElegibilidadePme = async (data) => {
    return await new ApiCall('/elegibilidadePme/agenda').post(data)
}

export const alterarStatusElegibildadePme = async (data) => {
    return await new ApiCall('/elegibilidadePme/alterarStatus').put(data)
}

export const getProducaoDiariaPme = async (data) => {
    return await new ApiCall(`/elegibilidadePme/producaoDiaria/${data}`).get()
}

export const getProducaoMensalPme = async (mes, analista) => {
    return await new ApiCall(`/elegibilidadePme/producaoMensal/${mes}/${analista}`).get()
}

export const getRelatorioProducaoMensalPme = async (mes) => {
    return await new ApiCall(`/elegibilidadePme/relatorioProducaoMensal/${mes}`).get()
}

export const getAnaliticoElegibilidadeMensalPme = async (mes, analista) => {
    return await new ApiCall(`/elegibilidadePme/analitico/${mes}/${analista}`).get()
}