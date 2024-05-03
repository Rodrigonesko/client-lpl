import { ApiCall } from "./api";
const token = localStorage.getItem('token')
const url = 'http://localhost:5001'

/* Perguntas */

export const buscarPerguntas = async () => {
    return await new ApiCall('/pergunta', url).get()
}

export const criarPergunta = async (data) => {
    return await new ApiCall('/pergunta', url).post(data)
}

export const deletarPergunta = async (id) => {
    return await new ApiCall(`/pergunta/${id}`, url).delete()
}

/* Questionario */

export const buscarQuestionarios = async () => {
    return await new ApiCall('/questionario', url).get()
}

export const createQuestionario = async (data) => {
    return await new ApiCall('/questionario', url).post(data)
}