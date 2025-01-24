import {
	add_class_to_element,
	remove_class_from_element,
	set_element_style,
} from './utils';

const FULL_BROWSER_CLASS = 'full_browser_mode';

function toggle_full_browser_mode(): void {
	const body = document.body;
	const video_player = document.querySelector('#movie_player') as HTMLElement;
	const chrome_bottom = document.querySelector(
		'.ytp-chrome-bottom'
	) as HTMLElement;

	if (body.classList.contains(FULL_BROWSER_CLASS)) {
		remove_class_from_element(body, FULL_BROWSER_CLASS);
		if (video_player) set_element_style(video_player, { height: '' });
		if (chrome_bottom) set_element_style(chrome_bottom, { width: '' });
	} else {
		add_class_to_element(body, FULL_BROWSER_CLASS);
		window.scrollTo(0, 0);

		if (chrome_bottom) {
			set_element_style(chrome_bottom, {
				width: `${window.innerWidth}px`,
			});
		}
	}
}

document.addEventListener('keydown', (event: KeyboardEvent) => {
	if (event.key === '`') {
		toggle_full_browser_mode();
	}
});
