import axios from 'axios';

// Access token храню в local storage, потому что сервер не возвращает cookie httpOnly в котором есть access token. Я мог бы хранить в cookie, но в этом особого смысла нет, что cookie что local storage не безопасны.
export const api = axios.create({
  baseURL: 'http://api.calmplete.net/api/',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('Error in API request:', error);
    if (error?.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/sign-in';
    }
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    // По хорошему добавлять access token только когда он нужен, но пока так.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
