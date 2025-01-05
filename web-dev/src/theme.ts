import { createTheme } from "@mui/material"

export const theme = createTheme({
    palette: {
        primary: {
            main: '#7F56D9FF',
        },
        secondary: {
            main: '#ff6f00',
        },
    },
    spacing: 4,
    typography: {
        h2: {
            fontSize: 'var(--font-size-h2)',
            fontWeight: 600,
        }
    },
});