import React from 'react';
import PostList from "../../components/PostList";
import styles from "../../styles/category.module.scss";
import MainContainer from "../../components/MainContainer";
import {GetStaticPaths, GetStaticProps} from "next";
import {Typography} from "@mui/material";
import {Category, Post} from "../../types/strapiTypes";
import withCategories from "../../libs/withCategories";
import {ParsedUrlQuery} from "querystring";
import getPosts from "../../libs/getPosts";
import getCategories from "../../libs/getCategories";

interface CategoryProps {
  defaultPosts: Post[];
  postsTotal: number;
  categories: Category[];
  categoryName: string;
}

interface Params extends ParsedUrlQuery {
  categoryUrl: string;
}

const Category: React.FC<CategoryProps> = ({defaultPosts, categories, categoryName, postsTotal}) => {

  return (
    <MainContainer title={`Strapi-posts ${categoryName}`} description={`Strapi-posts ${categoryName}`} categories={categories}>
      <Typography variant="h2" className={styles.title}>{categoryName}</Typography>
      <PostList defaultPosts={defaultPosts} postsTotal={postsTotal}/>
    </MainContainer>
  );
};

export default Category;

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const categories = await getCategories();
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
    const targetCategory = await getCategories(categoryUrl)

    if (!targetCategory) {
      return {
        notFound: true,
      }
    }
    const posts = await getPosts(0, targetCategory.id);
    return {
      props: {defaultPosts: posts.data, postsTotal: posts.meta.pagination.total, categoryName: targetCategory.attributes.name},
      revalidate: 15
    }
  } catch (e) {
    console.log(e);
    return {
      props: {defaultPosts: [], postsTotal: 0, categoryName: ''},
      revalidate: 15
    }
  }
});