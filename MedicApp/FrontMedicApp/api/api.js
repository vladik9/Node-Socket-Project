import axios from "axios";
import { urlEnum } from "../utils/UrlEnum";



export const loginApi = (logInfo) => {
  return axios.post(`/api/${urlEnum.login}`, logInfo);
};

