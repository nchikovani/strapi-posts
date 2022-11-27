import React from 'react';
import {Typography} from "@mui/material";
import styles from './style.module.scss';

const CommentList = () => {

  return (
    <>
      <Typography variant="h3" className={styles.title}>Комментарии</Typography>
    </>
  );
};

export default CommentList;