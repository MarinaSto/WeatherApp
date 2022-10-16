import axios, { AxiosError } from 'axios';
export interface IWeatherResponse {
  weather: Array<{
    main: string;
    description: string;
  }>;
  name: string;
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
}

class WeatherApiService {
  baseUrl: string;
  apiKey: string;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async getWeaherCity(city: string): Promise<IWeatherResponse | null> {
    try {
      const queryUrl = `${this.baseUrl}weather?q=${city}&units=metric&APPID=${this.apiKey}`;
      const response = await axios.get<IWeatherResponse>(queryUrl);
      return response.data;
    } catch (err) {
      this.handleErrors(err as Error);
    }
    return null;
  }

  handleErrors(err: Error) {
    if (err instanceof AxiosError) {
      const errorMessage = err.response?.data.message;
      console.log({ message: 'Weather Api service exception: ', errorMessage });
      return;
    }
    console.log({ message: 'Weather Api service exception: ', err });
  }
}

export const $api = {
  weather: new WeatherApiService(
    import.meta.env.VITE_WEATHER_BASE_URL,
    import.meta.env.VITE_WEATHER_API_KEY
  ),
};
