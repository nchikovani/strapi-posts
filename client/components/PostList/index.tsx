import React from 'react';
import styles from "./style.module.scss";
import Typography from "@mui/material/Typography";
import Colors from '../../styles/colors.module.scss';


const description = "Lorem ipsum dolor sit amet consectetur. At tempor amet urna netus enim sed at augue. Lectus dui eget ornare massa lobortis semper vestibulum lacus. Libero ac turpis lectus quam."
const date = "17 декабря 2022"
const PostList = () => {
  const myPosts = [
    {title: "Название первого поста", description: description, date, category: "Категория 1"},
    {title: "Название поста 2", description: description, date, category: "Категория 1"},
    {title: "Название поста 12", description: description, date, category: "Категория 2"},
    {title: "Длинное Название поста", description: description, date, category: "Категория 1"},
  ];

  return (
    <div className={styles.posts}>
      {myPosts.map((post) => (
        <>
          <hr/>
          <div className={styles.post}>
            <div className={styles.post__img}/>
            <div className={styles.post__content}>
              <Typography className={styles.post__category} variant="caption">{post.category}</Typography>
              <Typography className={styles.post__title} variant="h3">{post.title}</Typography>
              <Typography className={styles.post__description} variant="body1">{post.description}</Typography>
              <Typography className={styles.post__date} variant="subtitle1" color={Colors.gray8}>{post.date}</Typography>
            </div>
          </div>
        </>
      ))}
    </div>
  )
};

export default PostList;