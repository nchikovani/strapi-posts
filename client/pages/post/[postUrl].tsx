import React from 'react';
import MainContainer from "../../components/MainContainer/index";
import {GetStaticPaths, GetStaticProps} from "next";
import styles from '../../styles/post.module.scss'
import PostContent from "../../components/PostContent";
import CommentList from "../../components/CommentList";
import CommentForm from "../../components/CommentForm";
import {category, post} from "../../types/strapiTypes";
import withCategories from "../../libs/withCategories";
import {ParsedUrlQuery} from "querystring";

interface Params extends ParsedUrlQuery {
  postUrl: string;
}

interface PostProps {
  post: post;
  categories: category[];
}

const Post: React.FC<PostProps> = ({post, categories}) => {

  return <MainContainer title={post.attributes.title} description={post.attributes.title} categories={categories}>
    <div className={styles.post_wrapper}>
      <PostContent post={post}/>
    </div>
    <hr className={styles.hr}/>
    <div className={styles.comments_wrapper}>
      <CommentList/>
    </div>
    <CommentForm/>
  </MainContainer>
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await fetch(`http://strapi:${process.env.STRAPI_PORT}/api/posts`);
    const post = await res.json();
    const paths = post.data.map((item: any) => ({params: {postUrl: item.attributes.segment_name}}))

    return {
      paths: paths,
      fallback: 'blocking',
    }
  } catch (e) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }
}

export const getStaticProps: GetStaticProps = withCategories(async ({params}) => {
  try {
    const { postUrl } = params as Params;
    const res = await fetch(`http://strapi:${process.env.STRAPI_PORT}/api/posts?populate[0]=image&filters[segment_name][$eq]=${postUrl}`);
    const post = await res.json();

    if (!post.data[0]) {
      return {
        notFound: true,
      }
    }

    return {
      props: {post: post.data[0]},
      revalidate: 120
    }
  } catch (e) {
    return {
      props: {post: {}},
      revalidate: 120
    }
  }
});