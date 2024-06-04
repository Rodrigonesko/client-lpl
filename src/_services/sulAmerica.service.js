import { ApiCall } from "./api";
const token = localStorage.getItem('token')
const url = process.env.REACT_APP_SUL_AMERICA_SERVICE

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

export const filterPedidos = async (prestador, beneficiario, responsavel, status, subStatus, tentativasDeContato, dataCriacao, page, limit = 10) => {
    return await new ApiCall(`/pedido/filter?prestador=${prestador}&beneficiario=${beneficiario}&responsavel=${responsavel}&status=${status}&subStatus=${subStatus}&tentativasDeContato=${tentativasDeContato}&page=${page}&limit=${limit}&dataCriacao=${dataCriacao}`, url).get()
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

export const getDatasCriacoaPedido = async () => {
    return await new ApiCall(`/pedido/dataCriacao`, url).get()
}

export const getQtdPedidoByDate = async (dataInicio, dataFim) => {
    return await new ApiCall(`/pedido/quantidadePedidos?dataInicio=${dataInicio}&dataFim=${dataFim}`, url).get()
}

export const getPedidosPorDiaByDate = async (dataInicio, dataFim) => {
    return await new ApiCall(`/pedido/pedidosPorDia?dataInicio=${dataInicio}&dataFim=${dataFim}`, url).get()
}

export const getPedidosPorResponsavel = async (dataInicio, dataFim) => {
    return await new ApiCall(`/pedido/pedidosPorResponsavel?dataInicio=${dataInicio}&dataFim=${dataFim}`, url).get()
}

export const adicionarTentativaDeContato = async (id) => {
    return await new ApiCall(`/pedido/tentativaContato/${id}`, url).patch()
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

/* Faturamento */

export const createFaturamento = async (data) => {
    return await new ApiCall('/faturamento', url).post(data)
}

export const getFaturamento = async (page, limit) => {
    return await new ApiCall(`/faturamento?page=${page}&limit=${limit}`, url).get()
}

export const filterFaturamento = async (page, limit, lote, status, beneficiario) => {
    return await new ApiCall(`/faturamento/filter?page=${page}&limit=${limit}&lote=${lote}&status=${status}&beneficiario=${beneficiario}`, url).get()
}

export const updateFaturamento = async (id, data) => {
    return await new ApiCall(`/faturamento/${id}`, url).put(data)
}

export const deleteFaturamento = async (id) => {
    return await new ApiCall(`/faturamento/${id}`, url).delete()
}

export const findByDate = async (lote) => {
    return await new ApiCall(`/faturamento/date/${lote}`, url).get()
}

