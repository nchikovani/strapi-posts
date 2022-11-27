import React, {useState} from 'react';
import PostList from "../../components/PostList";
import styles from "../../styles/category.module.scss";
import {LoadingButton} from "@mui/lab";
import MainContainer from "../../components/MainContainer";
import {GetStaticPaths, GetStaticProps} from "next";
import {Typography} from "@mui/material";

const Category = ({category}: {category: string}) => {
  return (
    <MainContainer title={`Strapi-posts ${category}`} description="Strapi-posts description">
      <>
        <Typography variant="h2" className={styles.title}>{category}</Typography>
        <PostList/>
      </>
    </MainContainer>
  );
};

export default Category;

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    return {
      paths: [{params: {name: 'category_1'}}],
      fallback: 'blocking',
    }
  } catch (e) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  try {
    return {
      props: {category: 'Category 1'},
      revalidate: 120
    }
  } catch (e) {
    return {
      props: {post: {}},
      revalidate: 120
    }
  }
}