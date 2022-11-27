import { ThemeOptions } from '@mui/material';

const getInPx = (number: number) => `${number}px`;

const typography: ThemeOptions['typography'] = {
  fontFamily: 'Montserrat',
  allVariants: {
    fontStyle: 'normal',
    fontWeight: 400,
    textTransform: 'none',
  },
  h1: {
    fontFamily: 'Sriracha',
    fontSize: getInPx(54),
  },
  h2: {
    fontSize: getInPx(24),
    lineHeight: getInPx(29),
    textTransform: "uppercase",
    letterSpacing: '0.1em',
    fontWeight: 600,
  },
  h3: {
    fontSize: getInPx(20),
    lineHeight: getInPx(24),
    textTransform: "uppercase",
    letterSpacing: '0.1em',
    fontWeight: 600,
  },
  h4: {
    fontSize: getInPx(24),
    lineHeight: getInPx(29),
  },
  body1: {
    fontSize: getInPx(16),
    lineHeight: getInPx(24),
  },
  caption: {
    fontSize: getInPx(13),
    lineHeight: getInPx(16),
  },
  button: {
    fontSize: getInPx(16),
    lineHeight: getInPx(20),
    textTransform: "uppercase",
    letterSpacing: '0.05em',
  },
  subtitle1: {
    fontSize: getInPx(16),
    lineHeight: getInPx(20),
  },
  subtitle2: {
    fontWeight: 500,
    fontSize: getInPx(18),
    lineHeight: getInPx(22),
  },
};

export default typography;
