import * as React from 'react';
import Tab from '@mui/material/Tab';
import { Grid, Container, Typography, Button, Box, Card, Stack, Link, Item, Paper } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Purchase from './Purchase';
import Claims from './Claims';
import MyDetails from './MyDetails';
import { LoadingButton } from '@mui/lab';


const InsuranceProfile = () => {
  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const moveToDetailsTab = () => {
    setValue('2')
  }

  return (<>
    <Container maxWidth="xl">
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label={<div>Buy Insurance </div>} value="1" />
              <Tab label={<div>  My Insurances</div>} value="2" />
              {/* <Tab label={<div> Claims Process </div>} value="3" /> */}
              <LoadingButton sx={{ my: 2, ml: 'auto' }} onClick={()=>{setValue('3')}} size="small"  variant="contained">
                How to claim your insurance
              </LoadingButton>
            </TabList>
          </Box>
          <TabPanel sx={{ backgroundColor: "#E2B95D" }} value="1"><Purchase changeTab={moveToDetailsTab} /></TabPanel>
          <TabPanel sx={{ backgroundColor: "#3BAAAB" }} value="3"><Claims /></TabPanel>
          <TabPanel sx={{ backgroundColor: "#5CC6C7" }} value="2"><MyDetails /></TabPanel>

        </TabContext>

      </Box>
    </Container>

  </>);
}

export default InsuranceProfile;