import { Token } from "components/Home/Form";
import axios from "axios";

export function uploadTokens(tokens: Token[]) {
  return axios.post("http://127.0.0.1:3001/uploadTokens", { tokens });
}
