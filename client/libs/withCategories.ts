import {GetStaticProps, GetStaticPropsContext, GetStaticPropsResult} from "next";
import {ENDPOINT} from "../constants";

const withCategories = (callback: GetStaticProps) => {

  return async (context: GetStaticPropsContext) => {
    const callbackRes = await callback(context);
    // @ts-ignore
    const callbackProps = callbackRes.props || {};
    try {
      const categoriesRes = await fetch(`${ENDPOINT}/api/categories`);
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