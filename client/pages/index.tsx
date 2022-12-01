import React, {useState} from 'react';
import MainContainer from "../components/MainContainer/index";
import {GetStaticProps} from "next";
import PostList from "../components/PostList";
import {category, post, strapiType} from "../types/strapiTypes";
import withCategories from "../libs/withCategories";
import getPosts from "../libs/getPosts";

interface HomeProps {
  defaultPosts: post[];
  postsTotal: number;
  categories: category[];
}

const Home: React.FC<HomeProps> = ({defaultPosts, categories, postsTotal}) => {
  const [posts, setPosts] = useState<post[]>(defaultPosts);

  const loadMorePosts = async () => {
    const newPosts = await getPosts(posts.length);
    setPosts((state) => [...state, ...newPosts.data]);
  };


  return (
    <MainContainer title="Strapi-posts" description="Strapi-posts description" categories={categories}>
      <PostList posts={posts} postsTotal={postsTotal} loadMorePosts={loadMorePosts}/>
    </MainContainer>
  )
}

export default Home;

export const getStaticProps: GetStaticProps = withCategories(async (context) => {
  try {
    const posts = await getPosts(0)

    return {
      props: {defaultPosts: posts.data, postsTotal: posts.meta.pagination.total},
      revalidate: 60,
    }
  } catch (e) {
    return {
      props: {defaultPosts: [], postsTotal: 0},
      revalidate: 60,
    }
  }
})
