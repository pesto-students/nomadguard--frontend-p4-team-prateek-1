// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography } from '@mui/material';
// components
// sections


// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 470,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

import { ForgotPasswordForm } from '../sections/auth/forgot_password';
const ForgotPasswordPage = () => {
  return (
    <RootStyle>

      <Container maxWidth="sm">
        <ContentStyle>
          <Typography align="center" variant="h3" gutterBottom>Forgot your password?</Typography>
          <Typography align="center" sx={{ color: 'text.secondary', mb: 5 }}>Please enter the email address associated with your account and We will email you a OTP to reset your password.</Typography>
          <ForgotPasswordForm />
        </ContentStyle>
      </Container>
    </RootStyle>

  );
};

export default ForgotPasswordPage;
