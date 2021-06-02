import { instanse, ResponseTypeCaptcha, ResponseTypeAuthMe, ResponseType } from './../../../chat-1-main/m3-dal/api';

 
export const loginApi = {
    loginPost(email: string, password: string, rememberMe: boolean, captcha: string | null) {
        return instanse.post<ResponseType>(`auth/login`, { email, password, rememberMe, captcha })
            .then(res => res.data)
    },
    loginDelete() {
        return instanse.delete<ResponseType>(`auth/login`)
            .then(res => res.data)
    },
    authMe() {
        return instanse.get<ResponseTypeAuthMe>(`auth/me`)
        .then(res => res.data)
    },
    getCaptcha(){
        return instanse.get<ResponseTypeCaptcha>(`security/get-captcha-url`)
        .then(res => res.data)
    }

}