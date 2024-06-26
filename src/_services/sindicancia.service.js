import { ApiCall } from "./api";

export const getDemandas = async (limit, page, areaEmpresa, status, servico, analista, codigo, data, abortSignal) => {
    return await new ApiCall(`/sindicancia/demanda?limit=${limit}&page=${page}&areaEmpresa=${areaEmpresa}&status=${status}&servico=${servico}&analista=${analista}&codigo=${codigo}&data=${data}`).get(abortSignal);
}

export const getAreaEmpresa = async () => {
    return await new ApiCall('/sindicancia/areaEmpresa').get();
}

export const getTipoServico = async () => {
    return await new ApiCall('/sindicancia/tipoServico').get();
}

export const getStatus = async () => {
    return await new ApiCall('/sindicancia/status').get();
}

export const getAnalistasSindicancia = async () => {
    return await new ApiCall('/sindicancia/analistasExecucao').get();
}

export const createBeneficiario = async (data) => {
    return await new ApiCall('/sindicancia/demanda/beneficiario').post(data);
}

export const createPrestador = async (data) => {
    return await new ApiCall('/sindicancia/demanda/prestador').post(data);
}

export const deleteBeneficiario = async (data) => {
    return await new ApiCall(`/sindicancia/demanda/beneficiario/delete`).post(data);
}

export const deletePrestador = async (data) => {
    return await new ApiCall(`/sindicancia/demanda/prestador/delete`).post(data);
}

export const getBeneficiarios = async (id) => {
    return await new ApiCall(`/sindicancia/demanda/beneficiario/${id}`).get();
}

export const getPrestadores = async (id) => {
    return await new ApiCall(`/sindicancia/demanda/prestador/${id}`).get();
}

export const getRelatorio = async (data) => {
    return await new ApiCall('/sindicancia/demanda/relatorio').post(data);
}

export const createTipoIrregularidade = async (data) => {
    return await new ApiCall('/sindicancia/demanda/tipoIrregularidade').post(data);
}

export const getTipoIrregularidade = async () => {
    return await new ApiCall('/sindicancia/demanda/tipoIrregularidade').get();
}

export const deleteTipoIrregularidade = async (id) => {
    return await new ApiCall(`/sindicancia/demanda/tipoIrregularidade/${id}`).delete();
}

export const createIrregularidade = async (data) => {
    return await new ApiCall('/sindicancia/demanda/irregularidade').post(data);
}

export const getIrregularidade = async (id) => {
    return await new ApiCall(`/sindicancia/demanda/irregularidade/${id}`).get();
}

export const deleteIrregularidade = async (id) => {
    return await new ApiCall(`/sindicancia/demanda/irregularidade/${id}`).delete();
}

export const createAgenda = async (data) => {
    return await new ApiCall('/sindicancia/demanda/agenda').post(data);
}

export const getAgenda = async (id) => {
    return await new ApiCall(`/sindicancia/demanda/agenda/${id}`).get();
}

export const deleteAgenda = async (id) => {
    return await new ApiCall(`/sindicancia/demanda/agenda/${id}`).delete();
}

export const createValor = async (data) => {
    return await new ApiCall('/sindicancia/demanda/valor').post(data);
}

export const getValor = async (id) => {
    return await new ApiCall(`/sindicancia/demanda/valor/${id}`).get();
}

export const deleteValor = async (id) => {
    return await new ApiCall(`/sindicancia/demanda/valor/${id}`).delete();
}

export const finalizarDemanda = async (data) => {
    return await new ApiCall(`/sindicancia/demanda/finalizar`).post(data);
}

export const voltarDemanda = async (id) => {
    return await new ApiCall(`/sindicancia/demanda/finalizacao/${id}`).delete();
}

export const createComplementacao = async (data) => {
    return await new ApiCall('/sindicancia/demanda/complementacao').post(data);
}

export const getQuantidadeSindicancias = async (mes) => {
    return await new ApiCall(`/sindicancia/demanda/quantidadeDemandasResponsaveis/${mes}`).get()
}

export const getQuantidadeDemandasSindicancia = async (mes) => {
    return await new ApiCall(`/sindicancia/demanda/quantidadeDemandasSindicancia/${mes}`).get()
}

export const getQuantidadeIndividualSindicancia = async (mes) => {
    return await new ApiCall(`/sindicancia/demanda/quantidadeIndividualSindicancia/${mes}`).get()
}

export const getProducaoIndividualSindi = async (mes, analista) => {
    return await new ApiCall(`/sindicancia/demanda/producaoIndividualSindi/${mes}/${analista}`).get()
}

export const getcomparativoProducaoSindi = async (mes, analista) => {
    return await new ApiCall(`/sindicancia/demanda/comparativoProducaoSindi/${mes}/${analista}`).get()
}

export const getQuantidadeDemandasMensal = async (mes) => {
    return await new ApiCall(`/sindicancia/demanda/quantidadeDemandasMensal/${mes}`).get()
}

export const createItemChecklist = async (data) => {
    return await new ApiCall('/sindicancia/itemChecklist').post(data);
}

export const getItemChecklist = async () => {
    return await new ApiCall('/sindicancia/itemChecklist').get();
}

export const deleteItemChecklist = async (id) => {
    return await new ApiCall(`/sindicancia/itemChecklist/${id}`).delete();
}

export const getChecklist = async (id) => {
    return await new ApiCall(`/sindicancia/demanda/checklist/${id}`).get();
}

export const createDatasBradesco = async (id) => {
    return await new ApiCall(`/sindicancia/demanda/gerarDatas`).post(id);
}

export const alterarPreviaEnviadaBradesco = async ({ id, envio_previa }) => {
    return await new ApiCall(`/sindicancia/demanda/alterarEnvioDePreviaBradesco`).put({ id, envio_previa });
}

export const createSolicitante = async (data) => {
    return await new ApiCall('/sindicancia/demanda/solicitante').post(data);
}