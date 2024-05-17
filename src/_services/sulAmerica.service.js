import { ApiCall } from "./api";
const token = localStorage.getItem('token')
const url = 'http://localhost:5001' //process.env.REACT_APP_SUL_AMERICA_SERVICE

/* Perguntas */

export const buscarPerguntas = async () => {
    return await new ApiCall('/pergunta', url).get()
}

export const criarPergunta = async (data) => {
    return await new ApiCall('/pergunta', url).post(data)
}

export const deletarPergunta = async (id) => {
    return await new ApiCall(`/pergunta/${id}`, url).delete()
}

export const atualizarPergunta = async (id, data) => {
    return await new ApiCall(`/pergunta/${id}`, url).put(data)
}

/* Questionario */

export const buscarQuestionarios = async () => {
    return await new ApiCall('/questionario', url).get()
}

export const getQuestionarioByName = async (name) => {
    return await new ApiCall(`/questionario/nome/${name}`, url).get()
}

export const createQuestionario = async (data) => {
    return await new ApiCall('/questionario', url).post(data)
}

export const updateQuestionario = async (id, data) => {
    return await new ApiCall(`/questionario/${id}`, url).put(data)
}

/* Pedido */

export const getPedidos = async (page, limit) => {
    return await new ApiCall(`/pedido?page=${page}&limit=${limit}`, url).get()
}

export const createPedidosByPlanilha = async (data) => {
    return await new ApiCall('/pedido/planilha', url).post(data)
}

export const updatePedido = async (id, data) => {
    return await new ApiCall(`/pedido/${id}`, url).put(data)
}

export const filterPedidos = async (prestador, beneficiario, responsavel, status, page, limit) => {
    return await new ApiCall(`/pedido/filter?prestador=${prestador}&beneficiario=${beneficiario}&responsavel=${responsavel}&status=${status}&page=${page}&limit=${limit}`, url).get()
}

export const getPedidoById = async (id) => {
    return await new ApiCall(`/pedido/id/${id}`, url).get()
}

export const getPrestadoresByStatus = async (status) => {
    return await new ApiCall(`/pedido/prestadores?status=${status}`, url).get()
}

export const getPedidosByBeneficiario = async (id) => {
    return await new ApiCall(`/pedido/beneficiario/${id}`, url).get()
}

export const getPedidosByDate = async (dataInicio, dataFim) => {
    return await new ApiCall(`/pedido/data?dataInicio=${dataInicio}&dataFim=${dataFim}`, url).get()
}

export const uploadArquivoPedido = async (id, data) => {
    return await new ApiCall(`/pedido/upload/${id}`, url, token, {
        headers: {
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`
        }
    }).post(data)
}

/* Respostas */

export const createRespostas = async (data) => {
    return await new ApiCall('/resposta', url).post(data)
}

export const updateRespostas = async (id, data) => {
    return await new ApiCall(`/resposta/${id}`, url).put(data)
}

export const getRespostasByPedidoId = async (id) => {
    return await new ApiCall(`/resposta/pedido/${id}`, url).get()
}

/* Beneficiários */

export const getBeneficiarios = async (page, limit) => {
    return await new ApiCall(`/beneficiario?page=${page}&limit=${limit}`, url).get()
}

export const getBeneficiarioById = async (id) => {
    return await new ApiCall(`/beneficiario/id/${id}`, url).get()
}

export const getBeneficiarioByWhatsapp = async (whatsapp) => {
    return await new ApiCall(`/beneficiario/whatsapp/${whatsapp}`, url).get()
}

export const getBeneficiarioByNameAndSortByLastMessage = async (name) => {
    return await new ApiCall(`/beneficiario/nome/ultimaMensagem?nome=${name}`, url).get()
}

export const updateBeneficiario = async (id, data) => {
    return await new ApiCall(`/beneficiario/${id}`, url).put(data)
}