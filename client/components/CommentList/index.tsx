import React from 'react';
import {Typography} from "@mui/material";
import styles from './style.module.scss';
import Colors from '../../styles/colors.module.scss';
import moment from "moment";

const comment = 'Quisque diam volutpat nunc amet euismod sed aliquet sit. Commodo vitae sed sit ipsum nullam porttitor leo. Aenean id ultricies vestibulum interdum suscipit.';
const date = new Date();
const CommentList = () => {
  const comments = [{name: 'Ivan Ivanov', date, comment}, {name: 'User22', date, comment}, {name: 'MyName', date, comment}];

  return (
    <>
      <Typography variant="h3" className={styles.title}>Комментарии</Typography>
      {
        comments.map((comment) => (
          <div key={comment.name} className={styles.comment}>
            <Typography variant="subtitle2" component="p" className={styles.name}>{comment.name}</Typography>
            <Typography variant="body1" className={styles.comment_content}>{comment.comment}</Typography>
            <Typography variant="caption" color={Colors.gray8} className={styles.date}>{moment(comment.date).format('DD MMMM YYYY')}</Typography>
            <hr/>
          </div>
        ))
      }
    </>
  );
};

export default CommentList;