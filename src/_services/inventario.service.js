import { ApiCall } from "./api";

export const UpdateInventario = async (nome, etiqueta, ondeEsta, descricao) => {
    return await new ApiCall('/inventario/update').put(nome, etiqueta, ondeEsta, descricao)
}
export const findAll = async () => {
    return await new ApiCall('/inventario/findAll').get()
}
