import {ENDPOINT, PAGINATION_LIMIT} from "../constants";

const getPosts = async (start: number, categoryFilterId?: number) => {
  const filter = categoryFilterId ? `&filters[category][id][$eq]=${categoryFilterId}` : '';
  const postRes = await fetch(`${ENDPOINT}/api/posts?populate[category]=category&populate[image]=image${filter}&pagination[start]=${start}&pagination[limit]=${PAGINATION_LIMIT}`);
  return await postRes.json();
};

export default getPosts;