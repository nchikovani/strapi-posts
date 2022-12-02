import React, {useEffect, useState} from 'react';
import styles from "./style.module.scss";
import {LoadingButton} from "@mui/lab";
import {useRouter} from "next/router";
import {Post} from "../../types/strapiTypes";
import getPosts from "../../libs/getPosts";
import PostCard from "./Post";
import Typography from "@mui/material/Typography";
import Colors from "../../styles/colors.module.scss";

interface PostListProps {
  defaultPosts: Post[];
  postsTotal: number;
}

const PostList: React.FC<PostListProps> = ({defaultPosts, postsTotal}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>(defaultPosts);
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

  if (posts.length === 0) {
    return (
      <Typography className={styles.empty_list} variant="subtitle2" component="p" color={Colors.gray6}>
        Постов в этой категории пока нет
      </Typography>
    );
  }

  return (
    <>
      <div className={styles.posts}>
        {posts.map((post) => (
          <PostCard post={post} handlePostClick={handlePostClick} key={post.id}/>
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