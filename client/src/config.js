export const API_BASE_URL = 'http://127.0.0.1:8000';
export const APP_BASE_URL = 'http://localhost:3000';
export const token = localStorage.getItem('authUser') ? localStorage.getItem('authUser') : ''

export const getAxiosConfig = () => {
	const token = localStorage.getItem('authUser') ? localStorage.getItem('authUser') : ''
	return  {
	  headers: { Authorization: 'Bearer ' + token }
	};
}