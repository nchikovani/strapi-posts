import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import styles from '../styles/Home.module.scss'
import MainContainer from "../components/MainContainer/index";
import {useRouter} from "next/router";
import {GetStaticProps} from "next";
import PostList from "../components/PostList";
import {LoadingButton} from "@mui/lab";

const Home = ({posts}: {posts: {id: string, attributes: any}[]}) => {
  return (
    <MainContainer title="Strapi-posts" description="Strapi-posts description">
      <>
        <PostList/>
      </>
      {/*<div className={styles.posts}>*/}
      {/*  {posts.map((post) => (*/}
      {/*    <Card key={post.id} sx={{ width: 392, height: 272 }} style={{marginBottom: "20px"}} onClick={() => handlePostClick(post.id)}>*/}
      {/*      <CardActionArea>*/}
      {/*        <CardMedia*/}
      {/*          component="img"*/}
      {/*          height="140"*/}
      {/*          image={`/strapi${post.attributes.image.data.attributes.url}`}*/}
      {/*          alt={post.attributes.title}*/}
      {/*        />*/}
      {/*        <CardContent>*/}
      {/*          <Typography gutterBottom variant="h5" component="div">*/}
      {/*            {post.attributes.title}*/}
      {/*          </Typography>*/}
      {/*          <Typography variant="body2" color="text.secondary" className={styles.content_text}>*/}
      {/*            {post.attributes.content}*/}
      {/*          </Typography>*/}
      {/*        </CardContent>*/}
      {/*      </CardActionArea>*/}
      {/*    </Card>*/}
      {/*  ))}*/}
      {/*</div>*/}
    </MainContainer>
  )
}

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const res = await fetch(`http://strapi:${process.env.STRAPI_PORT}/api/posts?populate[0]=image`);
    const posts = await res.json();

    return {
      props: {posts: posts.data},
      revalidate: 60,
    }
  } catch (e) {
    return {
      props: {posts: []},
      revalidate: 60,
    }
  }
}
