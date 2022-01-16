import axios from "axios";

export function uploadToIPFS(files: File | File[]) {
  const body = new FormData();
  if (Array.isArray(files)) {
    for (let i = 0; i < files.length; i++) {
      body.append("upload", files[i]);
    }
    return axios.post("http://127.0.0.1:3001/upload", body);
  } else {
    body.append("upload", files);
    return axios.post("http://127.0.0.1:3001/upload_single", body);
  }
}
