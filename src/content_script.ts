console.log('Youtube windowed fullscreen browser extension loaded');

const FULLSCREEN_BROWSER_MODE_CLASS = 'fullscreen_browser_mode';
const MEDIA_PLAYER_ELEMENT = document.querySelector(
	'#movie_player'
) as HTMLElement;
const MEDIA_PLAYER_CONTROL_BAR = document.querySelector(
	'.ytp-chrome-bottom'
) as HTMLElement;

function toggle_fullscreen_browser_mode(): void {
	const body_element = document.body;

	if (body_element.classList.contains(FULLSCREEN_BROWSER_MODE_CLASS)) {
		remove_class_from_element(body_element, FULLSCREEN_BROWSER_MODE_CLASS);
		if (MEDIA_PLAYER_ELEMENT)
			set_element_style(MEDIA_PLAYER_ELEMENT, { height: '' });
		if (MEDIA_PLAYER_CONTROL_BAR)
			set_element_style(MEDIA_PLAYER_CONTROL_BAR, { width: '' });
	} else {
		add_class_to_element(body_element, FULLSCREEN_BROWSER_MODE_CLASS);
		window.scrollTo(0, 0);

		if (MEDIA_PLAYER_CONTROL_BAR) {
			set_element_style(MEDIA_PLAYER_CONTROL_BAR, {
				width: `${window.innerWidth}px`,
			});
		}
	}
}

function add_class_to_element(element: HTMLElement, class_name: string): void {
	if (!element.classList.contains(class_name)) {
		element.classList.add(class_name);
	}
}

function remove_class_from_element(
	element: HTMLElement,
	class_name: string
): void {
	if (element.classList.contains(class_name)) {
		element.classList.remove(class_name);
	}
}

function set_element_style(
	element: HTMLElement,
	styles: Record<string, string>
): void {
	for (const [key, value] of Object.entries(styles)) {
		element.style[key as any] = value;
	}
}

// Key event listener for toggling fullscreen browser mode
document.addEventListener('keydown', (event: KeyboardEvent) => {
	if (event.key === '`') {
		toggle_fullscreen_browser_mode();
	}
});
