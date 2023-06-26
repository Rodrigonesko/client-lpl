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

export const atribuirAnalista = async (data) => {
    return await new ApiCall('/elegibilidade/atribuir/analise').put(data)
}

export const filterPropostasElegibilidade = async (fase, proposta) => {
    return await new ApiCall(`/elegibilidade/propostas/${fase}/proposta/${proposta}`).get()
}

export const getInfoProposta = async (id) => {
    return await new ApiCall(`/elegibilidade/infoProposta/${id}`).get()
}

export const alterarStatus = async (data) => {
    return await new ApiCall('/elegibilidade/proposta/alterarStatus').put(data)
}

export const getConsultaCpf = async (cpf) => {
    return await new ApiCall(`/elegibilidade/consultaCpf/${cpf}`).get()
}

export const getPlanosBlacklist = async () => {
    return await new ApiCall('/elegibilidade/planosBlacklist').get()
}

export const getAgenda = async (id) => {
    return await new ApiCall(`/elegibilidade/agenda/${id}`).get()
}

export const sendComentario = async (data) => {
    return await new ApiCall('/elegibilidade/agenda/comentario').post(data)
}

export const deleteComentario = async (id) => {
    return await new ApiCall(`/elegibilidade/agenda/${id}`).delete()
}

export const buscaDiploma = async (data) => {
    return await new ApiCall('/elegibilidade/buscarDiploma').post(data)
}

export const salvaDiploma = async (data) => {
    return await new ApiCall('/elegibilidade/salvarDiploma').put(data)
}

export const getUniversidade = async () => {
    return await new ApiCall('/elegibilidade/universidades').get()
}

export const getCursos = async () => {
    return await new ApiCall('/elegibilidade/cursos').get()
}

export const salvarDadosFase1 = async (data) => {
    return await new ApiCall('/elegibilidade/proposta/fase1').put(data)
}

export const salvarDadosFase2 = async (data) => {
    return await new ApiCall('/elegibilidade/proposta/fase2').put(data)
}

export const getPrcs = async () => {
    return await new ApiCall('/elegibilidade/prc').get()
}

export const getPropostasCorretor = async (corretor) => {
    return await new ApiCall(`/elegibilidade/corretor/${corretor}`).get()
}

export const cancelarProposta = async (data) => {
    return await new ApiCall('/elegibilidade/cancelar').put(data)
}

export const cancelarCpf = async (data) => {
    return await new ApiCall('/elegibilidade/cancelarCpf').put(data)
}

export const devolverProposta = async (data) => {
    return await new ApiCall('/elegibilidade/devolver').put(data)
}

export const enviarFaseCancelamento = async (data) => {
    return await new ApiCall('/elegibilidade/enviarFaseCancelamento').put(data)
}

export const enviarUnder = async (data) => {
    return await new ApiCall('/elegibilidade/enviarUnder').put(data)
}