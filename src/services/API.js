import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.VUE_APP_API_URL}/api/v1`,
  withCredentials: true,
});

instance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  const status = error.response.status;
  if (window.location.pathname !== '/login' && (status === 401 || status === 403)) {
    window.location = '/login';
  }

  return Promise.reject(error);
});

export default instance;
