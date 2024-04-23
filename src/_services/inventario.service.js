import { ApiCall } from "./api";
const token = localStorage.getItem('token')

export const UpdateInventario = async (nome, etiqueta, ondeEsta, descricao) => {
    return await new ApiCall('/inventario/update').put(nome, etiqueta, ondeEsta, descricao)
}

export const findAll = async () => {
    return await new ApiCall('/inventario/findAll').get()
}

export const uploadNotasFiscais = async (formData, _id) => {
    return await new ApiCall(`/inventario/${_id}`, process.env.REACT_APP_API_KEY, token, { headers: { "Content-Type": `multipart/form-data; boundary=${formData._boundary}` } }).post(formData)
}
