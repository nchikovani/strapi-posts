import React from 'react';
import MainContainer from "../../components/MainContainer/index";
import {GetStaticPaths, GetStaticProps} from "next";
import styles from '../../styles/post.module.scss'
import PostContent from "../../components/PostContent";
import CommentList from "../../components/CommentList";
import CommentForm from "../../components/CommentForm";
import {Category, Post} from "../../types/strapiTypes";
import withCategories from "../../libs/withCategories";
import {ParsedUrlQuery} from "querystring";
import {ENDPOINT} from "../../constants";
import useComments from "../../hooks/useComments";
import getPost from "../../libs/getPost";

interface Params extends ParsedUrlQuery {
  postUrl: string;
}

interface PostProps {
  post: Post;
  categories: Category[];
}

const Post: React.FC<PostProps> = ({post, categories}) => {
  const [comments, isFetching, addComment] = useComments(post.id);

  return <MainContainer title={post.attributes.title} description={post.attributes.title} categories={categories}>
    <div className={styles.post_wrapper}>
      <PostContent post={post}/>
    </div>
    <hr className={styles.hr}/>
    <div className={styles.comments_wrapper}>
      <CommentList comments={comments} isFetching={isFetching}/>
    </div>
    <CommentForm addComment={addComment}/>
  </MainContainer>
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await fetch(`${ENDPOINT}/api/posts`);
    const post = await res.json();
    const paths = post.data.map((item: any) => ({params: {postUrl: item.attributes.segment_name}}))

    return {
      paths: paths,
      fallback: 'blocking',
    }
  } catch (e) {
    console.log(e);
    return {
      paths: [],
      fallback: 'blocking',
    }
  }
}

export const getStaticProps: GetStaticProps = withCategories(async ({params}) => {
  try {
    const { postUrl } = params as Params;
    const post = await getPost(postUrl);

    if (!post) {
      return {
        notFound: true,
      }
    }

    return {
      props: {post},
      revalidate: 60
    }
  } catch (e) {
    console.log(e);
    return {
      props: {post: {}},
      revalidate: 60
    }
  }
});