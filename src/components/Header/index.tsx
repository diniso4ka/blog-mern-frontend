import React from "react";
import Button from "@mui/material/Button";

import styles from "./Header.module.scss";
import Container from "@mui/material/Container";

import { Link, useNavigate } from "react-router-dom";
import { selectIsAuth, logout } from "../../redux/slices/authSlice/authSlice";
import * as ROUTES from "../../utils/consts";
import { useAppDispatch, useAppSelector } from "../../redux/types";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const isAuth = useAppSelector(selectIsAuth);
  const dispatch = useAppDispatch();
  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      dispatch(logout());
      navigate(ROUTES.HOME_ROUTE);
      window.localStorage.removeItem("token");
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>DENIS BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to={ROUTES.ADDPOST_ROUTE}>
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN_ROUTE}>
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to={ROUTES.REGISTER_ROUTE}>
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
