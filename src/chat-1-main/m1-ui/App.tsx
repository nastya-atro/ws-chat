import React from 'react';
import { BrowserRouter} from "react-router-dom";
import { withRouter } from 'react-router';
import { Provider } from 'react-redux';
import store from '../m3-dal/redux-store';
import './App.css';
import ChatPage from '../../chat-2-features/f1-ui/Chat-1-Page';




const App = () =>{
  return (
   <ChatPage />
  );
}


let AppC = withRouter(App)

const AppContainer = () => {
  return (
    <AppC />
  )
}

let MainApp: React.FC = () => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}

export default MainApp