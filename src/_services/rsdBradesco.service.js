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

export const getSeguradoByNome = async (nome) => {
    return await new ApiCall(`/segurado/nome/${nome}`, url).get()
}

export const getSeguradosByTitular = async (titular) => {
    return await new ApiCall(`/segurado/titular/${titular}`, url).get()
}

export const getSeguradoByFilter = async (pesquisa, page, limit) => {
    return await new ApiCall(`/segurado/filter?pesquisa=${pesquisa}&page=${page}&limit=${limit}`, url).get()
}

export const updateSegurado = async (id, data) => {
    return await new ApiCall(`/segurado/${id}`, url).put(data)
}

export const deleteSegurado = async (id) => {
    return await new ApiCall(`/segurado/${id}`, url).delete()
}

export const findByCodigoSegurado = async (codigo) => {
    return await new ApiCall(`/segurado/codigo/${codigo}`, url).get()
}

/* Titular */

export const createTitular = async (data) => {
    return await new ApiCall('/titular', url).post(data)
}

export const getTitulares = async () => {
    return await new ApiCall('/titular', url).get()
}

export const getTitularById = async (id) => {
    return await new ApiCall(`/titular/id/${id}`, url).get()
}

export const getTitularByNome = async (nome) => {
    return await new ApiCall(`/titular/nome/${nome}`, url).get()
}

export const getTitularByFilter = async (pesquisa, page, limit) => {
    return await new ApiCall(`/titular/filter?pesquisa=${pesquisa}&page=${page}&limit=${limit}`, url).get()
}

export const updateTitular = async (id, data) => {
    return await new ApiCall(`/titular/${id}`, url).put(data)
}

export const deleteTitular = async (id) => {
    return await new ApiCall(`/titular/${id}`, url).delete()
}

export const findByCodigoTitular = async (codigo) => {
    return await new ApiCall(`/titular/findByCodigo/${codigo}`, url).get()
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

export const finalizarSinistro = async (id, data) => {
    return await new ApiCall(`/pedido/finalizar/${id}`, url).put(data)
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

export const getPacotesByTitular = async (titular) => {
    return await new ApiCall(`/pacote/titular/${titular}`, url).get()
}

export const getPacotesBySegurado = async (segurado) => {
    return await new ApiCall(`/pacote/segurado/${segurado}`, url).get()
}

export const getPacotesByFilter = async (status, pesquisa, pacote, sinistro, data, page, limit) => {
    return await new ApiCall(`/pacote/filter?status=${status}&pesquisa=${pesquisa}&pacote=${pacote}&sinistro=${sinistro}&data=${data}&page=${page}&limit=${limit}`, url).get()
}

export const tentativaDeContato = async (id) => {
    return await new ApiCall(`/pacote/tentativa/${id}`, url).post()
}

export const removerTentativa = async (id, idTentativa) => {
    return await new ApiCall(`/pacote/tentativa/${id}/${idTentativa}`, url).delete()
}

export const updatePacote = async (id, data) => {
    return await new ApiCall(`/pacote/${id}`, url).put(data)
}

export const criarPacote = async () => {
    return await new ApiCall(`/pacote/createManual`, url).post()
}

export const createPacoteAPartiDoPedido = async (id) => {
    return await new ApiCall(`/pacote/criarPacoteAPartirDoPedido/${id}`, url).post()
}

export const uploadArquivo = async (id, data) => {
    return await new ApiCall(`/pacote/upload/${id}`, url).post(data)
}