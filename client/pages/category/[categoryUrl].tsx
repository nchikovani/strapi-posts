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
import {ENDPOINT} from "../../constants";

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
    <MainContainer title={`Strapi-posts ${categoryName}`} description="Strapi-posts description" categories={categories}>
      <Typography variant="h2" className={styles.title}>{categoryName}</Typography>
      <PostList defaultPosts={defaultPosts} postsTotal={postsTotal}/>
    </MainContainer>
  );
};

export default Category;

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const categoriesRes = await fetch(`${ENDPOINT}/api/categories`);
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
    const categoryRes = await fetch(`${ENDPOINT}/api/categories?filters[segment_name][$eq]=${categoryUrl}`);
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