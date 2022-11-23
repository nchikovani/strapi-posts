import React from 'react';
import MainContainer from "../../components/MainContainer";
import {GetStaticPaths, GetStaticProps} from "next";
import styles from '../../styles/post.module.scss'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const Post = ({post}: {post: {id: string, attributes: any}}) => {

  return <MainContainer title={post.attributes.title} description={post.attributes.title}>
    <div className={styles.container}>
      <img
        className={styles.img}
        src={`/strapi${post.attributes.image.data.attributes.url}`}
        alt={post.attributes.title}
      />
      <h1>
        {post.attributes.title}
      </h1>
      {<ReactMarkdown remarkPlugins={[remarkGfm]} >{post.attributes.content}</ReactMarkdown>}
    </div>
  </MainContainer>
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`http://${process.env.APP_HOST}:${process.env.APP_PORT}/strapi/api/posts`);
  const post = await res.json();
  const paths = post.data.map((item: any) => ({params: {id: String(item.id)}}))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  // @ts-ignore
  const res = await fetch(`http://${process.env.APP_HOST}:${process.env.APP_PORT}/strapi/api/posts/${params.id}?populate[0]=image`);
  const post = await res.json();

  return {
    props: {post: post.data},
    revalidate: 60
  }
}