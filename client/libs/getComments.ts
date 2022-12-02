import {ENDPOINT} from "../constants";

const getComments = async (postId: number) => {
  const commentsRes = await fetch(`${ENDPOINT}/api/comments?filters[post][id][$eq]=${postId}`);
  const comments =  await commentsRes.json();
  return comments.data;
};

export default getComments;