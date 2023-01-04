import * as React from 'react';
import Tab from '@mui/material/Tab';
import { Grid, Container, Typography, Button, Box, Card, Stack, Link, Item, Paper } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Purchase from './Purchase';
import Claims from './Claims';
import MyDetails from './MyDetails';


const InsuranceProfile = () => {
  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (<>
    <Container maxWidth="xl">
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Account
        </Typography>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label={<div> Insurance </div>} value="1" />
              <Tab label={<div> Claims </div>} value="2" />
              <Tab label={<div>  My Details</div>} value="3" />
            </TabList>
          </Box>
          <TabPanel value="1"><Purchase /></TabPanel>
          <TabPanel value="2"><Claims /></TabPanel>
          <TabPanel value="3"><MyDetails /></TabPanel>
        </TabContext>
      </Box>
    </Container>

  </>);
}

export default InsuranceProfile;