import { createTheme } from "@mui/material";
import { indigo, red } from "@mui/material/colors";

export const themeBradesco = createTheme({
    palette: {
      primary: {
        main: indigo[900],
      },
      secondary: {
        main: red[800],
      },
    },
  });