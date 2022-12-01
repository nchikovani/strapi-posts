import React, {useEffect, useState} from 'react';
import PostList from "../../components/PostList";
import styles from "../../styles/category.module.scss";
import {LoadingButton} from "@mui/lab";
import MainContainer from "../../components/MainContainer";
import {GetStaticPaths, GetStaticProps} from "next";
import {Typography} from "@mui/material";
import {category, post, strapiType} from "../../types/strapiTypes";
import withCategories from "../../libs/withCategories";
import {ParsedUrlQuery} from "querystring";
import getPosts from "../../libs/getPosts";
import endpoint from "../../libs/endpoint";

interface CategoryProps {
  defaultPosts: post[];
  postsTotal: number;
  categories: category[];
  categoryName: string;
}

interface Params extends ParsedUrlQuery {
  categoryUrl: string;
}

const Category: React.FC<CategoryProps> = ({defaultPosts, categories, categoryName, postsTotal}) => {
  const [posts, setPosts] = useState<post[]>(defaultPosts);

  useEffect(() => {
    setPosts(defaultPosts);
  }, [defaultPosts])

  const loadMorePosts = async () => {
    const newPosts = await getPosts(posts.length);
    setPosts((state) => [...state, ...newPosts.data]);
  };

  return (
    <MainContainer title={`Strapi-posts ${categoryName}`} description="Strapi-posts description" categories={categories}>
      <Typography variant="h2" className={styles.title}>{categoryName}</Typography>
      <PostList posts={posts} postsTotal={postsTotal} loadMorePosts={loadMorePosts}/>
    </MainContainer>
  );
};

export default Category;

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const categoriesRes = await fetch(`${endpoint}/api/categories`);
    const categories = await categoriesRes.json();
    const paths = categories.data.map((item: any) => ({params: {categoryUrl: item.attributes.segment_name}}))
    return {
      paths,
      fallback: 'blocking',
    }
  } catch (e) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }
}

export const getStaticProps: GetStaticProps<CategoryProps> = withCategories(async ({params}) => {
  try {
    const { categoryUrl } = params as Params;
    const categoryRes = await fetch(`${endpoint}/api/categories?filters[segment_name][$eq]=${categoryUrl}`);
    const category = await categoryRes.json();
    const targetCategory = category.data[0];

    if (!targetCategory) {
      return {
        notFound: true,
      }
    }
    const posts = await getPosts(0, targetCategory.id);
    return {
      props: {defaultPosts: posts.data, postsTotal: posts.meta.pagination.total, categoryName: targetCategory.attributes.name},
      revalidate: 120
    }
  } catch (e) {
    return {
      props: {defaultPosts: [], postsTotal: 0, categoryName: ''},
      revalidate: 120
    }
  }
});