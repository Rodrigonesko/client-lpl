import { ApiCall } from "./api";

export const filterPropostas = async (pesquisa, page) => {
    return await new ApiCall(`/urgenciaEmergencia/filter/${pesquisa}&page=${page}&limit=25`).get()
}

export const getProducaoMensalUrgenciaEmergencia = async (mes, analista) => {
    return await new ApiCall(`/urgenciaEmergencia/producaoMensal/${mes}/${analista}`).get()
}