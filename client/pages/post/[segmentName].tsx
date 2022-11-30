import React from 'react';
import MainContainer from "../../components/MainContainer/index";
import {GetStaticPaths, GetStaticProps} from "next";
import styles from '../../styles/post.module.scss'
import PostContent from "../../components/PostContent";
import CommentList from "../../components/CommentList";
import CommentForm from "../../components/CommentForm";
import {category, post} from "../../types/strapiTypes";

const Post: React.FC<{post: post, categories: category[]}> = ({post, categories}) => {

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
    const paths = post.data.map((item: any) => ({params: {segmentName: item.attributes.segment_name}}))

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

export const getStaticProps: GetStaticProps = async ({params}) => {
  try {
    // @ts-ignore
    const res = await fetch(`http://strapi:${process.env.STRAPI_PORT}/api/posts?populate[0]=image&filters[segment_name][$eq]=${params.segmentName}`);
    const post = await res.json();
    const categoriesRes = await fetch(`http://strapi:${process.env.STRAPI_PORT}/api/categories`);
    const categories = await categoriesRes.json();

    if (!post.data[0]) {
      return {
        notFound: true,
      }
    }

    return {
      props: {post: post.data[0], categories: categories.data},
      revalidate: 120
    }
  } catch (e) {
    return {
      props: {post: {}},
      revalidate: 120
    }
  }
}