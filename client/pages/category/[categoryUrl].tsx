import React, {useState} from 'react';
import PostList from "../../components/PostList";
import styles from "../../styles/category.module.scss";
import {LoadingButton} from "@mui/lab";
import MainContainer from "../../components/MainContainer";
import {GetStaticPaths, GetStaticProps} from "next";
import {Typography} from "@mui/material";
import {category, post} from "../../types/strapiTypes";
import withCategories from "../../libs/withCategories";
import {ParsedUrlQuery} from "querystring";

interface CategoryProps {
  posts: post[];
  categories: category[];
  categoryName: string;
}

interface Params extends ParsedUrlQuery {
  categoryUrl: string;
}

const Category: React.FC<CategoryProps> = ({posts, categories, categoryName}) => {
  return (
    <MainContainer title={`Strapi-posts ${categoryName}`} description="Strapi-posts description" categories={categories}>
      <Typography variant="h2" className={styles.title}>{categoryName}</Typography>
      <PostList posts={posts}/>
    </MainContainer>
  );
};

export default Category;

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const categoriesRes = await fetch(`http://strapi:${process.env.STRAPI_PORT}/api/categories`);
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
    const categoryRes = await fetch(`http://strapi:${process.env.STRAPI_PORT}/api/categories?filters[segment_name][$eq]=${categoryUrl}`);
    const category = await categoryRes.json();
    const targetCategory = category.data[0];

    if (!targetCategory) {
      return {
        notFound: true,
      }
    }
    const postRes = await fetch(`http://strapi:${process.env.STRAPI_PORT}/api/posts?populate[category]=category&populate[image]=image&filters[category][id][$eq]=${targetCategory.id}`);
    const posts = await postRes.json();
    return {
      props: {posts: posts.data, categoryName: targetCategory.attributes.name},
      revalidate: 120
    }
  } catch (e) {
    return {
      props: {posts: [], categoryName: ''},
      revalidate: 120
    }
  }
});