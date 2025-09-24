document.addEventListener("DOMContentLoaded", () => {
	const themeToggles = [
		document.getElementById("theme-toggle"),
		document.getElementById("theme-toggle-mobile"),
	];
	const themeIcons = {
		light: [
			document.getElementById("theme-icon-light"),
			document.getElementById("theme-icon-light-mobile"),
		],
		dark: [
			document.getElementById("theme-icon-dark"),
			document.getElementById("theme-icon-dark-mobile"),
		],
		system: [
			document.getElementById("theme-icon-system"),
			document.getElementById("theme-icon-system-mobile"),
		],
	};
	const mobileMenuButton = document.getElementById("mobile-menu-button");
	const mobileMenu = document.getElementById("mobile-menu");

	let currentTheme = localStorage.getItem("theme") || "system";

	const applyTheme = (theme) => {
		if (
			theme === "dark" ||
			(theme === "system" &&
				window.matchMedia("(prefers-color-scheme: dark)").matches)
		) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
		updateIcons(theme);
	};

	const updateIcons = (theme) => {
		for (const key in themeIcons) {
			themeIcons[key].forEach((icon) => icon.classList.add("hidden"));
		}
		themeIcons[theme].forEach((icon) => icon.classList.remove("hidden"));
	};

	const cycleTheme = () => {
		const themes = ["light", "dark", "system"];
		const currentIndex = themes.indexOf(currentTheme);
		const nextIndex = (currentIndex + 1) % themes.length;
		currentTheme = themes[nextIndex];
		localStorage.setItem("theme", currentTheme);
		applyTheme(currentTheme);
	};

	themeToggles.forEach((toggle) => {
		if (toggle) {
			toggle.addEventListener("click", cycleTheme);
		}
	});

	// System theme change listener
	window
		.matchMedia("(prefers-color-scheme: dark)")
		.addEventListener("change", (e) => {
			if (currentTheme === "system") {
				applyTheme("system");
			}
		});

	// Mobile menu toggle
	if (mobileMenuButton && mobileMenu) {
		mobileMenuButton.addEventListener("click", () => {
			mobileMenu.classList.toggle("hidden");
		});
	}

	// Initial setup
	applyTheme(currentTheme);
});
