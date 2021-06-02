import axios from "axios"

export const instanse = axios.create({
    withCredentials: true,
    headers: { "API-KEY": "e33a9b28-32d1-4022-81b8-0bd4ba992caa" },
    baseURL: `https://social-network.samuraijs.com/api/1.0/`
})


export type ResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
}
export type ResponseTypeCaptcha = {
    url: string
}

export type ResponseTypeAuthMe = {
    resultCode: number
    messages: Array<string>
    data: {
        id: number
        email: string
        login: string
    }
}

