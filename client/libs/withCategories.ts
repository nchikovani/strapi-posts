import {GetStaticProps, GetStaticPropsContext, GetStaticPropsResult} from "next";

const withCategories = (callback: GetStaticProps) => {

  return async (context: GetStaticPropsContext) => {
    const callbackRes = await callback(context);
    // @ts-ignore
    const callbackProps = callbackRes.props || {};
    try {
      const categoriesRes = await fetch(`http://strapi:${process.env.STRAPI_PORT}/api/categories`);
      const categories = await categoriesRes.json();

      return {
        ...callbackRes,
        props: {
          ...callbackProps,
          categories: categories.data,
        }
      }
    } catch (e) {
      return {
        ...callbackRes,
        props: {
          ...callbackProps,
          categories: [],
        }
      }
    }
  }
};

export default withCategories;