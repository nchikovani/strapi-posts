import React from 'react';
import {Typography} from '@mui/material'
import styles from './style.module.scss';
import Chips from "../ui-kit/Chips";
import Link from "next/link";
import {useRouter} from "next/router";
import {GetStaticPaths, GetStaticProps} from "next";

const Categories = () => {
  const categories = [{name: 'Путешествия', count: 7, url: 'category_1'}, {name: 'Искусство', count: 18, url: 'category_1'}, {name: 'Наука', count: 11, url: 'category_1'}, {name: 'Мемы', count: 3, url: 'category_1'},];
  const router = useRouter();

  return (
    <div className={styles.categories}>
      <Typography variant="h4" component="p" className={styles.title}>Категории</Typography>
      <ul>
        {
          categories.map((category) => (
            <li key={category.name} className={styles.category}>
              <Link
                href={`/category/${category.url}`}
                className={styles.category_link}
              >
                <Typography variant="body1">{category.name}</Typography>
                <Chips>{category.count}</Chips>
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
};

export default Categories;