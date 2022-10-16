import Axios from 'axios';

const weatherAxios = Axios.create({
  baseURL: import.meta.env.VITE_WEATHER_BASE_URL,
  responseType: 'json',
  timeout: 20000,
});

export { weatherAxios };
