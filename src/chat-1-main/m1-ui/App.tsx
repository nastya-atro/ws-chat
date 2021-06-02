import React, { useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";
import { Redirect, Route, withRouter } from 'react-router';
import { Provider, useSelector, useDispatch } from 'react-redux';
import './App.css';
import store from '../m2-bll/redux-store';
import { initializeApp } from '../m2-bll/app-reducer';
import { appSelector } from './../m2-bll/app-selector';
import { Container, Theme, createStyles, makeStyles, Paper } from '@material-ui/core';
import LoginPage from './../../chat-2-features/f2-login/l1-ui/LoginPage';
import ChatPage from '../../chat-2-features/f1-chatPage/c1-ui/Chat-1-Page';
import Header from '../../chat-2-features/f2-login/l1-ui/Header';
import { isAuthSelector } from '../../chat-2-features/f2-login/l2-bll/login-selector';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
    chat_container: {
      marginTop: theme.spacing(3),
    },
    chat_paper: {
      minHeight: '650px'
    }
  }),
);

const App = () => {
  const classes = useStyles()
  const isInitialised = useSelector(appSelector)
  const dispatch = useDispatch()
  const isAuth=useSelector(isAuthSelector)

  useEffect(() => {
    dispatch(initializeApp())
  }, [])

 
  if (!isInitialised) {
    return <div>Loaging...</div>
  }
 
  return (
    <Container className={classes.chat_container} maxWidth="md">
      <Paper elevation={3} className={classes.chat_paper}>
        <Header />
        <Route exact path='/' render={() => <Redirect to={'/chat'} />} />
        <Route path='/chat' render={() => <ChatPage />} />
        <Route path='/login' render={() => <LoginPage />} />
      </Paper>
    </Container>
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