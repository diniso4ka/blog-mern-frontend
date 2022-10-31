import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styles from "./Login.module.scss";

import { Navigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { fetchRegister } from "../../redux/slices/authSlice/extraReducers";
import { selectIsAuth } from "../../redux/slices/authSlice/authSlice";
import { HOME_ROUTE } from "../../utils/consts";
import { useAppDispatch, useAppSelector } from "../../redux/types";

export const Registration: React.FC = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (values) => {
    console.log(values);
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      return alert("Не удалось зарегестрироваться.");
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to={HOME_ROUTE} />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register("fullName", {
            required: "Укажите имя",
            minLength: {
              value: 2,
              message: "Имя должно содержать от 2 до 14 символов",
            },
            maxLength: {
              value: 14,
              message: "Имя должно содержать от 2 до 14 символов",
            },
          })}
          className={styles.field}
          label="Полное имя"
          fullWidth
        />
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", {
            required: "Укажите почту",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Неверный формат почты",
            },
          })}
          fullWidth
        />
        <TextField
          {...register("password", {
            required: "Укажите пароль",
            minLength: {
              value: 6,
              message: "Пароль должен содержать от 6 до 24 символов",
            },
            maxLength: {
              value: 24,
              message: "Пароль должен содержать от 6 до 24 символов",
            },
          })}
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          className={styles.field}
          label="Пароль"
          fullWidth
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
