import { createTheme, makeStyles } from '@mui/material';
import typography from './typography';
import Colors from './colors.module.scss';

const theme = createTheme({
  typography,
  components: {
    MuiButton: {
      defaultProps: {
        variant: "outlined"
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
          borderColor: Colors.gray13,
          color: Colors.gray8,
          letterSpacing: "0.05em",
          height: "38px",
          padding: "0 50px",
          "&:hover": {
            borderColor: Colors.gray11,
            background: Colors.gray16
          }
        }
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: "0 !important",
          padding: "0 !important",
          "& .MuiOutlinedInput-notchedOutline": {
            border: `1px solid ${Colors.gray13} !important`,
          },
          ".MuiInputBase-input": {
            padding: "12px 20px",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: `${Colors.gray11} !important`,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: `1px solid ${Colors.gray9} !important`,
          },
        },
        input: {
          fontSize: "15px",
          height: "19px",
          lineHeight: "19px",
          "&::placeholder": {
            color: Colors.gray8,
            opacity: 1,
            fontSize: '15px'
          }
        }
      }
    },
  }
});

export default theme;