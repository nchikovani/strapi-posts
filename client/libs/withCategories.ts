import {GetStaticProps, GetStaticPropsContext} from "next";
import {ENDPOINT} from "../constants";

const withCategories = (callback: GetStaticProps) => {

  return async (context: GetStaticPropsContext) => {
    const callbackRes = await callback(context);
    // @ts-ignore
    const callbackProps = callbackRes.props || {};
    try {
      const categoriesRes = await fetch(`${ENDPOINT}/api/categories`);
      const categories = await categoriesRes.json();

      for await (const category of categories.data) {
        const postsRes = await fetch(`${ENDPOINT}/api/posts?fields[0]=title&filters[category][id][$eq]=${category.id}`);
        const post = await postsRes.json();
        category.attributes.count = post.meta.pagination.total;
      }

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