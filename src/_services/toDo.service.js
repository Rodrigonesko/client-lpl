import { ApiCall } from "./api";
import { getCookie } from "react-use-cookie";
const token = getCookie('token')

export const createToDo = async (_id) => {
    return await new ApiCall(`/newToDo`).post(_id)
}