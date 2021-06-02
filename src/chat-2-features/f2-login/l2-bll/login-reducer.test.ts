import loginReducer, { actions, getCaptcha, getLoginThunk, loginThunk, logoutThunk } from "./login-reducer";
import { loginApi } from './../l3-dal/login-api';
import { ResponseTypeAuthMe, ResponseTypeCaptcha, ResponseType } from './../../../chat-1-main/m3-dal/api'

jest.mock('./../l3-dal/login-api')
const loginApiMock = loginApi as jest.Mocked<typeof loginApi>

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
  dispatchMock.mockClear()
  getStateMock.mockClear()
})

let state = {
  id: null, email: null, login: null, isAuth: false, captcha: null
}




test('getLoginThunk testing', async () => {
  const result: ResponseTypeAuthMe = {
    resultCode: 0, messages: [], data: { id: 1, email: '', login: '' }
  }

  loginApiMock.authMe.mockReturnValue(Promise.resolve(result))
  const thunk = getLoginThunk()

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(1)
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.loginRecived(1, '', '', true))
  expect(dispatchMock).toBeCalledWith({  type: 'login/LOGIN_RECIVED', payload: { id: 1, email: '', login:'', isAuth:true }})
})



test('getCaptcha testing', async () => {
  const result: ResponseTypeCaptcha = {
    url:''
  }

  loginApiMock.getCaptcha.mockReturnValue(Promise.resolve(result))
  const thunk = getCaptcha()

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(1)
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.captchaRecived(''))
  expect(dispatchMock).toBeCalledWith({type: 'login/CAPTCHA_RECIVED', payload: { captcha:'' }})
})


test('loginThunk testing with resultCode-"Success"', async () => {
  const result: ResponseType = {
    resultCode: 0, messages: [], data: {}
  }

  loginApiMock.loginPost.mockReturnValue(Promise.resolve(result))
  const thunk = loginThunk('', '', true, null)

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(1)
})



test('loginThunk testing with resultCode-"Get captcha"', async () => {
  const result: ResponseType = {
    resultCode: 10, messages: [], data: {}
  }

  loginApiMock.loginPost.mockReturnValue(Promise.resolve(result))
  const thunk = loginThunk('', '', true, null)

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(1)
})



test('logoutThunk testing', async () => {
  const result: ResponseType = {
    resultCode: 0, messages: [], data: {}
  }

  loginApiMock.loginDelete.mockReturnValue(Promise.resolve(result))
  const thunk = logoutThunk()

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(1)
})


test('Id of user shoul be correct', () => {
  let action = actions.loginRecived(1, 'nastya@gmail.ru', 'nastya', true)

  let newState = loginReducer(state, action)

  expect(newState.id).toBe(1)
});



test('User should be authorized', () => {
  let action = actions.loginRecived(1, 'nastya@gmail.ru', 'nastya', true)

  let newState = loginReducer(state, action)

  expect(newState.isAuth).toBeTruthy()
});



test('Captcha chould not be null', () => {
  let action = actions.captchaRecived('')

  let newState = loginReducer(state, action)

  expect(newState.captcha).not.toBeNull()
});