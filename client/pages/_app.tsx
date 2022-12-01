import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import theme from '../styles/muiTheme';
import {ThemeProvider} from "@mui/material";
import moment from "moment";
import 'moment/locale/ru'
moment.locale('ru');

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
};
