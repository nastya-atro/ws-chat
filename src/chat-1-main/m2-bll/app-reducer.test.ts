import appReducer, {actions} from './app-reducer';

let state={
    isInitialised: false
}


test('App shuild be initialized', () => {
    //1.test data
    let action =actions.initializedSuccess()

    //2.test action
    let newState  = appReducer(state, action)

    //3.expectation
    expect(newState.isInitialised).toBeTruthy()

  });