import axios from 'axios';
import { LOCAL_STORAGE_KEY } from '../constants/LocalStorageKey';


export class AxiosService {
  private apiURL = process.env.REACT_APP_API_URL;
  private getToken() {
    return localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN_KEY) ?? '';
  }

  private axios = () => {
    const token = this.getToken();
    let headers = {};
    if (token) {
      headers = {
        Authorization: 'Bearer ' + token,
      };
    }
    const axioshttp = axios.create({
      baseURL: process.env.API_URL,
      headers
    });

    // Add a request interceptor
    axioshttp.interceptors.request.use(
      (config) => {
        // Do something before request is sent
        return config;
      },
      (error) => {
        // Do something with request error
        return Promise.reject(error);
      },
    );

    // Add a response interceptor
		axioshttp.interceptors.response.use(
			(response) => {
				// If forbidden return login
        if (response.status === 401) {
          localStorage.clear();
          window.location.replace('/login');
          return
        }
				return response;
			},
			(error) => {
				
				// Do something with response error
				return Promise.reject(error);
			}
		);

    return axioshttp;
  };

  get = async (params: any) => {
    try {
      return await this.axios().get(this.apiURL + params.url, params.data);
    } catch (error) {
      return null;
    }
  };

  post = async (params: any) => {
    try {
      return await this.axios().post(this.apiURL + params.url, params.data);
    } catch (error) {
      return error;
    }
  };

  postFile = async (params: any) => {
    try {
      return await this.axios().post(this.apiURL + params.url, params.data, {
        responseType: 'blob',
      });
    } catch (error) {
      return error;
    }
  };

  put = async (params: any) => {
    try {
      return await this.axios().put(this.apiURL + params.url, params.data);
    } catch (e) {
      return null;
    }
  };

  delete = async (params: any) => {
    try {
      return await this.axios().delete(this.apiURL + params.url, params.data);
    } catch (e) {
      return null;
    }
  };
}

export default new AxiosService();
