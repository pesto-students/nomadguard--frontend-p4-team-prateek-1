import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";

// @mui
import { Link, Grid, Stack, IconButton, InputAdornment, TextField, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

//Auth context to store token
import AuthContext from "src/_store/auth-context";
import configData from '../../../config.json'


// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [guestLogin, setGuestLogin] = useState(false);

  const [alert, setAlert] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: (values, { setSubmitting }) => {
      if (guestLogin) {
        values.email = 'pesto@project.com',
          values.password = '1111111'
      }
      console.log(values)
      fetch(`${configData.SERVER_URL}/api/apiv1/user/login`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(res)
        if (res.ok) {
          res.json().then((data) => {
            setSubmitting(false);
            authCtx.login(data);
            if (data.userRole == 'USER') {
              navigate('/nomad-insurance/profile', { replace: true });
            } else if (data.userRole == 'ADMIN') {
              navigate('/dashboard/app', { replace: true });
            }
          })
        } else {
          setSubmitting(false);
          setAlert(true);
        }
      })
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleClick = () => {
    navigate('/dashboard', { replace: true });
  };

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          {alert === true && <Alert sx={{ mb: 3 }} severity="error" >Invalid credentials!</Alert>}

          <Stack spacing={3}>
            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email address/Employee code"
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              {...getFieldProps("password")}
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
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
            {/* <Checkbox name="remember" label="Remember me" /> */}
            <Link variant="subtitle2" underline="hover">
              Forgot password?
            </Link>
          </Stack>

          <Grid container spacing={3}>

            <Grid item xs={6} md={6} lg={6}>
              <LoadingButton loading={isSubmitting} fullWidth size="large" type="submit" variant="contained" >
                Login
              </LoadingButton>
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <LoadingButton loading={isSubmitting} onClick={() => { setGuestLogin(true) }} fullWidth size="large" type="submit" variant="contained">
                Guest Login
              </LoadingButton>
            </Grid>
          </Grid>


        </Form>

      </FormikProvider>
    </>
  );
}
