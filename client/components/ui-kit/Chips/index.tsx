import React, {PropsWithChildren} from 'react';
import styles from './style.module.scss';
import {Typography} from '@mui/material';

const Chips: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <div className={styles.chips}>
      <Typography variant="caption">{children}</Typography>
    </div>
  )
};

export default Chips