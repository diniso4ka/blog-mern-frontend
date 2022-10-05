import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import styles from "./Login.module.scss";

import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { fetchAuth } from '../../redux/slices/authSlice/extraReducers';
import { selectIsAuth } from '../../redux/slices/authSlice/authSlice';
import { HOME_ROUTE } from '../../utils/consts';

export const Login = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onSubmit'
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values))

    if (!data.payload) {
      return alert('Не удалось авторизироваться.')
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }


  if (isAuth) {
    return <Navigate to={HOME_ROUTE} />
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', {
            required: 'Укажите почту',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Неверный формат почты'
            }
          })}
          fullWidth
        />
        <TextField
          {...register('password',
            {
              required: 'Укажите пароль',
              minLength: { value: 6, message: 'Пароль должен содержать от 6 до 24 символов' },
              maxLength: { value: 24, message: 'Пароль должен содержать от 6 до 24 символов' }
            }
          )}
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          className={styles.field}
          label="Пароль"
          fullWidth />
        <Button type='submit' size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
