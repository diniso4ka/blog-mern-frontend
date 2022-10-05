import Container from "@mui/material/Container";
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Header } from "./components";
import { selectIsAuth } from './redux/slices/authSlice/authSlice';
import { fetchAuthMe } from './redux/slices/authSlice/extraReducers';
import { AppRouter } from './routes/AppRouter';

function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)

  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <AppRouter />
      </Container>
    </>
  );
}

export default App;
