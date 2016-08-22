'use strict';

const watchButtonContentSelector = '.pagehead-actions .btn[href$="/subscription"] .js-select-button';
let watchButtonContentObserver;
const initWatchButton = (watchButtonContent) => {
	if (!watchButtonContent) watchButtonContent = document.querySelector(watchButtonContentSelector);

	if (watchButtonContent.dataset.uughed) return;
	watchButtonContent.dataset.uughed = true;

	if (watchButtonContentObserver) watchButtonContentObserver.disconnect();

	const watchButton = watchButtonContent.parentElement;
	// const updateWatchButtonClass = () => watchButton.classList.toggle('uugh-active', !!document.querySelector('.pagehead-actions .btn[href$="/subscription"] ~ .select-menu-modal-holder .select-menu-list .select-menu-item:nth-child(2).selected'));
	const updateWatchButtonClass = () => watchButton.classList.toggle('uugh-active', !!(
		   watchButtonContent.lastChild
		&& watchButtonContent.lastChild.data
		&& watchButtonContent.lastChild.data.trim() === 'Unwatch'
	));
	watchButtonContentObserver = new MutationObserver(updateWatchButtonClass);
	watchButtonContentObserver.observe(watchButtonContent, { childList: true });
	updateWatchButtonClass();
};

//
// Init: run as soon as the watch button is initialized to prevent/reduce FOUC
//
const watchButtonInitObserver = new MutationObserver((mutations) => {
	for (const mutation of mutations) {
		for (const node of mutation.addedNodes) {
			if (node.matches && node.matches(watchButtonContentSelector)) {
				watchButtonInitObserver.disconnect();
				initWatchButton(node);
				return;
			}
		}
	}
});
watchButtonInitObserver.observe(document.documentElement, { subtree: true, childList: true });

//
// Handle navigation inside repository
//
document.addEventListener('pjax:end', (event) => {
	if (event.target.id !== 'js-repo-pjax-container') return;
	initWatchButton();
});
