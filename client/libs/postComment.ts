import {ENDPOINT} from "../constants";

const postComment = async ({name, content, postId}: {name: string, content: string, postId: number}) => {
  const body = JSON.stringify({data: {name, content, post: postId}});
  const commentsRes = await fetch(`${ENDPOINT}/api/comments`, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const comments =  await commentsRes.json();
  return comments.data;
};

export default postComment;