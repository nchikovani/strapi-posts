import React, {useState} from 'react';
import {TextField, Typography} from "@mui/material";
import styles from './style.module.scss';
import {LoadingButton} from "@mui/lab";
import {AddComment} from "../../hooks/useComments";

const CommentForm = ({addComment}: {addComment: AddComment}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const onSubmit = async () => {
    setIsLoading(true);
    await addComment({name, content})
    setIsLoading(false);
    setName('')
    setContent('')
  }

  return (
    <div  className={styles.comment_form}>
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
        value={content}
        onChange={(e) => setContent(e.target.value)}
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
    </div>
  );
};

export default CommentForm;