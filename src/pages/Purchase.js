import * as React from 'react';
import { useState, useEffect } from 'react';
// form builder
import { useFormik, Form, FormikProvider } from 'formik';
// validation
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormControl, Select, OutlinedInput, InputLabel, MenuItem, Grid, Container, Typography, Checkbox, Button, Box, Card, Stack, Link, CardContent } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { userService } from 'src/_services/user.service';
import { LoadingButton } from '@mui/lab';

const Purchase = () => {
  const [value, setValue] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [myCoverage, setMyCoverage] = useState(42.00)
  const [myCoverageDays, setMyCoverageDays] = useState(0)


  const getCOuntries = async () => {
    const response = await userService.getCountries()
    setCountriesList(response.data)
  }
  useEffect(() => {
    getCOuntries()
    return () => { };
  }, []);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [countriesList, setCountriesList] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCountries(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };




  const PurchaseSchema = Yup.object().shape({
    startDate: Yup.date().required('Date of birth is required').nullable(),
    endDate: Yup.date().required('Date of birth is required').nullable(),
    hasEndDate: Yup.bool().required('Date of birth is required'),
    phoneNumber: Yup.number()
      .required('Zip Code is required'),
    total: Yup.number(),
    beneficiary: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First Name is required'),
    countries: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
  });

  const formik = useFormik({
    initialValues: {
      startDate: startDate,
      endDate: endDate,
      hasEndDate: isChecked,
      phoneNumber: '',
      coverage: myCoverage,
      coverageDays: myCoverageDays,
      beneficiary: '',
      countries: '',
    },
    validationSchema: PurchaseSchema,
    onSubmit: (values, { setSubmitting }) => {
      values.countries = selectedCountries
      values.hasEndDate = isChecked
      values.startDate = startDate
      values.endDate = endDate
      values.coverage = myCoverage
      values.coverageDays = myCoverageDays



      console.log(JSON.stringify(values))
      submitHandler(values)

      // fetch(`${configData.SERVER_URL}/api/apiv1/user/register`, {
      //   method: 'POST',
      //   body: JSON.stringify(values),
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // }).then(async (res) => {
      //   if (res.ok) {
      //     console.log(res);
      //     setSubmitting(false);
      //     navigate('/login', { replace: true });
      //   } else {
      //     const data = await res.json();
      //     setSubmitting(false);
      //     console.log(data);
      //   }
      // });
    },
  });

  const submitHandler = async (values) => {
    const response = await userService.updateInsurance(values)
    console.log(response)
  }

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;


  // checkbox to show endDate field
  const toggleCheckbox = () => {
    setIsChecked(!isChecked)
    // setEndDate(new Date())
    let tempDate = new Date()
    let nd = tempDate.setDate(startDate.getDate() + 4)
    setEndDate(nd)
  }


  // triggers on every date cahnge and calculate total
  useEffect(() => {
    const oneDay = 1000 * 60 * 60 * 24;
    if (isChecked) {
      setMyCoverage(Math.round(Math.abs((startDate - endDate) / oneDay) + 1) * 1.5)
      setMyCoverageDays(Math.round(Math.abs((startDate - endDate) / oneDay) + 1))

      // if startDate is shifter closer than 5 days to end Date, reset the end Date
      if (Math.round(Math.abs((startDate - endDate) / oneDay) + 1) < 5) {
        let tempDate = new Date()
        let nd = tempDate.setDate(startDate.getDate() + 4)
        setEndDate(nd)
      }
    } else {
      setMyCoverage(42)
    }
    return () => { };
  }, [startDate, endDate]);


  return (<>
    <Container maxWidth="xl" >
      <Typography variant="body2" gutterBottom>
        You do not have any active insurance at the moment.
      </Typography>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                Buy insurance
              </Typography>
              <Stack direction="row" spacing={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Start Date"
                    value={startDate}
                    minDate={startDate}
                    onChange={(newValue) => {
                      setStartDate(newValue.$d)
                      // formik.setFieldValue('startDate', newValue);
                    }}
                    renderInput={(params) => <TextField {...getFieldProps('startDate')} size="small" {...params} />}
                  />
                </LocalizationProvider>
                {isChecked &&
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="End date"
                      value={endDate}
                      minDate={endDate}
                      onChange={(newValue) => {
                        setEndDate(newValue.$d)
                        // formik.setFieldValue('endDate', newValue);
                      }}
                      renderInput={(params) => <TextField {...getFieldProps('endDate')} size="small" {...params} />}
                    />
                  </LocalizationProvider>
                }


              </Stack>

              <FormGroup sx={{ my: 4 }}>
                <FormControlLabel control={<Checkbox checked={isChecked} color="default" onChange={toggleCheckbox} />} label="I want an end date" />
                <Typography variant="body2" gutterBottom>
                  When you choose set travel dates instead of a subscription, you pay for the whole trip upfront. Minimum 5 days, maximum 364 days.
                </Typography>
              </FormGroup>


              <Typography variant="h5" >
                Phone number
              </Typography>
              <TextField sx={{ mb: 4 }}
                {...getFieldProps('phoneNumber')}
                fullWidth
                size="small"
                autoComplete="zipCode"
                type="number"
                label="Phone Number"
                variant="standard"
              />


              <Typography variant="h5" >
                Name of the beneficiary
              </Typography>
              <Typography variant="body2" >
                Who is your beneficiary in case something happens to you?
              </Typography>


              <TextField {...getFieldProps('beneficiary')} fullWidth id="standard-basic" label="" variant="standard" sx={{ mb: 4 }} />

              <Typography variant="h5" >
                Where are you going?
              </Typography>
              <Typography variant="body2" >
                We only need to know your first destination for your coverage to be valid worldwide, but a few countries will require a “visa letter” with insurance confirmation for entry, so it’s recommended to add your all destinations. Your home country cannot be your destination.
              </Typography>

              {/* <FormControl sx={{ m: 1, width: '20%' }}> */}

              <Select
                {...getFieldProps('countries')}
                fullWidth
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={selectedCountries}
                onChange={handleChange}
                input={<OutlinedInput label="Name" />}
              // MenuProps={MenuProps}
              >
                {countriesList.map((countryName) => (
                  <MenuItem
                    key={countryName.countryName}
                    value={countryName.countryName}
                  // style={getStyles(name, personName, theme)}
                  >
                    {countryName.countryName}
                  </MenuItem>
                ))}
              </Select>
              {/* </FormControl> */}
              <LoadingButton sx={{ my: 2 }} size="large" type="submit" variant="contained">
                Register
              </LoadingButton>
            </Grid>


            <Grid item xs={12} md={6} lg={6}>
              <Card sx={{ mx: 4 }}>
                {!isChecked && <CardContent>
                  <Typography variant="body1" >
                    Coverage starts on
                  </Typography>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    {startDate.toDateString()}
                  </Typography>
                  <Typography variant="body1" >
                    My coverage
                  </Typography>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    $42.00
                  </Typography>
                  <hr></hr>
                  <Typography variant="body1" >
                    Total
                  </Typography>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    ${myCoverage} / 4 weeks
                  </Typography>
                  <Typography variant="caption" gutterBottom>
                    *4 weeks is equal to 28 days. This automatically extends every 4 weeks/28 days, until you stop it, for up to 364 days.
                  </Typography>
                </CardContent>}

                {isChecked &&
                  <CardContent>
                    <Typography variant="body1" >
                      Insurance period ({myCoverageDays} days)
                    </Typography>

                    {isChecked &&
                      <Typography variant="h5" sx={{ mb: 2 }}>
                        {startDate.toDateString()} &nbsp; - &nbsp; {new Date(endDate).toDateString()}
                      </Typography>
                    }
                    <Typography variant="body1" >
                      My coverage
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                      $ {myCoverage}
                    </Typography>
                    <hr></hr>
                    <Typography variant="body1" >
                      Total
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                      ${myCoverage} / {myCoverageDays} days
                    </Typography>
                  </CardContent>
                }



              </Card>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </Container>
  </>);
}

export default Purchase;