import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Button, Box, Card, Stack, Link, Item, Paper } from '@mui/material';
import AuthContext from '../_store/auth-context';




// ---------------------------------------------------------------------- component={RouterLink} to={'/nomad-insurance/profile'}

export default function NomadInsurancePage() {
  const theme = useTheme();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate()
  const loginCheck = () => {
    if (authCtx.isLoggedIn) {
      navigate('/nomad-insurance/profile')
    } else if (!authCtx.isLoggedIn) {
      navigate('/login')
    }

  }

  return (
    <>
      <Helmet>
        <title> Dashboard  </title>
      </Helmet>

      <Container maxWidth="xl" >
        {/* <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography> */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <Box sx={{ mx: 3, my: { xs: 5, sm: 12 } }}>
              <Typography variant="h2" sx={{ mb: 2 }}>
                Insurance for nomads
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ mb: 4 }}>
                Travel medical insurance. We cover people from all over the world, while outside their home country.
              </Typography>
              <Typography variant="h5" gutterBottom>
                $42/4 weeks
              </Typography>
              <Typography variant="ccaption" display="block" gutterBottom>
                Including travel in the US
              </Typography>
              <Button onClick={loginCheck} variant="contained">Sign me up</Button>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Box
              component="img"
              src="/assets/images/spaceman.png"
              sx={{ my: { xs: 5, sm: 5 } }}
            />
            {/* <AppWidgetSummary title="New Users" total={1352831} color="info" icon={'ant-design:apple-filled'} /> */}
          </Grid>




          <Grid item xs={12} sx={{ backgroundColor: "#273C49" }}>
            <Grid container sx={{ px: 7, my: 5 }} spacing={3}>
              <Grid item xs={12} sm={6} md={6} lg={3} sx={{ px: 6 }} align="center">
                <Box
                  component="img"
                  src="/assets/images/ng3.svg"
                  sx={{ height: 140, width: 140, my: { xs: 5, sm: 5 } }}
                />
                <Typography color='white' variant="h3" sx={{ mb: 2 }}>
                  Buy abroad, stay abroad
                </Typography>
                <Typography color='white' variant="subtitle2" sx={{ mb: 2 }}>
                  You can sign up for nomadGUARD
                  insurance even if your journey
                  has already started
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3} sx={{ px: 6 }} align="center">
                <Box
                  component="img"
                  src="/assets/images/ng4.svg"
                  sx={{ height: 140, width: 140, my: { xs: 5, sm: 5 } }}
                />
                <Typography color='white' variant="h3" sx={{ mb: 2 }}>
                  Automatic monthly payments
                </Typography>
                <Typography color='white' variant="subtitle2" sx={{ mb: 2 }}>
                  From your chosen start date, your insurance automatically extends every 28 days until you pick an end-date. Just like a subscription.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3} sx={{ px: 6 }} align="center">
                <Box
                  component="img"
                  src="/assets/images/ng5.svg"
                  sx={{ height: 140, width: 140, my: { xs: 5, sm: 5 } }}
                />
                <Typography color='white' variant="h3" sx={{ mb: 2 }}>
                  Visit to home country are covered
                </Typography>
                <Typography color='white' variant="subtitle2" sx={{ mb: 2 }}>
                  After being abroad for 90 days, you keep your medical coverage for 30 days in your home country if something happens while there. (15 days if your home country is the U.S.)
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3} sx={{ px: 6 }} align="center">
                <Box
                  component="img"
                  src="/assets/images/ng6.svg"
                  sx={{ height: 140, width: 140, my: { xs: 5, sm: 5 } }}
                />
                <Typography color='white' variant="h3" sx={{ mb: 2 }}>
                  Young children included.
                </Typography>
                <Typography color='white' variant="subtitle2" sx={{ mb: 2 }}>
                  Up to 2 children under 10 per family (1 per adult) can be included on your insurance free of charge.
                </Typography>
              </Grid>
            </Grid>
          </Grid>



        </Grid>
      </Container>
    </>
  );
}
