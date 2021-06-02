import { getLoginThunk } from '../../chat-2-features/f2-login/l2-bll/login-reducer';
import { CommonActionsTypes, CommonThunkType } from './redux-store';


let initialState = {
    isInitialised: false,
}
type initialStateType = typeof initialState

const appReducer = (state:initialStateType= initialState, action: ActionsTypes):initialStateType => {
    switch (action.type) {
        case 'app/INITIALISED_SUCCESS':
            return {
                ...state,
                isInitialised: true
            }

        default:
            return state;
    }
}

export const actions={
    initializedSuccess:() => ({
        type: 'app/INITIALISED_SUCCESS'
    }) as const
}

type ActionsTypes=CommonActionsTypes<typeof actions>
type ThunkType= CommonThunkType<ActionsTypes>

export const initializeApp = ():ThunkType => async(dispatch) => {
        let promise = await dispatch(getLoginThunk());
        Promise.all([promise])
            dispatch(actions.initializedSuccess()) 
    }
export default appReducer;