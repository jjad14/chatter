import darkTheme from "./dark";
import lightTheme from "./light";

const themes = {
	lightTheme,
	darkTheme
};

export default function getTheme(theme) {
	return themes[theme];
}
