import React, {PropsWithChildren} from 'react';
import Head from "next/head";
import styles from "./style.module.scss";
import {Typography} from '@mui/material'
import Categories from "../Categories";
import Link from "next/link";
import {Category} from "../../types/strapiTypes";

interface MainContainerProps {
  title: string;
  description: string;
  categories: Category[]
}

const MainContainer: React.FunctionComponent<PropsWithChildren<MainContainerProps>> = ({children, description, title, categories}) => {

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <Link
          href="/"
        >
          <Typography variant="h1">StrapiPosts</Typography>
        </Link>
      </header>
      <div className={styles.container}>
        <div className={styles.main_wrapper}>{children}</div>
        <nav className={styles.nav_wrapper}>
          <Categories categories={categories}/>
        </nav>
      </div>
      <footer className={styles.footer}>
        <Link
          href="/"
        >
          <Typography variant="h1" className={styles.footer__text}>StrapiPosts</Typography>
        </Link>
      </footer>
    </>
  )
}

export default MainContainer;