import React, {useState} from 'react';
import MainContainer from "../components/MainContainer/index";
import {GetStaticProps} from "next";
import PostList from "../components/PostList";
import {Category, Post} from "../types/strapiTypes";
import withCategories from "../libs/withCategories";
import getPosts from "../libs/getPosts";

interface HomeProps {
  defaultPosts: Post[];
  postsTotal: number;
  categories: Category[];
}

const Home: React.FC<HomeProps> = ({defaultPosts, categories, postsTotal}) => {

  return (
    <MainContainer title="Strapi-posts" description="Strapi-posts description" categories={categories}>
      <PostList defaultPosts={defaultPosts} postsTotal={postsTotal}/>
    </MainContainer>
  )
}

export default Home;

export const getStaticProps: GetStaticProps = withCategories(async (context) => {
  try {
    const posts = await getPosts(0)

    return {
      props: {defaultPosts: posts.data, postsTotal: posts.meta.pagination.total},
      revalidate: 15,
    }
  } catch (e) {
    return {
      props: {defaultPosts: [], postsTotal: 0},
      revalidate: 15,
    }
  }
})
