let darkMode = $state(false);

export function createThemeStore() {
	return {
		get darkMode() {
			return darkMode;
		},
		toggle() {
			darkMode = !darkMode;
		},
		setDarkMode(value: boolean) {
			darkMode = value;
		}
	};
}

export const themeStore = createThemeStore();
