import axios from "axios";
import { endpoint } from "../config";

export function createArtist(token, url, body) {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return axios.post(`${endpoint}${url}`, body, config);
}
