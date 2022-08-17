import axios, { AxiosInstance, AxiosResponse } from "axios";
// import createAuthRefreshInterceptor from "axios-auth-refresh";
// import Cookies from "js-cookie";

// const refreshToken = Cookies.get("refreshToken");

type GetOptionType = {
  hasAuth: boolean;
  "Content-Type"?: string;
};
export type TErrorResponse = {
  message: string;
  success: boolean;
};

class Http {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: `http://localhost:8000/`,
    });
  }

  async get(url: string) {
    const response = await this.axios.get(url);
    return response.data;
  }

  async post(url: string, data: {} = {}): Promise<AxiosResponse<any>> {
    try {
      return await this.axios.post(url, data);
    } catch (error: any) {
      if (error.response) {
        throw error.response.data;
      } else {
        throw new Error(error.toString());
      }
    }
  }

  async patch(url: string, data: {} = {}): Promise<AxiosResponse> {
    try {
      return await this.axios.patch(url, data);
    } catch (error: any) {
      if (error.response) {
        throw error.response.data;
      } else {
        throw new Error(error.toString());
      }
    }
  }

  async put(url: string, data: {} = {}): Promise<AxiosResponse> {
    try {
      return await this.axios.put(url, data);
    } catch (error: any) {
      if (error.response) {
        throw error.response.data;
      } else {
        throw new Error(error.toString());
      }
    }
  }

  async delete(url: string, config?: any) {
    const response = await this.axios.delete(url);
    return response.data;
  }
}

const http = new Http();

export default http;
