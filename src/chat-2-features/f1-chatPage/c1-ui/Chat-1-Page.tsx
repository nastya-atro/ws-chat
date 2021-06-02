import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import FormAddMessages from './Chat-4-FormAddMessages';
import Messages from './Chat-2-Messages';
import { Theme, createStyles, makeStyles, Paper } from '@material-ui/core';
import { startMessageListeningThunk } from '../c2-bll/chat-reducer';
import { stopMessageListeningThunk } from './../c2-bll/chat-reducer';

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
            marginTop: theme.spacing(3)
        },
        chat_appBar: {
            backgroundColor: 'rgba(255, 242, 128, 0.986)'
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
        <Fragment>
            <Paper elevation={0} className={classes.chat_container}>
                <Messages />
            </Paper>
            <FormAddMessages />
        </Fragment>
    )
}


export default ChatPage