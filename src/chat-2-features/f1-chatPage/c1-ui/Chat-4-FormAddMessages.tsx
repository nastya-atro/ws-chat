import { TextField, Theme, makeStyles, createStyles, Button, Grid } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './Chat.module.css'
import Icon from '@material-ui/core/Icon';
import { sendmessageThunk } from '../c2-bll/chat-reducer';
import { statusSelector } from '../c2-bll/chat-selector';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textField: {
            width: '88%',
            backgroundColor: 'rgba(255, 242, 128, 0.356)'
        },
        button: {
            width: '90%',
            marginLeft: '8px',
            padding: '13px 5px',
            backgroundColor: 'rgba(255, 242, 128, 0.986)'
        }
    }),
);


const FormAddMessages: React.FC = () => {
    const classes = useStyles();
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const status = useSelector(statusSelector)

    const sendMessage = () => {
        if (!message) {
            return
        }
        dispatch(sendmessageThunk(message))
        setMessage('')
    }

    return (
        <div className={s.chat_form}>
            <form noValidate autoComplete="off">
                <Grid container alignItems="center">
                    <Grid item xs={2}>
                        <Button disabled={status !== 'ready'} onClick={sendMessage}
                            variant="contained" color="inherit" className={classes.button} endIcon={<Icon>send</Icon>}>Send</Button>
                    </Grid>
                    <Grid item xs>
                        <TextField className={classes.textField} id="outlined-basic"
                            variant="outlined" label="Your message..."
                            onChange={(e) => setMessage(e.currentTarget.value)} value={message} />
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default FormAddMessages