import { StatusType } from "../c3-dal/chat-api";
import chatReducer, { actions } from "./chat-reducer";

let state={
    chatMessages: [
        {message: 'message1', photo: '', userId: 1, userName: 'user1'},
        {message: 'message2', photo: '', userId: 2, userName: 'user2'},
        {message: 'message3', photo: '', userId: 3, userName: 'user3'},
        {message: 'message4', photo: '', userId: 4, userName: 'user4'}
    ],
        status: 'ready' as StatusType
}

test('chatMessages shoul be increased', () => {
    //1.test data
    let action =actions.messagesRecived([{message: 'message5', photo: '', userId: 5, userName: 'user5'}])

    //2.test action
    let newState  = chatReducer(state, action)

    //3.expectation
    expect(newState.chatMessages.length).toBe(5)

  }); 

test('userName in new chatMessages shoul be correct', () => {
    //1.test data
    let action =actions.messagesRecived([{message: 'message5', photo: '', userId: 5, userName: 'user5'}])

    //2.test action
    let newState  = chatReducer(state, action)

    //3.expectation
    expect(newState.chatMessages[4].userName).toBe('user5')

  });

  test('status should be change', () => {
    //1.test data
    let action =actions.statusChanged('penging')

    //2.test action
    let newState  = chatReducer(state, action)

    //3.expectation
    expect(newState.status).toBe('penging')

  });