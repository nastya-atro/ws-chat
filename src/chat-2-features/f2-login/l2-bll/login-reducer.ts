import { CommonActionsTypes, CommonThunkType } from "../../../chat-1-main/m2-bll/redux-store"
import { loginApi } from './../l3-dal/login-api';


let initialState = {
    id: null as null | number,
    email: null as null | string,
    login: null as null | string,
    isAuth: false,
    captcha: null as string | null
}

type InitialStateType = typeof initialState

const loginReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'login/CAPTCHA_RECIVED':
        case 'login/LOGIN_RECIVED':
            return {
                ...state,
                ...action.payload
            }
        default: return state
    }
}
 
type ActionsTypes = CommonActionsTypes<typeof actions>
type ThunkType = CommonThunkType<ActionsTypes>

export const actions = {
    loginRecived: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'login/LOGIN_RECIVED', payload: { id, email, login, isAuth }
    } as const),
    captchaRecived: (captcha: string | null) => ({
        type: 'login/CAPTCHA_RECIVED', payload: { captcha }
    } as const)
}


export const getLoginThunk = (): ThunkType => {
    return async (dispatch) => {
        let data = await loginApi.authMe()
        if (data.resultCode === 0) {
            let { id, email, login } = data.data;
            dispatch(actions.loginRecived(id, email, login, true))
        } else { console.log('error auth') }
    }
}

export const getCaptcha = (): ThunkType => {
    return async (dispatch) => {
        let data = await loginApi.getCaptcha()
        const captchaUrl = data.url
        dispatch(actions.captchaRecived(captchaUrl))
    }
}

export const loginThunk = (email: string, password: string, rememberMe: boolean, captcha: string | null): ThunkType => {
    return async (dispatch) => {
        let data = await loginApi.loginPost(email, password, rememberMe, captcha)
        if (data.resultCode === 0) {
            dispatch(getLoginThunk())
        } else if (data.resultCode === 10) {
            dispatch(getCaptcha())
        }
    }
}

export const logoutThunk = (): ThunkType => {
    return async (dispatch) => {
        let data = await loginApi.loginDelete()
        if (data.resultCode === 0) {
            dispatch(actions.loginRecived(null, null, null, false))
        } else { console.log('error auth') }
    }
}

export default loginReducer;