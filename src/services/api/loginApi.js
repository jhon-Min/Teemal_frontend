import axios from "axios";
import { endpoint } from "../config";

export function login(url, body) {
  console.log(endpoint);
  return axios.post(`${endpoint}${url}`, body);
}
