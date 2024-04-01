import axios from "axios";
import { getCookie } from "react-use-cookie";

export class ApiCall {

    constructor(route, apiBaseUrl = process.env.REACT_APP_API_KEY, token = localStorage.getItem('token'), config = undefined) {
        this.base = apiBaseUrl;
        this.currentRoute = route;
        this.currentConfig = config;
        this.token = token
        return this;
    }

    caller() {
        const instance = axios.create({ baseURL: this.base, timeout: 300000 })
        instance.interceptors.request.use(config => {
            config.withCredentials = true
            config.headers.Authorization = `Bearer ${this.token}`
            return config
        })

        return instance
    }

    blob() {
        return axios.create({ baseURL: this.base, timeout: 300000, responseType: 'blob' });
    }

    async download(obj = undefined) {
        try {
            const data = await this.blob().post(this.currentRoute, obj, this.currentConfig);
            return data.data;
        } catch (err) {
            throw err;
        }
    }

    async post(obj = undefined) {
        try {
            const data = await this.caller().post(this.currentRoute, obj, this.currentConfig);
            console.log(data.data);
            return data.data;
        } catch (err) {
            throw err;
        }
    }

    async patch(obj = undefined) {
        try {
            const data = await this.caller().patch(this.currentRoute, obj, this.currentConfig);
            return data.data;
        } catch (err) {
            throw err
        }
    }

    async put(obj = undefined) {
        try {
            const data = await this.caller().put(this.currentRoute, obj, this.currentConfig);
            return data.data;
        } catch (err) {
            throw err
        }
    }

    async get(abortSignal) {
        try {
            const data = await this.caller().get(this.currentRoute, { ...this.currentConfig, cancelToken: abortSignal });
            return data.data;
        } catch (err) {
            if (axios.isCancel(err)) {
                console.log('Request canceled', err.message);
            } else {
                throw err
            }
        }
    }

    async delete() {
        try {
            const data = await this.caller().delete(this.currentRoute, this.currentConfig);
            return data.data;
        } catch (err) {
            throw err
        }
    }
}