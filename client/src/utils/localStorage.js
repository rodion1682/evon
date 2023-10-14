export function saveCartToLocalStorage(cart) {
	localStorage.setItem('cart', JSON.stringify(cart));
}

export function getCartFromLocalStorage() {
	const cart = localStorage.getItem('cart');
	if (cart) {
		return JSON.parse(cart);
	}
	return [];
}
