import axios from 'axios';

const http = axios.create({
	baseURL: 'http://188.166.167.68/api',
});

http.interceptors.response.use(
	(response) => response,
	(error) => {
		const expectedErrors =
			error.response &&
			error.response.status >= 400 &&
			error.response.status < 500;
		if (!expectedErrors) {
			console.log(error);
		}
		return Promise.reject(error.response.data.error);
	}
);

export default http;
