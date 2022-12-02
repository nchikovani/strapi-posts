import {ENDPOINT, PAGINATION_LIMIT} from "../constants";

const getPost = async (postUrl?: string) => {
  const res = await fetch(`${ENDPOINT}/api/posts?populate[0]=image&filters[segment_name][$eq]=${postUrl}`);
  const post = await res.json();
  return post.data[0];
};

export default getPost;