import { createTheme } from '@material-ui/core/styles';

// custom dark theme
const darkTheme = createTheme({
	palette: {
		primary: {
			light: '#4f5b62',
			main: '#263238',
			dark: '#000a12',
			contrastText: '#ffffff'
		},
		secondary: {
			light: '#6d6d6d',
			main: '#424242',
			dark: '#1b1b1b',
			contrastText: '#ffffff'
		},
		background: {
			default: '#616161'
		},
		type: 'dark'
	},
	typography: {
		fontFamily: 'Quicksand',
		fontWeightLight: 400,
		fontWeightRegular: 500,
		fontWeightMedium: 600,
		fontWeightBold: 700
	}
});

export default darkTheme;
