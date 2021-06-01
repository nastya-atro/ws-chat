import { Action, applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware, { ThunkAction} from "redux-thunk";
import chatReducer from "../../chat-2-features/f2-bll/chat-reducer";

let rootReducer = combineReducers({
    chat: chatReducer
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>
export type CommonActionsTypes<T> = T extends {[key: string]:(...args:any[])=> infer U }?U:never
export type CommonThunkType<A extends Action>= ThunkAction<Promise<void>, AppStateType, unknown, A>

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store