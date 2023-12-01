import { ApiCall } from "./api";

export const UpdateInventario = async (nome, etiqueta, ondeEsta, descricao) => {
    return await new ApiCall('/inventario/update').put(nome, etiqueta, ondeEsta, descricao)
}