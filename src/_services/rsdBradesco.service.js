import { ApiCall } from "./api";
//const token = localStorage.getItem('token')
const url = 'http://localhost:5002'

/* Prestadores */

/* Segurado */

export const createSegurado = async (data) => {
    return await new ApiCall('/segurado', url).post(data)
}

export const getSegurados = async () => {
    return await new ApiCall('/segurado', url).get()
}

export const getSeguradoById = async (id) => {
    return await new ApiCall(`/segurado/id/${id}`, url).get()
}

export const getSeguradoByFilter = async (cpf, nome, codigo, page, limit) => {
    return await new ApiCall(`/segurado/filter?cpf=${cpf}&nome=${nome}&codigo=${codigo}&page=${page}&limit=${limit}`, url).get()
}

export const updateSegurado = async (id, data) => {
    return await new ApiCall(`/segurado/${id}`, url).put(data)
}

export const deleteSegurado = async (id) => {
    return await new ApiCall(`/segurado/${id}`, url).delete()
}

/* Pedidos */

export const createPedido = async (data) => {
    return await new ApiCall('/pedido', url).post(data)
}

export const uploadPedidos = async (data) => {
    return await new ApiCall('/pedido/sheet', url).post(data)
}

export const getPedidos = async () => {
    return await new ApiCall('/pedido', url).get()
}

export const getPedidoById = async (id) => {
    return await new ApiCall(`/pedido/id/${id}`, url).get()
}

export const updatePedido = async (id, data) => {
    return await new ApiCall(`/pedido/${id}`, url).put(data)
}

export const deletePedido = async (id) => {
    return await new ApiCall(`/pedido/${id}`, url).delete()
}

/* Protocolos */

/* Pacotes */

export const createPacote = async (data) => {
    return await new ApiCall('/pacote', url).post(data)
}

export const getPacotes = async () => {
    return await new ApiCall('/pacote', url).get()
}

export const getPacoteById = async (id) => {
    return await new ApiCall(`/pacote/id/${id}`, url).get()
}

export const getPacotesBySegurado = async (segurado) => {
    return await new ApiCall(`/pacote/segurado/${segurado}`, url).get()
}