import React from 'react';
import {Typography} from '@mui/material'
import styles from './style.module.scss';
import Chips from "../ui-kit/Chips";
import Link from "next/link";

const Categories = () => {

  const categories = [{name: 'Путешествия', count: 7}, {name: 'Искусство', count: 18}, {name: 'Наука', count: 11}, {name: 'Мемы', count: 3},]

  return (
    <div className={styles.categories}>
      <Typography variant="h4" component="p" className={styles.title}>Категории</Typography>
      <ul>
        {
          categories.map((category) => (
            <li key={category.name} className={styles.category}>
              <Link
                href="/"
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

export default Categories