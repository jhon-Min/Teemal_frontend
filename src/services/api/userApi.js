import axios from "axios";
import { endpoint } from "../config";

export function createCmsUser(token, url, body) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(endpoint);
  return axios.post(`${endpoint}${url}`, body, config);
}
