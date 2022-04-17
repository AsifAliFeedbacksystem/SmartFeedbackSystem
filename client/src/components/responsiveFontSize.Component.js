
//material ui imoorts
import {
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
} from '@mui/material/styles';

const ResponsiveFontSize = (props) => {
    let theme = createTheme();
    theme = responsiveFontSizes(theme);
    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    );
};

export default ResponsiveFontSize;