import axios from "axios";

export function registerDomain(domain: string) {
  return axios.post("http://127.0.0.1:3001/reg", {
    name: domain,
  });
}
