import React, {useEffect, useState} from 'react';
import {Typography} from "@mui/material";
import styles from './style.module.scss';
import Colors from '../../styles/colors.module.scss';
import moment from "moment";
import {comment} from "../../types/strapiTypes";

const CommentList = ({comments}: {comments: comment[]}) => {

  return (
    <>
      <Typography variant="h3" className={styles.title}>Комментарии</Typography>
      {
        comments.map((comment) => (
          <div key={comment.id} className={styles.comment}>
            <Typography variant="subtitle2" component="p" className={styles.name}>{comment.attributes.name}</Typography>
            <Typography variant="body1" className={styles.comment_content}>{comment.attributes.content}</Typography>
            <Typography variant="caption" color={Colors.gray8} className={styles.date}>{moment(comment.attributes.publishedAt).format('DD MMMM YYYY')}</Typography>
            <hr/>
          </div>
        ))
      }
    </>
  );
};

export default CommentList;