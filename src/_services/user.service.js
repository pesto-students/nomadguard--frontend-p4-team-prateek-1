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
  getInsuredUsers,
  getDashNumbers
};

// ADMIN

// fetch all the user details
function getAll() {
  return fetchWrapper.get(`${baseUrl}/allUsers`);
}

// get dashboard analytics
function getDashNumbers() {
  return fetchWrapper.get(`${baseUrl}/getDashNumbers`);
}

// get all users who are insured
function getInsuredUsers() {
  return fetchWrapper.get(`${baseUrl}/getInsuredUsers`);
}

// get all insurances
function getInsuranceList() {
  return fetchWrapper.get(`${baseUrl}/getInsuranceList`);
}

// approve insurance
function approveInsurance(params) {
  return fetchWrapper.post(`${baseUrl}/approveInsurance`, params);
}

// USER

// generate OTP for valudations
function generateOTP(params) {
  return fetchWrapper.newPassword(`${userBaseUrl}/generateOTP`, params);
}

// edit user details
function EditDetails() {
  return fetchWrapper.get(`${userBaseUrl}/me`);
}

// get list of countries
function getCountries() {
  return fetchWrapper.get(`${userBaseUrl}/getCountries`);
}

// get states of the specific country based on country ID
function getStates(id) {
  return fetchWrapper.get(`${userBaseUrl}/getStates?id=${id}`);
}

// get cities based on state id
function getCities(id) {
  return fetchWrapper.get(`${userBaseUrl}/getCities?id=${id}`);
}

// purchase an insurance  
function updateInsurance(params) {
  return fetchWrapper.post(`${userBaseUrl}/updateInsurance`, params);
}

// get specific insurance
function getMyInsurance() {
  return fetchWrapper.get(`${userBaseUrl}/getMyInsurance`);
}

