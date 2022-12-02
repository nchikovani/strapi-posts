import React, {useEffect} from 'react';
import {Typography} from '@mui/material'
import styles from './style.module.scss';
import Chips from "../ui-kit/Chips";
import Link from "next/link";
import {Category} from "../../types/strapiTypes";

const Categories = ({categories}: {categories: Category[]}) => {

  return (
    <div className={styles.categories}>
      <Typography variant="h4" component="p" className={styles.title}>Категории</Typography>
      <ul>
        {
          categories.map((category) => (
            <li key={category.id} className={styles.category}>
              <Link
                href={`/category/${category.attributes.segment_name}`}
                className={styles.category_link}
              >
                <Typography variant="body1">{category.attributes.name}</Typography>
                <Chips>{category.attributes.count}</Chips>
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
};

export default Categories;