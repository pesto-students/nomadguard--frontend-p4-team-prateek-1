import { fetchWrapper } from '../_helpers/fetch-wrapper';
import configData from '../config.json'

const baseUrl = `${configData.SERVER_URL}/api/apiv1/admin`;
const userBaseUrl = `${configData.SERVER_URL}/api/apiv1/user`;


export const userService = {
  generateOTP,
};

function generateOTP(params) {
  return fetchWrapper.newPassword(`${userBaseUrl}/generateOTP`, params);
}