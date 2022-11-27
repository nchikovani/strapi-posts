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
          ":hover": {
            borderColor: Colors.gray11,
            background: Colors.gray16
          }
        }
      },
    }
  }
});

export default theme;