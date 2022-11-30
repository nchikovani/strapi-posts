import React from 'react';
import {Typography} from "@mui/material";
import styles from "./style.module.scss";
import Colors from "../../styles/colors.module.scss";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {post} from "../../types/strapiTypes";
import Image from "next/image";

const PostContent: React.FC<{post: post}> = ({post}) => {

  return (
    <>
      <Typography variant="h2" className={styles.title}>{post.attributes.title}</Typography>
      <div className={styles.date_wrapper}>
        <Typography variant="subtitle1" color={Colors.gray8}>{post.attributes.publishedAt}</Typography>
      </div>
      <Image
        className={styles.img}
        src={`http://strapi:1337${post.attributes.image.data.attributes.url}`}
        width={879}
        height={440}
        alt={post.attributes.title}
      />
      {
        <div className={styles.markdown}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.attributes.content}
          </ReactMarkdown>
        </div>
      }
    </>
  );
};

export default PostContent;