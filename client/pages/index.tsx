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
import {category, post} from "../types/strapiTypes";

const Home: React.FC<{posts: post[], categories: category[]}> = ({posts, categories}) => {
  console.log(categories);
  return (
    <MainContainer title="Strapi-posts" description="Strapi-posts description" categories={categories}>
      <>
        <PostList posts={posts}/>
      </>
    </MainContainer>
  )
}

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const postRes = await fetch(`http://strapi:${process.env.STRAPI_PORT}/api/posts?populate[category]=category&populate[image]=image`);
    const posts = await postRes.json();
    const categoriesRes = await fetch(`http://strapi:${process.env.STRAPI_PORT}/api/categories`);
    const categories = await categoriesRes.json();

    return {
      props: {posts: posts.data, categories: categories.data},
      revalidate: 60,
    }
  } catch (e) {
    return {
      props: {posts: [], categories: []},
      revalidate: 60,
    }
  }
}
