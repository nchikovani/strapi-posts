import React from 'react';
import {Typography} from "@mui/material";
import styles from './style.module.scss';

const CommentForm = () => {

  return (
    <>
      <Typography variant="h3" className={styles.title}>Оставьте комментарий</Typography>
    </>
  );
};

export default CommentForm;