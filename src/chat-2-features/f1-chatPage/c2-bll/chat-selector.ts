import { AppStateType } from "../../../chat-1-main/m2-bll/redux-store"


export const messagesSelector=(state: AppStateType)=>{
    return state.chat.chatMessages
}

export const statusSelector=(state: AppStateType)=>{
    return state.chat.status
}