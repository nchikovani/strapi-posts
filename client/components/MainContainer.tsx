import React, {PropsWithChildren} from 'react';
import Head from "next/head";
import styles from "../styles/Home.module.scss";

interface MainContainer {
  title: string;
  description: string;
}

const MainContainer: React.FunctionComponent<PropsWithChildren<MainContainer>> = ({children, description, title}) => {

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </div>
  )
}

export default MainContainer;