export const errorCatcher = (error) => {
	switch (error) {
		case 'INVALID_EMAIL':
			return 'Invalid email';
		case 'INVALID_PASSWORD':
			return 'Invalid password';
		case 'EMAIL_NOT_FOUND':
			return 'Email not found';
		default:
			return error;
	}
};
