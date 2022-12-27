import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Button, Box, Card, Stack, Link } from '@mui/material';
// components
import { Link as RouterLink } from 'react-router-dom';


import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';


// ----------------------------------------------------------------------

export default function LandingPage() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl" >
        {/* <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography> */}

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={5}>
            <Box sx={{ mx: 3, my: { xs: 5, sm: 12 } }}>
              <Typography variant="h2" sx={{ mb: 2 }}>
                Global health insurance for remote workers and nomads
              </Typography>
              <Typography variant="body1" gutterBottom>
                A country on the internet with tools and infrastructure of citizenship
              </Typography>
              <Button component={RouterLink} to={'/nomad-insurance'} variant="contained">GET INSURED</Button>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={7}>
            <Box
              component="img"
              src="/assets/images/ng1.png"
              sx={{ height: 440, width: 500, mx: 'auto', my: { xs: 5, sm: 10 } }}
            />
            {/* <AppWidgetSummary title="New Users" total={1352831} color="info" icon={'ant-design:apple-filled'} /> */}
          </Grid>



          <Grid item xs={12} sm={6} md={12} lg={12} sx={{ backgroundColor: "#E2B95D" }}>
            <Grid item xs={12} md={12} lg={12}>
              <Box sx={{ mx: 3, my: { xs: 5, sm: 5 } }}>
                <Typography variant="h1" sx={{ mb: 2 }}>
                  We are building
                </Typography>
                <Typography variant="h1" sx={{ mb: 2 }}>
                  a global social
                </Typography>
                <Typography variant="h1" sx={{ mb: 2 }}>
                  safety guard
                </Typography>
              </Box>
            </Grid>


            <Grid container spacing={3} sx={{ mb: 10 }}>
              <Grid item xs={12} md={6} lg={7}>
                <Box sx={{ mx: 3, my: { xs: 5, sm: 5 } }}>
                  <Typography variant="body1" gutterBottom>
                    The world has changed, but our systems are not keeping up.
                    The internet and remote work has made the world into a global market, yet the infrastructure we live with is built along the national borders.
                    So much is decided on based on where you were born, and not who you are.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} lg={5} >
                <Box sx={{ mx: 3, my: { xs: 5, sm: 5 } }}>
                  <Typography variant="body1" gutterBottom>
                    We’re here to remove the role of geographical borders as a barrier to equal opportunities and freedom for everyone.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6} md={12} lg={12} sx={{ backgroundColor: "#273C49" }}>
            <Grid item xs={12} md={12} lg={12}>
              <Box sx={{ mx: 3, my: { xs: 5, sm: 5 } }}>
                <Typography color='white' variant="h1" sx={{ mb: 2 }}>
                  Our products
                </Typography>
              </Box>
            </Grid>


            <Grid container spacing={3} sx={{ mb: 10 }}>
              <Grid item xs={12} md={6} lg={6}>
                <Box sx={{ mx: 20, my: { xs: 5, sm: 5 } }}>
                  <Card >
                    <Stack spacing={2} sx={{ p: 3 }}>
                      <Typography variant="h4" sx={{ mb: 2 }} >
                        Nomad Insurance
                      </Typography>
                      <Typography variant="subtitle2" >
                        A travel and medical incident insurance built specifically for digital nomads. It can be purchased while already abroad, covers home trip visits and operates like a monthly subscription.
                      </Typography>
                      <Button variant="contained">Get Insured</Button>
                    </Stack>
                  </Card>
                </Box>

              </Grid>
              <Grid item xs={12} md={6} lg={6} >
                <Box sx={{ mx: 20, my: { xs: 5, sm: 5 } }}>
                  <Card >
                    <Stack spacing={2} sx={{ p: 3 }}>
                      <Typography variant="h4" sx={{ mb: 2 }} >
                        Remote Health
                      </Typography>
                      <Typography variant="subtitle2" >
                        Remote Health insurance is a fully fledged health insurance for remote teams and entrepreneurs. It gives global companies a truly flexible solution that no other insurance company offers.
                      </Typography>
                      <Button variant="contained">Get your team insured (Coming soon)</Button>
                    </Stack>
                  </Card>
                </Box>
              </Grid>
            </Grid>
          </Grid>


          
        </Grid>
      </Container>
    </>
  );
}
