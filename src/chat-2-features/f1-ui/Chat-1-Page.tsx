import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { startMessageListeningThunk } from '../f2-bll/chat-reducer';
import { stopMessageListeningThunk } from './../f2-bll/chat-reducer';
import FormAddMessages from './Chat-4-FormAddMessages';
import Messages from './Chat-2-Messages';
import s from './Chat.module.css'
import { Button, AppBar, Box, Container, Theme, createStyles, IconButton, makeStyles, Toolbar, Typography, Paper } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        chat_container: {
            marginTop: theme.spacing(3),
        },
        chat_appBar: {
            backgroundColor: 'rgba(39, 28, 28, 0.315)'
        }
    }),
);

const ChatPage: React.FC = () => {
    const classes = useStyles();



    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessageListeningThunk())

        return () => {
            dispatch(stopMessageListeningThunk())
        }
    }, [])

    return (

        <Container  className={classes.chat_container} maxWidth="md">
            <Paper>
            <AppBar className={classes.chat_appBar} position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Chat online
    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Paper elevation={0} className={classes.chat_container}>
                <Messages />
            </Paper>
            <FormAddMessages />
            </Paper>

        </Container>
    )
}


export default ChatPage