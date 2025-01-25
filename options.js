// Retrieve the extension settings
const is_firefox = typeof browser !== 'undefined' && browser ? true : false;
let extension_settings = {};

if (!is_firefox) {
	chrome.storage.sync.get(null, load_browser_settings);
} else {
	browser.storage.sync.get().then(load_browser_settings);
}

function load_browser_settings(items) {
	extension_settings = {
		shortcut_display: items.shortcut_display || '`',
		shortcut_key: items.shortcut_key || 192,
		hide_full_screen: items.hide_full_screen || false,
		auto_toggle: items.auto_toggle || false,
	};
	on_page_ready();
}

function on_page_ready() {
	// This event lets us know when the youtube player is ready, and we can inject our controls in.
	document.body.addEventListener('yt-navigate-finish', function () {
		page_ready_interval();
	});
}

function page_ready_interval() {
	const video = document.querySelector(
		"video[src^='blob:https://www.youtube.com']"
	);
	if (is_page_video() && video && !controls_created) {
		create_control();
	}
}

function is_page_video() {
	return (
		location.pathname.includes('/watch') ||
		location.pathname.includes('/live/')
	);
}
