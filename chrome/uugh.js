'use strict';

const watchButton = document.querySelector('.pagehead-actions .btn[href$="/subscription"]');

function updateWatchButtonClass() {
	watchButton.classList.toggle('uugh-active', !!document.querySelector('.pagehead-actions .btn[href$="/subscription"] ~ .select-menu-modal-holder .select-menu-list .select-menu-item:nth-child(2).selected'));
}

new MutationObserver(updateWatchButtonClass).observe(watchButton.querySelector('.js-select-button'), { childList: true });
updateWatchButtonClass();
