import { useState, React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// form builder
import { useFormik, Form, FormikProvider } from 'formik';
// validation
import * as Yup from 'yup';
// @mui
import { Link, MenuItem, Select, IconButton, OutlinedInput, InputAdornment, Grid, TextField, Checkbox, Container } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
// backend config
import configData from '../../../config.json'
import { userService } from 'src/_services/user.service';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [countriesList, setCountriesList] = useState([]);
  const [statesList, setStatesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);

  const [selectedCountries, setSelectedCountries] = useState('United States ');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {

    async function getCon() {
      const response = await userService.getCountries()
      console.log(response)
      setCountriesList(response.data)
    }
    getCon()
    return () => { }
  }, [])


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
      .required('Citizenship is required'),
    homeCountry: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Home Country is required'),
    address: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Address is required'),
    city: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('City is required'),
    state: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('State is required'),
    zipCode: Yup.number()
      .required('Zip Code is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required("Confirm New Password is required"),
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
      fetch(`${configData.SERVER_URL}/api/apiv1/user/register`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(async (res) => {
        if (res.ok) {
          console.log(res);
          setSubmitting(false);
          navigate('/login', { replace: true });
        } else {
          const data = await res.json();
          setSubmitting(false);
          console.log(data);
        }
      });


    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  // dob picker
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleClick = () => {
    navigate('/dashboard', { replace: true });
  };

  const onCountrySelect = async (id) => {
    const response = await userService.getStates(id)
    setStatesList(response.data)
    console.log(response)
  }
  const onStateSelect = async (id) => {
    const response = await userService.getCities(id)
    console.log(response)
    setCitiesList(response.data)
  }

  return (
    <>

      {countriesList &&

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
                  <TextField
                    fullWidth
                    size="small"
                    id="dob"
                    label="Date of birth"
                    type="date"
                    {...getFieldProps('dob')}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={Boolean(touched.dob && errors.dob)}
                    helperText={touched.lastNadobme && errors.dob}
                  />


                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <TextField fullWidth size="small" select label="Home Country" {...getFieldProps('homeCountry')}
                    error={Boolean(touched.homeCountry && errors.homeCountry)}
                    helperText={touched.homeCountry && errors.homeCountry}
                    defaultValue={'United States'} >
                    {countriesList.map((countryName) => (
                      <MenuItem
                        key={countryName.countryName}
                        value={countryName.countryName}
                      // style={getStyles(name, personName, theme)}
                      >
                        {countryName.countryName}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <TextField fullWidth size="small" select label="Citizenship" {...getFieldProps('citizenship')}
                    error={Boolean(touched.citizenship && errors.citizenship)}
                    helperText={touched.citizenship && errors.citizenship}
                    defaultValue={'United States'}   >
                    {countriesList.map((countryName) => (
                      <MenuItem
                        key={countryName.countryName}
                        value={countryName.countryName}
                        onClick={() => { onCountrySelect(countryName._id) }}

                      // style={getStyles(name, personName, theme)}
                      >
                        {countryName.countryName}
                      </MenuItem>
                    ))}
                  </TextField>

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

                  <TextField fullWidth size="small" select label="State" {...getFieldProps('state')}
                    error={Boolean(touched.state && errors.state)}
                    helperText={touched.state && errors.state}   >
                    {statesList.map((state) => (
                      <MenuItem
                        key={state.stateName}
                        value={state.stateName}
                        onClick={() => { onStateSelect(state._id) }}
                      >
                        {state.stateName}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  {/* <TextField
          fullWidth
          size="small"
          autoComplete="city"
          type="text"
          label="City"
          {...getFieldProps('city')}
          error={Boolean(touched.city && errors.city)}
          helperText={touched.city && errors.city}
        /> */}

                  <TextField fullWidth size="small" select label="City" {...getFieldProps('city')}
                    error={Boolean(touched.city && errors.city)}
                    helperText={touched.city && errors.city}   >
                    {citiesList.map((city) => (
                      <MenuItem
                        key={city.cityName}
                        value={city.cityName}
                      // onClick={() => { onStateSelect(state._id) }}
                      >
                        {city.cityName}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>


                <Grid item xs={12} md={6} lg={6}>
                  <TextField
                    fullWidth
                    size="small"
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


                <Grid item xs={12} md={6} lg={6}>
                  <TextField
                    fullWidth
                    size="small"
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    {...getFieldProps('password')}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                  <TextField
                    fullWidth
                    size="small"
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    {...getFieldProps('confirmPassword')}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                            <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                  />
                </Grid>

                <Grid item xs={12} md={12} lg={12}>
                  <LoadingButton sx={{ my: 2 }} fullWidth size="large" loading={isSubmitting} type="submit" variant="contained">
                    Register
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
      }

    </>

  );
}
