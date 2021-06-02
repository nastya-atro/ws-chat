import React from 'react';
import { Formik, Form, Field, FormikErrors } from 'formik';
import s from './LoginPage.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from './../l2-bll/login-reducer';
import { captchaSelector, isAuthSelector } from './../l2-bll/login-selector';
import { Redirect } from 'react-router';
import { Checkbox, FormControlLabel, TextField, Button } from '@material-ui/core';

type ValuesType = {
    email: string
    password: string
    captcha: string
    checkbox: any
}

const validateForm = (values: ValuesType) => {
    const errors: FormikErrors<ValuesType> = {};
    if (!values.email) {
        errors.email = 'Required';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address';
    }
    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 6) {
        errors.password = 'Must be more then 6 characters'
    }
    return errors;
}

const LoginPage = () => {
    const dispatch = useDispatch()
    const captcha = useSelector(captchaSelector)
    const isAuth = useSelector(isAuthSelector)

    if (isAuth) {
        return <Redirect to={'/chat'} />
    }

    const submit = (values: ValuesType, onSubmitProps: any) => {
        dispatch(loginThunk(values.email, values.password, values.checkbox, values.captcha))
        onSubmitProps.setSubmitting(false);

    }

    return (
        <div>
            <Formik
                initialValues={{ email: '', password: '', checkbox: 'true', captcha: '' }}
                validate={validateForm}
                onSubmit={submit}
            >
                {({ values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isValid,
                    isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>
                        <div className={s.login_form}>
                            <div >
                                <TextField id="standard-basic" label="Login" onChange={handleChange} onBlur={handleBlur} type="email"
                                    name="email" value={values.email} className={s.chat_textField} />
                                <div className={s.error}> {errors.email && touched.email && errors.email}</div>
                            </div>
                            <div>
                                <TextField onChange={handleChange} onBlur={handleBlur}
                                    type="password" name="password" placeholder="Password" value={values.password}
                                    id="standard-password-input" autoComplete="current-password" className={s.chat_textField} />
                                <div className={s.error}>{errors.password && touched.password && errors.password} </div>
                            </div>
                            <div>
                                <FormControlLabel
                                    control={<Checkbox onChange={handleChange} name="checkbox" inputProps={{ 'aria-label': 'primary checkbox' }} />}
                                    label="remember me" />
                            </div>

                            {captcha && <Field onChange={handleChange} type="text" name="captcha" />}
                            <div className={s.buttonLogin} >
                                <Button style={{ backgroundColor: 'rgba(255, 242, 128, 0.986)' }} type="submit" disabled={!isValid || isSubmitting} variant="contained" color="secondary">
                                    Log in </Button> </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )

}

export default LoginPage