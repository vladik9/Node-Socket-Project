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
//Todo: To implement in backEnd for medic model
//search all patient that are assigned to same medic
//initial call on page load
export const searchByMedicId = (id, token) => {
  return axios.get(`/api/medic${urlEnum.search}/${id}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
//Todo: To implement in backEnd for patient model
//search specific patient from dropdown select
export const searchByPatientId = (id, token) => {
  return axios.get(`/api/patient${urlEnum.search}/${id}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};