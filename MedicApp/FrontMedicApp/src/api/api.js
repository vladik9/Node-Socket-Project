import axios from "../utils/axiosConfig";
import { urlEnum } from "../utils/UrlEnum";



export const loginApi = (logInfo) => {
  return axios.post(`/api/medic${urlEnum.login}`, logInfo);
};

export const logoutApi = (token) => {
  return axios.post(`/api/medic${urlEnum.logout}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};