import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, Select, TextField, InputLabel, Container, Grid, MenuItem, Snackbar, Box, Alert } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { userService } from '../../_services/user.service';
// component
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import configData from '../../config.json'


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
      formik.setFieldValue('firstName', response.firstName);
      formik.setFieldValue('lastName', response.lastName);
      formik.setFieldValue('dob', response.dob);
      formik.setFieldValue('citizenship', response.citizenship);
      formik.setFieldValue('homeCountry', response.homeCountry);
      formik.setFieldValue('address', response.address);
      formik.setFieldValue('city', response.city);
      formik.setFieldValue('state', response.state);
      formik.setFieldValue('zipCode', response.zipCode);
      formik.setFieldValue('email', response.email);

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

  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      dob: '',
      citizenship: '',
      homeCountry: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      email: '',
      password: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: (values, { setSubmitting }) => {

      console.log(JSON.stringify(values))
      fetch(`${configData.SERVER_URL}/api/apiv1/user/updateProfile`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
          'user-id': userDetails._id,
        },
      }).then(async (res) => {
        if (res.ok) {
          console.log(res);
          setState({ open: true, ...{ vertical: 'bottom', horizontal: 'right' } });
          setSubmitting(false);
        } else {
          console.log(res);
          const data = await res.json();
          setSubmitting(false);
          console.log(data);
        }
      });


    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <div>

      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
 

          <Container maxWidth="xl">

            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  size="small"
                  autoComplete="firstName"
                  type="text"
                  label="First Name"
                  {...getFieldProps('firstName')}
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
              </Grid>

              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  size="small"
                  autoComplete="lastName"
                  type="text"
                  label="Last Name"
                  {...getFieldProps('lastName')}
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Date of Birth"
                    readOnly
                    id="dob"
                    name="dob"
                    value={formik.values.dob}
                    onChange={(val) => {
                      formik.setFieldValue('dob', val);
                    }}
                    renderInput={(params) => <TextField size='small' fullWidth {...params} error={Boolean(touched.dob && errors.dob)} helperText={touched.dob && errors.dob} />}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  size="small"
                  autoComplete="citizenship"
                  type="text"
                  label="Citizenship"
                  {...getFieldProps('citizenship')}
                  error={Boolean(touched.citizenship && errors.citizenship)}
                  helperText={touched.citizenship && errors.citizenship}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  inputProps={{ readOnly: true }}
                  size="small"
                  autoComplete="homeCountry"
                  type="text"
                  label="Home Country"
                  {...getFieldProps('homeCountry')}
                  error={Boolean(touched.homeCountry && errors.homeCountry)}
                  helperText={touched.homeCountry && errors.homeCountry}
                />
              </Grid>

              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  size="small"
                  autoComplete="address"
                  type="text"
                  label="Address"
                  {...getFieldProps('address')}
                  error={Boolean(touched.address && errors.address)}
                  helperText={touched.address && errors.address}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  size="small"
                  autoComplete="city"
                  type="text"
                  label="City"
                  {...getFieldProps('city')}
                  error={Boolean(touched.city && errors.city)}
                  helperText={touched.city && errors.city}
                />
              </Grid>

              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  size="small"
                  autoComplete="state"
                  type="text"
                  label="State"
                  {...getFieldProps('state')}
                  error={Boolean(touched.state && errors.state)}
                  helperText={touched.state && errors.state}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  size="small"
                  inputProps={{ readOnly: true }}
                  autoComplete="username"
                  type="email"
                  label="Email address"
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  size="small"
                  autoComplete="zipCode"
                  type="number"
                  label="Postal or zip code"
                  {...getFieldProps('zipCode')}
                  error={Boolean(touched.zipCode && errors.zipCode)}
                  helperText={touched.zipCode && errors.zipCode}
                />
              </Grid>



              <Grid item xs={12} md={12} lg={12}>
                <LoadingButton sx={{ my: 2 }} fullWidth size="large" type="submit" variant="contained">
                  Update
                </LoadingButton>
              </Grid>

            </Grid>
          </Container>


          {/* 
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}


        </Form>
      </FormikProvider>
      <Snackbar autoHideDuration={6000} anchorOrigin={{ vertical, horizontal }} open={open} onClose={handleClose} key={vertical + horizontal}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Profile has been updated
        </Alert>
      </Snackbar>
    </div>


  );
}

export default EditUserData;