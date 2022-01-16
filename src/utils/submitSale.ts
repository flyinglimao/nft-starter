import axios from "axios";
import { Form } from "components/Home/Form";

export function submitSale(form: Form) {
  return axios.post("http://127.0.0.1:3001/create", form);
}
