import React, {useState} from 'react';
import styles from "./style.module.scss";
import Typography from "@mui/material/Typography";
import Colors from '../../styles/colors.module.scss';
import {LoadingButton} from "@mui/lab";
import {useRouter} from "next/router";


const description = "Lorem ipsum dolor sit amet consectetur. At tempor amet urna netus enim sed at augue. Lectus dui eget ornare massa lobortis semper vestibulum lacus. Libero ac turpis lectus quam."
const date = "17 декабря 2022"
const PostList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const myPosts = [
    {title: "Название первого поста", description: description, date, category: "Категория 1"},
    {title: "Название поста 2", description: description, date, category: "Категория 1"},
    {title: "Название поста 12", description: description, date, category: "Категория 2"},
    {title: "Длинное Название поста", description: description, date, category: "Категория 1"},
  ];
  const router = useRouter();

  const handlePostClick = (id: string) => {
    router.push(`/post/${id}`)
  }

  return (
    <>
      <div className={styles.posts}>
        {myPosts.map((post) => (
          <div key={post.title}>
            <hr/>
            <div className={styles.post} onClick={() => handlePostClick('4')}>
              <div className={styles.post__img}/>
              <div className={styles.post__content}>
                <Typography className={styles.post__category} variant="caption">{post.category}</Typography>
                <Typography className={styles.post__title} variant="h3">{post.title}</Typography>
                <Typography className={styles.post__description} variant="body1">{post.description}</Typography>
                <Typography className={styles.post__date} variant="subtitle1" color={Colors.gray8}>{post.date}</Typography>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.button_wrapper}>
        <LoadingButton
          variant="outlined"
          loading={isLoading}
          loadingPosition="end"
          onClick={() => {
            setIsLoading(true);
            setTimeout(() => {
              setIsLoading(false)
            }, 1000)
          }}
        >Загрузить ещё</LoadingButton>
      </div>
    </>

  )
};

export default PostList;