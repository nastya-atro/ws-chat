import { Avatar, Grid, makeStyles, createStyles, Theme } from '@material-ui/core';
import React from 'react';
import { ChatResponseType } from '../f3-dal/chat-api';
import s from './Chat.module.css'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        chat_userPhoto: {
            width: theme.spacing(7),
            height: theme.spacing(7),
            marginTop: theme.spacing(1),

        },
    }),
);

const Message: React.FC<ChatResponseType> = (props) => {
    const classes = useStyles();
    return (
        <Grid container direction="row" alignItems="center">
            <Grid item xs={2} >
                <Grid container direction="column" alignItems="center">
                    <Grid item>{props.photo ? <Avatar className={classes.chat_userPhoto} alt='userPhoto' src={props.photo} /> :
                        <Avatar className={classes.chat_userPhoto} aria-label="recipe">{props.userName.charAt(0).toUpperCase()} </Avatar>}</Grid>
                    <Grid item className={s.chat_userName}>{props.userName}</Grid>
                </Grid>
            </Grid>

            <Grid item xs>
                <Grid item xs className={s.chat_userMessage}>{props.message}</Grid></Grid>
        </Grid>

    )
}

export default Message