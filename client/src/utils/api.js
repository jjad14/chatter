import axios from 'axios';

// shared axios instance
const api = axios.create({
	baseURL: '/api',
	headers: {
		'Content-Type': 'application/json'
	}
});

export default api;
