import endpoint from "./endpoint";

const getPosts = async (start: number, categoryFilterId?: number) => {
  const filter = categoryFilterId ? `&filters[category][id][$eq]=${categoryFilterId}` : '';
  const postRes = await fetch(`${endpoint}/api/posts?populate[category]=category&populate[image]=image${filter}&pagination[start]=${start}&pagination[limit]=2`);
  return await postRes.json();
};

export default getPosts;