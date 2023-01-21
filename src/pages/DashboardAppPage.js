import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';

// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Container, Typography } from '@mui/material';
// components
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
import { userService } from 'src/_services/user.service';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const [totalMembers, setTotalMembers] = useState(0);
  const [insuredMembers, setInsuredMembers] = useState(0);
  const [approved, setApproved] = useState(0);
  const [pending, setPending] = useState(0);

  useEffect(() => {
    getDashboard()

  }, []);

  const getDashboard = async () => {
    const response = await userService.getDashNumbers();

    setTotalMembers(response.data.totalUsers)
    setInsuredMembers(response.data.totalInsurance)
    setApproved(response.data.approved)
    setPending(response.data.pending)

    console.log(response)

  }


  return (
    <>
      <Helmet>
        <title>NomadGUARD  </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} md={6}>
            <AppWidgetSummary title="Total Members" total={totalMembers} />
          </Grid>

          <Grid item xs={12} sm={4} md={6}>
            <AppWidgetSummary title="Insured Members" total={insuredMembers} color="info" />
          </Grid>

          <Grid item xs={12} sm={4} md={6}>
            <AppWidgetSummary title="Insurance Approved" total={approved} color="warning" />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummary title="Insurance Pending " total={pending} color="error" icon={'ant-design:bug-filled'} />
          </Grid>

        </Grid>
      </Container>
    </>
  );
}
