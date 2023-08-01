import { getCookie } from "react-use-cookie";
import { ApiCall } from "./api";
const token = getCookie('token')

export const showPropostas = async () => {
    return await new ApiCall('/elegibilidade/show').get()
}

export const uploadPropostas = async (data) => {
    return await new ApiCall('/elegibilidade/upload', process.env.REACT_APP_API_KEY, token, { headers: { "Content-Type": `multipart/form-data; boundary=${data._boundary}` } }).post(data)
}

export const getBlacklist = async () => {
    return await new ApiCall('/elegibilidade/blacklist').get()
}

export const getPropostas = async (fase, analista = 'sem') => {
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

export const getPropostasAnalise = async () => {
    return await new ApiCall('/elegibilidade/propostas/analiseDoc').get()
}

export const atribuirAnalistaPre = async (data) => {
    return await new ApiCall('/elegibilidade/atribuir/preProcessamento').put(data)
}

export const uploadDivergencia = async (data) => {
    return await new ApiCall('/elegibilidade/uploadDivergencias', process.env.REACT_APP_API_KEY, token, { headers: { "Content-Type": `multipart/form-data; boundary=${data._boundary}` } }).post(data)
}

export const getProducao = async (data) => {
    return await new ApiCall(`/elegibilidade/producao/${data}`).get()
}

export const getReport = async () => {
    return await new ApiCall(`/elegibilidade/report`).get()
}

export const registrarProposta = async (data) => {
    return await new ApiCall('/elegibilidade/registrar/proposta').post(data)
}

export const getPropostasManuaisEmAndamento = async () => {
    return await new ApiCall('/elegibilidade/show/propostaManual/andamento').get()
}

export const getPropostasManuais = async () => {
    return await new ApiCall('/elegibilidade/show/propostasManual').get()
}

export const atualizarObservacoes = async (data) => {
    return await new ApiCall('/elegibilidade/atualizarObservacoes').put(data)
}

export const concluirPropostaManual = async (data) => {
    return await new ApiCall('/elegibilidade/concluirPropostaManual').put(data)
}

export const relatorioProdutividade = async () => {
    return await new ApiCall('/elegibilidade/relatorioProducao').get()
}

export const semDocumentos = async (data) => {
    return await new ApiCall('/elegibilidade/semDocumentos').put(data)
}

export const getSemDocumentos = async () => {
    return await new ApiCall('/elegibilidade/semDocumentos').get()
}

export const doumentoRecebido = async (data) => {
    return await new ApiCall('/elegibilidade/documentoRecebido').put(data)
}

export const adicionarPlanoBlacklist = async (data) => {
    return await new ApiCall('/elegibilidade/planosBlacklist').post(data)
}

export const removerPlanoBlacklist = async (id) => {
    return await new ApiCall(`/elegibilidade/planosBlacklist/${id}`).delete()
}

export const getProducaoMensalElegi = async (mes, analista) => {
    return await new ApiCall(`/elegibilidade/producaoMensal/${mes}/${analista}`).get()
}

export const voltarPropostaElegibilidade = async (data) => {
    return await new ApiCall('/elegibilidade/voltarProposta').put(data)
}