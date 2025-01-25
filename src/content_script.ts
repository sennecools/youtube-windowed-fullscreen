console.log('Hello from content script!');

// Constants for fullscreen browser mode class name
const FULLSCREEN_BROWSER_MODE_CLASS = 'fullscreen_browser_mode';

// Constants for key media player DOM elements
const MEDIA_PLAYER_ELEMENT = document.querySelector(
	'#movie_player'
) as HTMLVideoElement;
const MEDIA_PLAYER_CONTROL_BAR = document.querySelector(
	'.ytp-chrome-bottom'
) as HTMLElement;

let is_full_mode = false;
let controls_created = false;

// Function to create the custom control button (similar to the other extension)
const create_control_button = (): void => {
	const original_theatre_button = document.querySelector(
		'.ytp-size-button'
	) as HTMLElement;
	const controls_container = document.querySelector(
		'.ytp-right-controls'
	) as HTMLElement;

	const new_control_button = original_theatre_button.cloneNode(
		true
	) as HTMLElement;
	new_control_button.id = 'full-size';
	new_control_button.innerHTML =
		'<svg width="20" height="28" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M883 1056q0 13-10 23l-332 332 144 144q19 19 19 45t-19 45-45 19h-448q-26 0-45-19t-19-45v-448q0-26 19-45t45-19 45 19l144 144 332-332q10-10 23-10t23 10l114 114q10 10 10 23z" style="fill: white;"></path></svg>';
	new_control_button.className =
		original_theatre_button.className + ' ytp-button';
	new_control_button.addEventListener('click', toggle_full_browser_mode);

	// Insert the new button into the controls container
	controls_container.insertBefore(
		new_control_button,
		original_theatre_button
	);
	controls_created = true;
};

// Function to toggle fullscreen mode and enhance theater mode
const toggle_full_browser_mode = (): void => {
	if (is_full_mode) {
		exit_full_browser_mode();
	} else {
		enter_full_browser_mode();
	}
};

// Function to enter fullscreen mode (with video resizing)
const enter_full_browser_mode = (): void => {
	is_full_mode = true;

	// Trigger YouTube's theater mode if it's not already active
	const theatre_button = document.querySelector(
		'.ytp-size-button'
	) as HTMLElement;
	if (
		theatre_button &&
		!theatre_button.classList.contains('ytp-size-button-active')
	) {
		theatre_button.click();
	}

	// Resize video to take full screen
	const video_player = document.querySelector(
		'#movie_player'
	) as HTMLVideoElement;
	video_player.style.width = '100vw';
	video_player.style.height = '100vh';
	video_player.style.position = 'absolute';
	video_player.style.top = '0';
	video_player.style.left = '0';

	// Enable scroll functionality and hide other UI elements
	document.body.classList.add('updated-full-mode');
	window.scrollTo(0, 0);

	// Check aspect ratio and add black bars if needed
	adjust_aspect_ratio(video_player);
};

// Function to adjust video aspect ratio (add black bars if needed)
const adjust_aspect_ratio = (video_player: HTMLVideoElement) => {
	const window_aspect_ratio = window.innerWidth / window.innerHeight;
	const video_aspect_ratio =
		video_player.videoWidth / video_player.videoHeight;

	if (window_aspect_ratio > video_aspect_ratio) {
		// Add black bars at top and bottom (letterboxing)
		video_player.style.paddingTop = `${
			(window.innerHeight - video_player.clientHeight) / 2
		}px`;
		video_player.style.paddingBottom = `${
			(window.innerHeight - video_player.clientHeight) / 2
		}px`;
	} else {
		// Remove any padding
		video_player.style.paddingTop = '';
		video_player.style.paddingBottom = '';
	}
};

// Function to exit fullscreen mode
const exit_full_browser_mode = (): void => {
	is_full_mode = false;

	// Reset video size and position
	const video_player = document.querySelector(
		'#movie_player'
	) as HTMLVideoElement;
	video_player.style.width = '';
	video_player.style.height = '';
	video_player.style.position = '';
	video_player.style.top = '';
	video_player.style.left = '';

	// Reset UI and return to normal state
	document.body.classList.remove('updated-full-mode');
};

// Function to handle page load and video readiness
const on_page_ready = (): void => {
	if (!controls_created) {
		create_control_button();
	}

	// Listen for the play event and resize the video if needed
	const video_player = document.querySelector(
		'#movie_player'
	) as HTMLVideoElement;
	video_player?.addEventListener('play', () => {
		enter_full_browser_mode(); // Ensure fullscreen is activated when video starts
	});
};

// Listen for Esc key to exit fullscreen mode
document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape' && is_full_mode) {
		exit_full_browser_mode();
	}
});

// Initialize the extension
on_page_ready();
