import { ApiCall } from "./api";
const token = localStorage.getItem('token')

export const buscarInformacoesMo = async (mo) => {
    return await new ApiCall(`/rsd/pessoas/${mo}`).get()
}

export const atualizarInformacoesMo = async (data) => {
    return await new ApiCall('/rsd/pessoas/editar').put(data)
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

export const criarProtocolo = async (data) => {
    return await new ApiCall('/rsd/protocolo/criar').post(data)
}

export const getPedidosPorPacote = async (pacote) => {
    return await new ApiCall(`/rsd/pedidos/pacote/${pacote}`).get()
}

export const baixaAgd = async (data) => {
    return await new ApiCall(`/rsd/baixaAgd`, process.env.REACT_APP_API_KEY, token, { headers: { "Content-Type": `multipart/form-data; boundary=${data._boundary}` } }).post(data)
}

export const getConcluidoRsd = async (pesquisa) => {
    return await new ApiCall(`/rsd/concluidos/${pesquisa}`).get()
}

export const getPedidosNaoFinalizados = async () => {
    return await new ApiCall('/rsd/pedidos/naoFinalizados/naoFinalizados').get()
}

export const filtroPedidosNaoFinalizados = async (pesquisa, analista) => {
    return await new ApiCall(`/rsd/pedidos/naoFinalizados/filtro?pesquisa=${pesquisa}&analista=${analista}`).get()
}

export const criarPacoteRsd = async (data) => {
    return await new ApiCall('/rsd/pacote/criar').post(data)
}

export const assumirPacote = async (data) => {
    return await new ApiCall('/rsd/pacote/assumir').put(data)
}

export const devolverPacote = async (data) => {
    return await new ApiCall('/rsd/pacote/devolver').put(data)
}

export const getPedidosPorMo = async (mo) => {
    return await new ApiCall(`/rsd/pedidos/mo/${mo}`).get()
}

export const criarPedido = async (data) => {
    return await new ApiCall('/rsd/pedido/criar').post(data)
}

export const getMoPorProtocolo = async (protocolo) => {
    return await new ApiCall(`/rsd/mo/${protocolo}`).get()
}

export const criarPedidoIndividual = async (data) => {
    return await new ApiCall('/rsd/pedido/criar/individual').post(data)
}

export const getOperadoras = async () => {
    return await new ApiCall('/rsd/operadoras').get()
}

export const criarOperadora = async (data) => {
    return await new ApiCall('/rsd/operadoras/criar').post(data)
}

export const anexarGravacao = async (data, idPacote) => {
    return await new ApiCall(`/rsd/gravacao/anexar/${idPacote}`, process.env.REACT_APP_API_KEY, token, { headers: { "Content-Type": `multipart/form-data; boundary=${data._boundary}` } }).post(data)
}

export const getFormasPagamento = async () => {
    return await new ApiCall('/rsd/formasPagamento').get()
}

export const getStatusFinalizacao = async () => {
    return await new ApiCall('/rsd/statusFinalizacoes').get()
}

export const atualizarPedido = async (data) => {
    return await new ApiCall('/rsd/pedido/atualizar').put(data)
}

export const novoParecerAgenda = async (data) => {
    return await new ApiCall('/rsd/agenda/novoParecer').post(data)
}

export const voltarFasePacote = async (data) => {
    return await new ApiCall('/rsd/pacote/voltarFase').put(data)
}

export const inserirPrioridadeDossiePacote = async (data) => {
    return await new ApiCall('/rsd/pacote/prioridadeDossie').put(data)
}

export const getAgendaRsd = async (idPacote) => {
    return await new ApiCall(`/rsd/agenda/${idPacote}`).get()
}

export const getArquivos = async (idPacote) => {
    return await new ApiCall(`/rsd/arquivos/${idPacote}`).get()
}

export const getProducaoDiaria = async (dia) => {
    return await new ApiCall(`/rsd/producaoDiaria/${dia}`).get()
}

export const getTodosOsPedidos = async () => {
    return await new ApiCall('/rsd/pedidos/todos').get()
}

export const getRelatorio = async (aPartir, ate) => {
    return await new ApiCall(`/rsd/relatorio/${aPartir}/${ate}`).get()
}

export const uploadAltaFrequencia = async (data) => {
    return await new ApiCall('/rsd/uploadQuarentena', process.env.REACT_APP_API_KEY, token, { headers: { "Content-Type": `multipart/form-data; boundary=${data._boundary}` } }).post(data)
}

export const uploadRsd = async (data) => {
    return await new ApiCall('/rsd/upload', process.env.REACT_APP_API_KEY, token, { headers: { "Content-Type": `multipart/form-data; boundary=${data._boundary}` } }).post(data)
}

export const subirPedidos = async (data) => {
    return await new ApiCall('/rsd/subir').post(data)
}

export const relatorioProducaoRsd = async () => {
    return await new ApiCall('/rsd/relatorioProducao').get()
}

export const getProdutividadeMensalRsd = async (mes, analista) => {
    return await new ApiCall(`/rsd/producaoMensal/${mes}/${analista}`).get()
}

export const adicionarFormaPagamento = async (data) => {
    return await new ApiCall('/rsd/formaPagamento').post(data)
}

export const deleteFormaPagamento = async (id) => {
    return await new ApiCall(`/rsd/formaPagamento/${id}`).delete()
}

export const adicionarFinalizacao = async (data) => {
    return await new ApiCall('/rsd/finalizacao').post(data)
}

export const deleteFinalizacao = async (id) => {
    return await new ApiCall(`/rsd/finalizacao/${id}`).delete()
}

export const relatorioProducaoMensal = async (mes) => {
    return await new ApiCall(`/rsd/relatorioProducaoMensal/${mes}`).get()
}

export const producaoIndividualRsd = async (dataInicio, dataFim) => {
    return await new ApiCall(`/rsd/producaoIndividualRsd?dataInicio=${dataInicio}&dataFim=${dataFim}`).get()
}

export const getQuantidadeProducaoRsd = async (mes) => {
    return await new ApiCall(`/rsd/quantidadeProducaoRsd/${mes}`).get()
}

export const getQuantidadePagamentosRsd = async (mes) => {
    return await new ApiCall(`/rsd/quantidadePagamentosRsd/${mes}`).get()
}

export const getQuantidadeStatusGerenciais = async (mes) => {
    return await new ApiCall(`/rsd/quantidadeStatusGerenciais/${mes}`).get()
}

export const getQuantidadeStatusAmil = async (mes) => {
    return await new ApiCall(`/rsd/quantidadeStatusAmil/${mes}`).get()
}

export const getQuantidadePedidosIndeferidos = async (mes) => {
    return await new ApiCall(`/rsd/quantidadePedidosIndeferidos/${mes}`).get()
}

export const getAnaliticoRsdMensal = async (mes) => {
    return await new ApiCall(`/rsd/analitico/${mes}`).get()
}

export const getProducaoIndividualRsd = async (mes, analista) => {
    return await new ApiCall(`/rsd/producaoIndividual/${mes}/${analista}`).get()
}

export const getComparativoProducaoRsd = async (mes, analista) => {
    return await new ApiCall(`/rsd/comparativoProducao/${mes}/${analista}`).get()
}

export const encontrarPessoas = async (pesquisa) => {
    return await new ApiCall(`/rsd/findPessoas/${pesquisa}`).get()
}

export const findPlanoPf = async (data) => {
    return await new ApiCall('/rsd/findPlano').post(data)
}