import { Dispatch } from "redux";
import { CommonActionsTypes, CommonThunkType } from "../../../chat-1-main/m2-bll/redux-store";
import { ChatResponseType, chatWebSocketApi, StatusType } from './../c3-dal/chat-api'
  

let initialState = {
    chatMessages: [] as ChatResponseType[],
    status: 'pending' as StatusType
}
type InitialStateType = typeof initialState

const chatReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'chat/MESSAGES_RECIVED':
            return {
                ...state,
                chatMessages: [...state.chatMessages, ...action.newChatMessages]
            }
        case 'chat/STATUS_CHANGED':
            return {
                ...state,
                status: action.status
            }
        default: return state
    }
}
 
type ActionsTypes = CommonActionsTypes<typeof actions>
type ThunkType = CommonThunkType<ActionsTypes>

export const actions = {
    messagesRecived: (newChatMessages: ChatResponseType[]) => ({
        type: 'chat/MESSAGES_RECIVED', newChatMessages } as const),
    statusChanged: (status:StatusType) => ({
        type: 'chat/STATUS_CHANGED', status }as const)
}


let _newMessagesHandler: ((chatMessages: ChatResponseType[]) => void) | null = null
const newChatMessagesHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessagesHandler === null) {
        _newMessagesHandler = (chatMessages) => {
            dispatch(actions.messagesRecived(chatMessages))
        }
    }
    return _newMessagesHandler
}

let _newStatusHandler: ((status: StatusType) => void) | null = null
const newStatusHandlerCreator = (dispatch: Dispatch) => {
    if (_newStatusHandler === null) {
        _newStatusHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _newStatusHandler
}


export const startMessageListeningThunk = (): ThunkType => async (dispatch) => {
    chatWebSocketApi.start()
    chatWebSocketApi.subscribe('messages-recived', newChatMessagesHandlerCreator(dispatch))
    chatWebSocketApi.subscribe('status-changed', newStatusHandlerCreator(dispatch))
}

export const stopMessageListeningThunk = (): ThunkType => async (dispatch) => {
    chatWebSocketApi.stop()
    chatWebSocketApi.unsubscribe('messages-recived', newChatMessagesHandlerCreator(dispatch))
    chatWebSocketApi.unsubscribe('status-changed', newStatusHandlerCreator(dispatch))
}

export const sendmessageThunk = (newMessage: string): ThunkType => async (dispatch) => {
    chatWebSocketApi.sendMessage(newMessage)
}


export default chatReducer;