import axios from "axios";
import { loginEndpoint } from "../config";

export function login(url, body) {
  return axios.post(`${loginEndpoint}${url}`, body);
}
