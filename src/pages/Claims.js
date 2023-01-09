

import { FormControl, Select, OutlinedInput, InputLabel, MenuItem, Grid, Container, Typography, Checkbox, Button, Box, Card, Stack, Link, CardContent } from '@mui/material';


const Claims = () => {
  return (<>
    <Container sx={{ mb: 20 }} maxWidth="xl">
      <Typography color='white' variant="h4" sx={{ mb: 7 }}>
        What is the Nomad GUARD claim process like?
      </Typography>

      <Grid container spacing={5}>
        <Grid item xs={12} md={12} lg={3}>

          <Stack direction="row" spacing={4}>
            <Typography color='white' variant="h4" sx={{ mb: 2 }}>
              1 - Submit claim form & documents
            </Typography>

          </Stack>
          <Typography variant="body1" >
            Attach necessary documents by clicking on the paperclip icon 📎

            If you are filing a medical claim, make sure to attach
            (a) your medical report (a note from your doctor which include symptoms, diagnosis and treatment),
            (b) a detailed invoice outlining what you paid for and (c) proof of payment or receipt.
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={3}>

          <Stack direction="row" spacing={4}>
            <Typography color='white' variant="h4" sx={{ mb: 2 }}>
              2 - Receive the confirmation
            </Typography>
          </Stack>
          <Typography variant="body1" >
            Wait up to 3 business days for a confirmation email that your claim is in processing.
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={3}>

          <Stack direction="row" spacing={4}>
            <Typography color='white' variant="h4" sx={{ mb: 2 }}>
              3 - Follow the process
            </Typography>
          </Stack>
          <Typography variant="body1" >
            Your claim should take less than 45 days to be processed. You can follow the process on WorldTrips' Client Zone.
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={3}>

          <Stack direction="row" spacing={4}>
            <Typography color='white' variant="h4" sx={{ mb: 2 }}>
              4 -  Get reimbursed
            </Typography>
          </Stack>
          <Typography variant="body1" >
            If approved, you will receive the reimbursement into your bank account by a wire transfer.*

            *If your claim is less than the USD $250 deductible and this is your first claim, your refund will be substracted from your deductible and there will not be a reimbursement until your total claim amount for the certificate period (max 364 days) is more than $250.
          </Typography>
        </Grid>
      </Grid>
    </Container>

  </>);
}

export default Claims;