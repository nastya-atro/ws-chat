import React from 'react';
import { Button, AppBar, Theme, createStyles, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { isAuthSelector, loginSelector } from './../l2-bll/login-selector';
import { logoutThunk } from './../l2-bll/login-reducer';
import s from './LoginPage.module.css'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            flexGrow: 1,
        },
        chat_container: {
            marginTop: theme.spacing(3)
        },
        chat_appBar: {
            backgroundColor: 'rgba(255, 242, 128, 0.986)'
        }
    }),
);


const Header = () => {
    const classes = useStyles();
    const login = useSelector(loginSelector)
    const isAuth = useSelector(isAuthSelector)
    const dispatch = useDispatch()

    const logoutCallback = () => {
        dispatch(logoutThunk())
    }

    return (
        <AppBar className={classes.chat_appBar} position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    Chat online
            </Typography>
                {isAuth ? <>
                    <div className={s.loginName}>
                        {login} </div>
                    <Button  onClick={logoutCallback} color="inherit">Log-out</Button>
                </> :
                    <NavLink className={s.buttonLoginPage} to='/login'> <Button color="inherit">Login</Button></NavLink>
                }
            </Toolbar>
        </AppBar>
    )
}
export default Header