import {useRouter} from 'next/router';

const Post = () => {
  const {query} = useRouter();

  return <div>
    Пост {query.id}
  </div>
};

export default Post;