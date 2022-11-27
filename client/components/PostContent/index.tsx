import React from 'react';
import {Typography} from "@mui/material";
import styles from "./style.module.scss";
import Colors from "../../styles/colors.module.scss";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const text = "Lorem ipsum dolor sit amet consectetur. Consequat volutpat vitae auctor arcu lectus vestibulum convallis facilisis. Condimentum lobortis eleifend cras eleifend scelerisque nisl eu dolor ornare. Felis odio ut vulputate porttitor purus urna a. Eget vitae nunc scelerisque scelerisque tristique id id. Sit quam erat vel cursus duis. Amet elementum et euismod risus vitae placerat feugiat cras condimentum. Pellentesque pellentesque leo pellentesque lectus semper nibh potenti sapien vel. Enim quis at tellus vitae ut tempus. Urna elementum dolor in praesent amet in parturient. Quam rhoncus sed tortor gravida nulla vitae diam egestas ultrices. At tincidunt ridiculus ullamcorper facilisi ornare nibh integer. At integer et nisi sed mattis eleifend tempus nisl. Ultrices pellentesque tristique ridiculus pharetra massa pellentesque blandit. Sed amet nam egestas adipiscing et ridiculus. Condimentum imperdiet erat magna ut maecenas. Duis at eu sit phasellus id varius. Euismod in facilisi viverra mattis sit quam venenatis sit sed. Massa sit sed ipsum tincidunt proin. Viverra vel massa vitae fermentum. Quisque diam volutpat nunc amet euismod sed aliquet sit. Commodo vitae sed sit ipsum nullam porttitor leo. Aenean id ultricies vestibulum interdum suscipit. Quis amet montes elit volutpat pharetra pharetra lorem. Tristique sociis arcu lorem arcu purus. Nisi nunc in commodo diam amet ultrices nec ultrices. Varius scelerisque tristique hac phasellus quis."
const PostContent = () => {

  return (
    <>
      <Typography variant="h2" className={styles.title}>Название первого поста</Typography>
      <Typography variant="subtitle1" className={styles.date} color={Colors.gray8}>17 декабря 2022</Typography>
      <div className={styles.img}/>
      {
        <div className={styles.markdown}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {text}
          </ReactMarkdown>
        </div>
      }
    </>
  );
};

export default PostContent;