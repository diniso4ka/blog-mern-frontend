import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import axios from '../../utils/axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Bolt } from '@mui/icons-material';
import { selectIsAuth } from '../../redux/slices/authSlice/authSlice';

export const Index = () => {
  const isAuth = useSelector(selectIsAuth)
  const token = window.localStorage.getItem('token')
  const userData = useSelector(state => state.auth.data)
  const { id } = useParams()
  const [message, setMessage] = React.useState('')
  const sendMessage = async () => {
    if (message) {
      await axios.post(`/posts/${id}/comments`, {
        "text": `${message}`
      })
      setMessage('')
    }
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
          <Button disabled={!Boolean(token || isAuth)} onClick={sendMessage} variant="contained">Отправить</Button>
        </div>
      </div>
    </>
  );
};
