import { useEffect } from 'react';

export let bodyLockStatus = true;
export let bodyLockToggle = (delay = 500) => {
	if (document.documentElement.classList.contains('lock')) {
		bodyUnlock(delay);
	} else {
		bodyLock(delay);
	}
};
export let bodyUnlock = (delay = 500) => {
	let body = document.querySelector('body');
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll('[data-lp]');
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			document.documentElement.classList.remove('lock');
		}, delay);
		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
};
export let bodyLock = (delay = 500) => {
	let body = document.querySelector('body');
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll('[data-lp]');
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight =
				window.innerWidth -
				document.querySelector('.wrapper').offsetWidth +
				'px';
		}
		body.style.paddingRight =
			window.innerWidth -
			document.querySelector('.wrapper').offsetWidth +
			'px';
		document.documentElement.classList.add('lock');

		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
};

export function useMenuInit() {
	useEffect(() => {
		const iconMenu = document.querySelector('.header-footer__icon');
		if (iconMenu) {
			iconMenu.addEventListener('click', function (e) {
				if (bodyLockStatus) {
					bodyLockToggle();
					document.documentElement.classList.toggle('menu-open');
				}
			});
		}
	}, []);
}
export function menuOpen() {
	bodyLock();
	document.documentElement.classList.add('menu-open');
}
export function menuClose() {
	bodyUnlock();
	document.documentElement.classList.remove('menu-open');
}
