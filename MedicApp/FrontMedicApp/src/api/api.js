import axios from "../utils/axiosConfig";
import { urlEnum } from "../utils/UrlEnum";



export const loginApi = (logInfo) => {
  return axios.post(`/api/medic${urlEnum.login}`, logInfo);
};

