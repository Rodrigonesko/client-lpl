import { ApiCall } from "./api";
const token = localStorage.getItem('token')

export const UpdateInventario = async (nome, etiqueta, ondeEsta, descricao) => {
    return await new ApiCall('/inventario/update').put(nome, etiqueta, ondeEsta, descricao)
}

export const uploadNotasFiscais = async (formData, _id) => {
    return await new ApiCall(`/inventario/${_id}`, process.env.REACT_APP_API_KEY, token, { headers: { "Content-Type": `multipart/form-data; boundary=${formData._boundary}` } }).post(formData)
}

export const filterInventario = async (nomeItem, ondeEsta, etiqueta, status, page, limit) => {
    return await new ApiCall(`/inventario/filter?nomeItem=${nomeItem}&ondeEsta=${ondeEsta}&etiqueta=${etiqueta}&status=${status}&page=${page}&limit=${limit}`).get()
}

export const findAllInventario = async () => {
    return await new ApiCall(`/inventario/findAll`).get()
}