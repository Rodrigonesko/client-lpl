import { ApiCall } from "./api";

export const UpdateInventario = async (nome, etiqueta, ondeEsta, descricao) => {
    return await new ApiCall('/inventario/update').put(nome, etiqueta, ondeEsta, descricao)
}

export const filterInventario = async ({ nome, etiqueta, ondeEsta, page, limit }) => {
    return await new ApiCall('/inventario/filterInv').post({ nome, etiqueta, ondeEsta, page, limit })
}