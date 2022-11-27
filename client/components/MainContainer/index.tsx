import React, {PropsWithChildren} from 'react';
import Head from "next/head";
import styles from "./style.module.scss";
import {Typography} from '@mui/material'
import Categories from "../Categories";

interface Index {
  title: string;
  description: string;
}

const MainContainer: React.FunctionComponent<PropsWithChildren<Index>> = ({children, description, title}) => {

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <Typography variant="h1">StrapiPosts</Typography>
      </header>
      <div className={styles.container}>
        <div className={styles.main_wrapper}>{children}</div>
        <nav className={styles.nav_wrapper}>
          <Categories/>
        </nav>
      </div>
      <footer className={styles.footer}>
        <Typography variant="h1" className={styles.footer__text}>StrapiPosts</Typography>
      </footer>
    </>
  )
}

export default MainContainer;