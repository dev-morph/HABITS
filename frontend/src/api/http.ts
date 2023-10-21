import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: `${process.env.VUE_APP_BASE_URL}:3000`,
	withCredentials: true,
});

export default axiosInstance;
