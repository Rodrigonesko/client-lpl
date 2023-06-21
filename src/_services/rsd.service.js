import { ApiCall } from "./api";

export const buscarInformacoesMo = async (mo) => {
    return await new ApiCall(`/rsd/pessoas/${mo}`).get()
}

export const atualizarInformacoesMo = async (dataNascimento, email, fone1, fone2, fone3, contratoEmpresa, mo) => {
    return await new ApiCall('/rsd/pessoas/editar').put(dataNascimento, email, fone1, fone2, fone3, contratoEmpresa, mo)
}