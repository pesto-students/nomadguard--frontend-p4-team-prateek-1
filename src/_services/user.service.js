import { fetchWrapper } from '../_helpers/fetch-wrapper';
import configData from '../config.json'

const baseUrl = `${configData.SERVER_URL}/api/apiv1/admin`;
const userBaseUrl = `${configData.SERVER_URL}/api/apiv1/user`;


export const userService = {
  getAll,
  generateOTP,
  EditDetails,
  getCountries,
  updateInsurance
};
function getAll() {
  return fetchWrapper.get(`${baseUrl}/allUsers`);
}

function generateOTP(params) {
  return fetchWrapper.newPassword(`${userBaseUrl}/generateOTP`, params);
}

function EditDetails() {
  return fetchWrapper.get(`${userBaseUrl}/me`);
}

function getCountries() {
  return fetchWrapper.get(`${userBaseUrl}/getCountries`);
}

function updateInsurance(params) {
  console.log(params)
  return fetchWrapper.post(`${userBaseUrl}/updateInsurance`, params);
}