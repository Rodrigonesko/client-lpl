import { ApiCall } from "./api";
const token = localStorage.getItem('token')
const url = 'http://localhost:5001'

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

/* Questionario */

export const buscarQuestionarios = async () => {
    return await new ApiCall('/questionario', url).get()
}

export const createQuestionario = async (data) => {
    return await new ApiCall('/questionario', url).post(data)
}

/* Pedido */

export const getPedidos = async (page = 1, limit = 25) => {
    return await new ApiCall(`/pedido?page=${page}&limit=${limit}`, url).get()
}

export const createPedidosByPlanilha = async (data) => {
    return await new ApiCall('/pedido/planilha', url).post(data)
}

export const filterPedidos = async (prestador, beneficiario, responsavel, status, page = 1, limit = 25) => {
    console.log(prestador, beneficiario, responsavel, status, page, limit);

    return await new ApiCall(`/pedido/filter?prestador=${prestador}&beneficiario=${beneficiario}&responsavel=${responsavel}&status=${status}&page=${page}&limit=${limit}`, url).get()
}