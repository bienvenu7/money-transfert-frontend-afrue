import { config } from '@/utils/config';
import axios from 'axios';

export const baseURL = config.api.baseUrl;

export const instance = axios.create({
  baseURL: baseURL,
});
