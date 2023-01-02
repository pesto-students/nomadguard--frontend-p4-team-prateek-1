import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, Select, TextField, InputLabel, MenuItem, Snackbar, Box, Alert } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { userService } from '../../_services/user.service';

const EditUserData = () => {
  const userDetails = JSON.parse(localStorage.getItem('user'));
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token'));

  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };



  useEffect(() => {
    async function fetchData() {
      const response = await userService.EditDetails();
      console.log(response)
      setLoggedIn(response);
      // formik.setFieldValue('firstName', response.firstName);
      // formik.setFieldValue('lastName', response.lastName);
      // formik.setFieldValue('employeeCode', response.employeeCode);
      // formik.setFieldValue('department', response.department);
      // formik.setFieldValue('designation', response.designation);
      // formik.setFieldValue('level', response.level);
      // formik.setFieldValue('qualification', response.qualification);
      // formik.setFieldValue('joiningDate', response.joiningDate);
      // formik.setFieldValue('reviewDate', response.reviewDate);
      // formik.setFieldValue('promotionDate', response.promotionDate);
      // formik.setFieldValue('appraiser', response.appraiser);
      // formik.setFieldValue('reviewer', response.reviewer);
      // formik.setFieldValue('email', response.email);
    }
    fetchData();
 
  }, []);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First Name is required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Last Name is required'),
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    dob: Yup.date().required('Date of birth is required').nullable(),
    citizenship: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Designation is required'),
    homeCountry: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Designation is required'),
    address: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Designation is required'),
    city: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Designation is required'),
    state: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Designation is required'),
    zipCode: Yup.number()
      .required('Designation is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required("Confirm New Password is required"),
  });

  return (<>
  </>);
}

export default EditUserData;