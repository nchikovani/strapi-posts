import React, {useEffect, useState} from 'react';
import {Typography} from "@mui/material";
import styles from './style.module.scss';
import Colors from '../../styles/colors.module.scss';
import moment from "moment";
import {Comment} from "../../types/strapiTypes";
import ContentLoader from "../ui-kit/ContentLoader";

const CommentList = ({comments, isFetching}: {comments: Comment[], isFetching: boolean}) => {

  if (!isFetching && comments.length === 0) {
    return (
      <Typography className={styles.empty_list} variant="subtitle2" component="p" color={Colors.gray6}>
        Комментариев пока нет
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h3" className={styles.title}>Комментарии</Typography>
      {
        isFetching
          ? Array.from(Array(3).keys()).map((key) => (
            <div key={key} className={styles.comment_content_loader}>
              <ContentLoader/>
            </div>
          ))
          : comments.map((comment) => (
            <div key={comment.id} className={styles.comment}>
              <Typography variant="subtitle2" component="p" className={styles.name}>{comment.attributes.name}</Typography>
              <Typography variant="body1" className={styles.comment_content}>{comment.attributes.content}</Typography>
              <Typography variant="caption" color={Colors.gray8} className={styles.date}>{moment(comment.attributes.publishedAt).format('DD MMMM YYYY HH:MM')}</Typography>
              <hr/>
            </div>
          ))
      }
    </>
  );
};

export default CommentList;