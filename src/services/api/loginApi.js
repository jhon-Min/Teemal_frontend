import axios from "axios";
import { endpoint } from "../config";

export function login(url, body) {
  return axios.post(`${endpoint}${url}`, body);
}
