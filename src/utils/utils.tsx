import type { AuthState } from '@okta/okta-auth-js';
import { config } from '../config';
import axios, { AxiosHeaders, AxiosResponse } from 'axios';

type RequestConfig = {
  headers?: AxiosHeaders;
};

export type ParentType = {
  id: string;
  parentName: string;
  intField: number;
  doubleField: number;
  dateField: string;
  stringField: string;
  booleanField: boolean;
};

export const axiosGetWithAuth = async (
  input: string,
  authState: AuthState | null,
  axiosConfig: RequestConfig = {}
): Promise<any> => {
  const token = authState?.accessToken?.accessToken;
  const prefixedURL = config.javaBaseUrl + input;
  const bearerTokenHeader = 'Bearer ' + token;

  if (axiosConfig.headers === undefined) {
    axiosConfig['headers'] = new AxiosHeaders();
  }

  axiosConfig.headers['Authorization'] = bearerTokenHeader;

  const res = await axios.get(prefixedURL, { ...axiosConfig });
  if (res.status === 200) {
    return res.data;
  } else {
    return Promise.reject(res);
  }
};

export const axiosPostWithAuth = async (
  input: string,
  authState: AuthState | null,
  body: any,
  axiosConfig: RequestConfig = {}
): Promise<any> => {
  const token = authState?.accessToken?.accessToken;
  const prefixedURL = config.javaBaseUrl + input;
  const bearerTokenHeader = 'Bearer ' + token;

  if (axiosConfig.headers === undefined) {
    axiosConfig.headers = new AxiosHeaders();
  }

  axiosConfig.headers['Authorization'] = bearerTokenHeader;
  axiosConfig.headers['Content-Type'] = 'application/json';

  const res = await axios.post(prefixedURL, body, { ...axiosConfig });
  if (res.status === 200) {
    return res.data;
  } else {
    return Promise.reject(res);
  }
};

export const axiosDeleteWithAuth = async (
  id: string,
  input: string,
  authState: AuthState | null,
  axiosConfig: RequestConfig = {}
): Promise<AxiosResponse> => {
  const token = authState?.accessToken?.accessToken;
  const prefixedURL = `${config.javaBaseUrl}${input}/${id}`;
  const bearerTokenHeader = 'Bearer ' + token;

  if (axiosConfig.headers === undefined) {
    axiosConfig.headers = new AxiosHeaders();
  }
  axiosConfig.headers['Authorization'] = bearerTokenHeader;

  const res = await axios.delete(prefixedURL, { ...axiosConfig });
  if (res.status === 200) {
    return res.data;
  } else {
    return Promise.reject(res);
  }
};

export const axiosPutWithAuth = async (
  input: string,
  authState: AuthState | null,
  body: any,
  axiosConfig: RequestConfig = {}
): Promise<any> => {
  const token = authState?.accessToken?.accessToken;
  const prefixedURL = config.javaBaseUrl + input;
  const bearerTokenHeader = 'Bearer ' + token;

  if (axiosConfig.headers === undefined) {
    axiosConfig.headers = new AxiosHeaders();
  }

  axiosConfig.headers['Authorization'] = bearerTokenHeader;
  axiosConfig.headers['Content-Type'] = 'application/json';

  const res = await axios.put(prefixedURL, body, { ...axiosConfig });
  if (res.status === 200) {
    return res.data;
  } else {
    return Promise.reject(res);
  }
};

export function formatDate(inputDate: string): string {
  const date = new Date(inputDate);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear().toString();

  return `${year}-${month}-${day}`;
}
