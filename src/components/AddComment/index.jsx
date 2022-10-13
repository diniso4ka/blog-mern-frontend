import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import axios from '../../utils/axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/authSlice/authSlice';
import { addComment } from '../../redux/slices/postsSlice/postsSlice';

export const Index = ({ sendMessage }) => {
  const isAuth = useSelector(selectIsAuth)
  const token = window.localStorage.getItem('token')
  const userData = useSelector(state => state.auth.data)
  const dispatch = useDispatch()
  const { id } = useParams()
  const [message, setMessage] = React.useState('')
  const onClickSend = () => {
    sendMessage(message)
    setMessage('')
  }

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={userData ? userData.avatarUrl : null}
        />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
              console.log(message)
            }}
          />
          <Button disabled={!Boolean(token || isAuth)} onClick={onClickSend} variant="contained">Отправить</Button>
        </div>
      </div>
    </>
  );
};
