import { fetchWrapper } from '../_helpers/fetch-wrapper';
import configData from '../config.json'

const baseUrl = `${configData.SERVER_URL}/api/apiv1/admin`;
const userBaseUrl = `${configData.SERVER_URL}/api/apiv1/user`;


export const userService = {
  getAll,
  generateOTP,
  EditDetails,
  getCountries,
  updateInsurance,
  getMyInsurance,
  getCities,
  getStates,
  getInsuranceList,
  approveInsurance,
  getInsuredUsers
};
function getAll() {
  return fetchWrapper.get(`${baseUrl}/allUsers`);
}

function getInsuredUsers() {
  return fetchWrapper.get(`${baseUrl}/getInsuredUsers`);
}



function getInsuranceList() {
  return fetchWrapper.get(`${baseUrl}/getInsuranceList`);
}

function generateOTP(params) {
  return fetchWrapper.newPassword(`${userBaseUrl}/generateOTP`, params);
}

// getInsuranceList

function EditDetails() {
  return fetchWrapper.get(`${userBaseUrl}/me`);
}

function getCountries() {
  return fetchWrapper.get(`${userBaseUrl}/getCountries`);
}
function getStates(id) {
  return fetchWrapper.get(`${userBaseUrl}/getStates?id=${id}`);
}
function getCities(id) {
  return fetchWrapper.get(`${userBaseUrl}/getCities?id=${id}`);
}

function approveInsurance(params) {
  console.log(params)
  return fetchWrapper.post(`${baseUrl}/approveInsurance`, params);
}


function updateInsurance(params) {
  return fetchWrapper.post(`${userBaseUrl}/updateInsurance`, params);
}

function getMyInsurance() {
  return fetchWrapper.get(`${userBaseUrl}/getMyInsurance`);
}

