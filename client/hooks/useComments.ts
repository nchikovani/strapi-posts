import {useCallback, useEffect, useState} from "react";
import getComments from "../libs/getComments";
import {comment} from "../types/strapiTypes";
import postComment from "../libs/postComment";

export type AddComment = ({name, content}: {name: string; content: string;}) => void

const useComments = (postId: number): [comment[], boolean,  AddComment] => {
  const [comments, setComments] = useState<comment[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    getComments(postId).then(res => {
      setComments(res);
      setIsFetching(false);
    })
  }, []);

  const addComment = useCallback(async ({name, content}: {name: string; content: string;}) => {
    const res = await postComment({name, content, postId});
    setComments((state) => [...state, res]);
  }, []);

  return [comments, isFetching, addComment];
};

export default useComments;