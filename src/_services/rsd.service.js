import { ApiCall } from "./api";

export const buscarInformacoesMo = async (mo) => {
    return await new ApiCall(`/rsd/pessoas/${mo}`).get()
}

export const atualizarInformacoesMo = async (dataNascimento, email, fone1, fone2, fone3, contratoEmpresa, mo) => {
    return await new ApiCall('/rsd/pessoas/editar').put(dataNascimento, email, fone1, fone2, fone3, contratoEmpresa, mo)
}

export const devolverPedido = async (id, motivoInativo) => {
    return await new ApiCall('/rsd/pedido/devolverAmil').put(id, motivoInativo)
}

export const voltarFasePedido = async (pedido) => {
    return await new ApiCall('/rsd/pedido/voltarFase').put(pedido)
}

export const prioridadeDossie = async (pedido, prioridade) => {
    return await new ApiCall('/rsd/pedido/prioridadeDossie').put(pedido, prioridade)
}

export const editarPedido = async (pedido, pedidoEditado, nf, cnpj, clinica, valorApresentado, valorReembolsado) => {
    return await new ApiCall('/rsd/pedido/editar').put(pedido, pedidoEditado, nf, cnpj, clinica, valorApresentado, valorReembolsado)
}

export const buscarClinica = async (cnpj) => {
    return await new ApiCall('/rsd/clinica/busca').put(cnpj)
}

export const devolverProtocoloInativo = async (protocolo, pacote) => {
    return await new ApiCall('/rsd/protocolo/devolver').put(protocolo, pacote)
}

export const getPedidosPorPacote = async (pacote) => {
    return await new ApiCall(`/rsd/pedidos/${pacote}`).get()
}