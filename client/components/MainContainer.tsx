import React from 'react';
import Head from "next/head";

const MainContainer: React.FunctionComponent<{}> = () => {

  return (
    <div>
      <Head>
        <title>Strapi-posts</title>
        <meta name="description" content="Strapi-posts description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </div>
  )
}

export default MainContainer;