import React, {useEffect, useState} from 'react';
import styles from "./style.module.scss";
import Typography from "@mui/material/Typography";
import Colors from '../../styles/colors.module.scss';
import {LoadingButton} from "@mui/lab";
import {useRouter} from "next/router";
import Image from 'next/image'
import {post} from "../../types/strapiTypes";
import getPosts from "../../libs/getPosts";

interface PostListProps {
  defaultPosts: post[];
  postsTotal: number;
}

const PostList: React.FC<PostListProps> = ({defaultPosts, postsTotal}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<post[]>(defaultPosts);
  const router = useRouter();

  const handlePostClick = (segment_name: string) => {
    router.push(`/post/${segment_name}`)
  };

  const loadingButtonHandler = async () => {
    setIsLoading(true);
    const newPosts = await getPosts(posts.length);
    setPosts((state) => [...state, ...newPosts.data]);
    setIsLoading(false);
  }

  const loadingButtonIsShown = posts.length < postsTotal;

  useEffect(() => {
    setPosts(defaultPosts);
  }, [defaultPosts]);

  return (
    <>
      <div className={styles.posts}>
        {posts.map((post) => (
          <div key={post.id}>
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
                <Typography className={styles.post__date} variant="subtitle1" color={Colors.gray8}>{post.attributes.publishedAt}</Typography>
              </div>
            </div>
          </div>
        ))}
      </div>
      {
        loadingButtonIsShown && (
          <div className={styles.button_wrapper}>
            <LoadingButton
              variant="outlined"
              loading={isLoading}
              loadingPosition="end"
              onClick={loadingButtonHandler}
            >Загрузить ещё</LoadingButton>
          </div>
        )
      }
    </>
  )
};

export default PostList;