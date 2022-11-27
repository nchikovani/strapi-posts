import React from 'react';
import MainContainer from "../../components/MainContainer/index";
import {GetStaticPaths, GetStaticProps} from "next";
import styles from '../../styles/post.module.scss'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {useRouter} from "next/router";
import {Typography} from "@mui/material";
import Colors from "../../styles/colors.module.scss";
import PostContent from "../../components/PostContent";

const Post = ({post}: {post: {id: string, attributes: any}}) => {

  return <MainContainer title={post.attributes.title} description={post.attributes.title}>
    <div className={styles.post}>
      <PostContent/>
    </div>
    <hr className={styles.hr}/>
    <div className={styles.comments}>

    </div>
  </MainContainer>
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await fetch(`http://strapi:${process.env.STRAPI_PORT}/api/posts`);
    const post = await res.json();
    const paths = post.data.map((item: any) => ({params: {id: String(item.id)}}))

    return {
      paths: [{params: {id: '4'}}],
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
    const res = await fetch(`http://strapi:${process.env.STRAPI_PORT}/api/posts/${params.id}?populate[0]=image`);
    const post = await res.json();

    return {
      props: {post: post.data},
      revalidate: 120
    }
  } catch (e) {
    return {
      props: {post: {}},
      revalidate: 120
    }
  }
}