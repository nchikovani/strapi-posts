import MainContainer from "../../components/MainContainer";
import {GetServerSideProps} from "next";
import {Typography} from "@mui/material";
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
      {<ReactMarkdown children={post.attributes.content} remarkPlugins={[remarkGfm]} />}
    </div>
  </MainContainer>
};

export default Post;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  // @ts-ignore
  const res = await fetch(`http://${process.env.API_IP}:3050/strapi/api/posts/${params.id}?populate[0]=image`);
  const post = await res.json();
  return {
    props: {post: post.data}
  }
}