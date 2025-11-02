import axios from 'axios';

export const baseURL = 'http://82.146.49.197/v1/';

export const instance = axios.create({
  baseURL: baseURL,
});
