import axios from 'axios'
import { logoutUser } from '@/api/authApi';
import router from '@/router';

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_APP_BASE_URL}:3000`,
    withCredentials: true
})

axiosInstance.interceptors.response.use((res) => {
	return res
}, async (error) => {
	if(error.response && error.response.status){
		switch (error.response.status) {
			case 401:
				await logoutUser();
				break;
			default:
				return Promise.reject(error);
		}
	}
	return Promise.reject(error);
})

export default axiosInstance
