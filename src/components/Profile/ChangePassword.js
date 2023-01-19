import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// material
import {
  Box, Card, CardContent, Snackbar, Alert,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// component
import Iconify from "../../components/iconify";
import configData from '../../config.json'

const ChangePassword = () => {
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });


  const [severity, setSeverity] = useState();
  const [snakeText, setSnakeText] = useState("");

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const navigate = useNavigate();
  const userDetails = JSON.parse(localStorage.getItem('user'));
  const [showPasswordOld, setShowPasswordOld] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);
  const [showPasswordNewConfirm, setShowPasswordNewConfirm] = useState(false);

  const changePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old Password is required"),
    newPassword: Yup.string().required("New Password is required"),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match').required("Confirm New Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: userDetails.email,
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: (values, { setSubmitting }) => {
      fetch(`${configData.SERVER_URL}/api/apiv1/user/changePassword`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
          'user-id': userDetails._id,
        },
      }).then((res) => {
        console.log(res)
        if (res.ok) {
          console.log(res);
          setSeverity("success")
          setSnakeText("Password has been changed")
          setState({ open: true, ...{ vertical: "bottom", horizontal: "right" } });
          setSubmitting(false);
          setTimeout(() => {
            navigate('/dashboard/app', { replace: true });
          }, 3000);
        } else {
          setSeverity("error")
          setSnakeText("Old password not matched")
          setState({ open: true, ...{ vertical: "bottom", horizontal: "right" } });
          setSubmitting(false);
        }
      });
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleShowPasswordOld = () => {
    setShowPasswordOld((show) => !show);
  };

  const handleShowPasswordNew = () => {
    setShowPasswordNew((show) => !show);
  };

  const handleShowPasswordNewConfirm = () => {
    setShowPasswordNewConfirm((show) => !show);
  };

  return (<div>
    <FormikProvider value={formik}>
      <Card>
        <CardContent>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3}>

              <TextField
                fullWidth
                autoComplete="current-password"
                type={showPasswordOld ? "text" : "password"}
                label="Old password"
                {...getFieldProps("oldPassword")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPasswordOld} edge="end">
                        <Iconify
                          icon={showPasswordOld ? "eva:eye-fill" : "eva:eye-off-fill"}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={Boolean(touched.oldPassword && errors.oldPassword)}
                helperText={touched.oldPassword && errors.oldPassword}
              />

              <TextField
                fullWidth
                autoComplete="current-password"
                type={showPasswordNew ? "text" : "password"}
                label="New password"
                {...getFieldProps("newPassword")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPasswordNew} edge="end">
                        <Iconify
                          icon={showPasswordNew ? "eva:eye-fill" : "eva:eye-off-fill"}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={Boolean(touched.newPassword && errors.newPassword)}
                helperText={touched.newPassword && errors.newPassword}
              />

              <TextField
                fullWidth
                autoComplete="current-password"
                type={showPasswordNewConfirm ? "text" : "password"}
                label="Confirm new password"
                {...getFieldProps("confirmNewPassword")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPasswordNewConfirm} edge="end">
                        <Iconify
                          icon={showPasswordNewConfirm ? "eva:eye-fill" : "eva:eye-off-fill"}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={Boolean(touched.confirmNewPassword && errors.confirmNewPassword)}
                helperText={touched.confirmNewPassword && errors.confirmNewPassword}
              />
            </Stack>


            <Box sx={{ textAlign: 'right', marginTop: '24px' }} direction="row" alignItems="center"
              justifyContent="space-between" >
              <LoadingButton variant="contained" type="submit" loading={isSubmitting}> Save </LoadingButton>
            </Box>
          </Form>
        </CardContent>
      </Card>
    </FormikProvider>

    <Snackbar
      autoHideDuration={6000}
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      key={vertical + horizontal}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {snakeText}
      </Alert>
    </Snackbar>


  </div>);
}

export default ChangePassword;