chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.sync.set({ hide_full_screen: false, auto_toggle: false });
});
