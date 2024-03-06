import { ApiCall } from "./api";
const token = localStorage.getItem('token')

export const createToDo = async (_id) => {
    return await new ApiCall(`/newToDo`).post(_id)
}