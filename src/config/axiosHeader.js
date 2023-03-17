import { getCookie } from "react-use-cookie";

const token = getCookie('token');

console.log(token);

const config = {
    headers: { Authorization: `Bearer ${token}` }
}

export default config

