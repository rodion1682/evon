import { useRef } from 'react';

export function Debounce(func, delay) {
	const refs = useRef(null);

	return (...args) => {
		clearTimeout(refs.current);
		refs.current = setTimeout(() => func(...args), delay);
	};
}
