import React from 'react';
import styles from "../PostList/style.module.scss";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Colors from "../../styles/colors.module.scss";
import {post} from "../../types/strapiTypes";
import moment from "moment";

interface PostProps {
  post: post;
  handlePostClick: (url: string) => void;
}

const Post: React.FC<PostProps> = ({post, handlePostClick}) => {
  return (
    <div>
      <hr/>
      <div className={styles.post} onClick={() => handlePostClick(post.attributes.segment_name)}>
        <Image
          className={styles.post__img}
          src={`http://strapi:1337${post.attributes.image.data.attributes.formats.small.url}`}
          width={356}
          height={178}
          alt={post.attributes.title}
        />
        <div className={styles.post__content}>
          <Typography className={styles.post__category} variant="caption">{post.attributes.category.data.attributes.name}</Typography>
          <Typography className={styles.post__title} variant="h3">{post.attributes.title}</Typography>
          <Typography className={styles.post__description} variant="body1">{post.attributes.description}</Typography>
          <Typography className={styles.post__date} variant="subtitle1" color={Colors.gray8}>{moment(post.attributes.publishedAt).format('DD MMMM YYYY')}</Typography>
        </div>
      </div>
    </div>
  )
};

export default Post;