import { AppStateType } from "../../../chat-1-main/m2-bll/redux-store"

export const loginSelector=(state: AppStateType)=>{
    return state.login.login
}

export const isAuthSelector=(state: AppStateType)=>{
    return state.login.isAuth
}

export const captchaSelector=(state: AppStateType)=>{
    return state.login.captcha
}



