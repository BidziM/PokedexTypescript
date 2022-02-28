import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const client: AxiosInstance = axios.create({
    baseURL: process.env.baseURL ? process.env.baseURL :"http://pokeapi.co/api/v2/",
  });

export default function apiRequest(url:string, init: AxiosRequestConfig){
    return client(url, init)
    .then((res: AxiosResponse) => {
      if(res.status === 200){
        return res.data
      }
    })
    .catch((err) => {
      throw err.response
    })
}