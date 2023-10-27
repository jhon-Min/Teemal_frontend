import axios from "axios";
import { endpoint } from "../config";

export function createArtist(token, url, body) {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return axios.post(`${endpoint}${url}`, body, config);
}

export function artistLists(token, url, query = "") {
  return axios.get(`${endpoint}${url}?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function updateArtist(token, url, body) {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return axios.put(`${endpoint}${url}`, body, config);
}

export function deleteArtist(token, url) {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return axios.delete(`${endpoint}${url}`, config);
}
