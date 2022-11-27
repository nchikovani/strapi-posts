import React, {useState} from 'react';
import {TextField, Typography} from "@mui/material";
import styles from './style.module.scss';
import {LoadingButton} from "@mui/lab";

const CommentForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const onSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      console.log(name, comment);
      setIsLoading(false);
    }, 1000);
  }

  return (
    <>
      <Typography variant="h3" className={styles.title}>Оставьте комментарий</Typography>
      <TextField
        placeholder="Ваше имя"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={styles.name}
      />
      <TextField
        placeholder="Ваш комментарий"
        fullWidth
        multiline
        rows={6}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className={styles.comment}
      />
      <div className={styles.button_wrapper}>
        <LoadingButton
          variant="outlined"
          loading={isLoading}
          loadingPosition="end"
          onClick={onSubmit}
        >Отправить</LoadingButton>
      </div>
    </>
  );
};

export default CommentForm;