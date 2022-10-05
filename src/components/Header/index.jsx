import React from 'react';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';


import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth, logout } from '../../redux/slices/authSlice/authSlice';
import * as ROUTES from '../../utils/consts';


export const Header = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()
  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout())
      window.localStorage.removeItem('token')
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
                <Button onClick={onClickLogout} variant="contained" color="error">
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
