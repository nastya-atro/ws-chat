import { AppStateType } from "./redux-store"


export const appSelector=(state: AppStateType)=>{
    return state.app.isInitialised
}

