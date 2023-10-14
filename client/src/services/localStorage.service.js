const TOKEN_KEY = 'jwt-token';
const REFRESH_KEY = 'jwt-refresh-token';
const EXPIRES_KEY = 'jwt-expires';
const USERID_KEY = 'user-local-id';
const AUTH_DATA = 'auth-data';

if (getTokenExpiresDate() < new Date().getTime()) {
	removeAuthData();
}

export function setTokens({
	refreshToken,
	accessToken,
	userId,
	expiresIn = 3600,
}) {
	const expiresDate = new Date().getTime() + expiresIn * 10;
	localStorage.setItem(USERID_KEY, userId);
	localStorage.setItem(TOKEN_KEY, accessToken);
	localStorage.setItem(REFRESH_KEY, refreshToken);
	localStorage.setItem(EXPIRES_KEY, expiresDate);
}
export function getAccessToken() {
	return localStorage.getItem(TOKEN_KEY);
}
export function getRefreshToken() {
	return localStorage.getItem(REFRESH_KEY);
}
export function removeAuthData() {
	localStorage.removeItem(USERID_KEY);
	localStorage.removeItem(TOKEN_KEY);
	localStorage.removeItem(REFRESH_KEY);
	localStorage.removeItem(EXPIRES_KEY);
	localStorage.removeItem(AUTH_DATA);
}

export function getTokenExpiresDate() {
	return localStorage.getItem(EXPIRES_KEY);
}
export function getUserId() {
	return localStorage.getItem(USERID_KEY);
}

export function getAuthData() {
	return JSON.parse(localStorage.getItem(AUTH_DATA));
}

export function setAuthData(data) {
	localStorage.setItem(AUTH_DATA, JSON.stringify(data));
}

const localStorageService = {
	setTokens,
	getAccessToken,
	getRefreshToken,
	getTokenExpiresDate,
	getUserId,
	removeAuthData,
	getAuthData,
	setAuthData,
};
export default localStorageService;
