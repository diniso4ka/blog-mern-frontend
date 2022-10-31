import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import { selectIsAuth } from "../../redux/slices/authSlice/authSlice";
import { useAppSelector } from "../../redux/types";

interface PropsTypes {
  sendMessage: (e) => void;
}

export const Index: React.FC<PropsTypes> = ({ sendMessage }) => {
  const isAuth = useAppSelector(selectIsAuth);
  const token = window.localStorage.getItem("token");
  const userData = useAppSelector((state) => state.auth.data);
  const [message, setMessage] = React.useState("");
  const onClickSend = () => {
    sendMessage(message);
    setMessage("");
  };

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
              setMessage(e.target.value);
            }}
          />
          <Button
            disabled={!Boolean(token || isAuth)}
            onClick={onClickSend}
            variant="contained"
          >
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
