import * as Yup from "yup";
import { useState, useContext } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
// material
import {
  Button,
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { userService } from '../../../_services/user.service';


// ----------------------------------------------------------------------

export default function ForgotPasswordForm() {

  const navigate = useNavigate();
  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
  });

  const loginHandler = () => {
    navigate('/login', { replace: true });
  };

  const newPasswordHandler = () => {
    localStorage.setItem('email', values.email);

    navigate('/new-password', { replace: true });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const responsee = await userService.generateOTP(JSON.stringify(values))
        .then((res) => {
          if (res.ok) {
            setSubmitting(false);
          } else {
            setSubmitting(false);
          }
        })
        console.log(values)

      // localStorage.setItem('email', values.email);
      // navigate('/new-password', { replace: true });
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;


  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3} mb={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
        </Stack>

        <Stack mb={1}>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          // onClick={newPasswordHandler}
          >
            Send Request
          </LoadingButton>
        </Stack>

        <Button
          onClick={loginHandler}
          fullWidth
          size="large"
        >
          Back
        </Button>

      </Form>
    </FormikProvider>
  );
}