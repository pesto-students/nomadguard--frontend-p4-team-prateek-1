import * as React from 'react';
import { forwardRef, useRef, useState, useImperativeHandle } from "react"
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, Container, Typography, Button, Box, Card, Stack, Link, Item, Paper } from '@mui/material';

import { LoadingButton } from '@mui/lab';
// form builder
import { useFormik, Form, FormikProvider } from 'formik';
// validation
import * as Yup from 'yup';
import { userService } from 'src/_services/user.service';

const InsuranceDetails = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);
  const [insurance, setInsurance] = useState()

  const handleClickOpen = () => {
    setOpen(true);
  };

  useImperativeHandle(ref, (insurance) => ({
    // getting one insurance as props from insurance list component
    openModal(insurance) {
      setInsurance(insurance)
      handleClickOpen()
    },
  }))

  const submitHandleClose = async () => {
    const response = await userService.approveInsurance({ insuranceId: insurance._id })
    console.log(response)
    props.updateInsurance(insurance._id)
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <div>
      {insurance &&
        <>
          <Dialog open={open} onClose={handleClose}>
            {/* <DialogTitle>Insurance Details</DialogTitle> */}
            <DialogContent>
              <>

                <Typography variant="h4" sx={{ my: 2 }}>
                  Insurance
                </Typography>

                <Typography variant="subtitle1" >
                  Start Date - &nbsp; &nbsp; {insurance.startDate.split('T')[0]}
                </Typography>
                <Typography variant="subtitle1" >
                  End Date - &nbsp; &nbsp; {insurance.endDate.split('T')[0]}
                </Typography>
                <Typography variant="subtitle1" >
                  Beneficiary - &nbsp; &nbsp; {insurance.beneficiary}
                </Typography>
                <Typography variant="subtitle1" >
                  Destination - &nbsp; &nbsp; {insurance.countries}
                </Typography>


                <Typography variant="h4" sx={{ my: 2 }}>
                  User Information
                </Typography>
              </>

            </DialogContent>
            <DialogActions>
              <LoadingButton onClick={handleClose}>Cancel</LoadingButton>
              <LoadingButton variant="contained" onClick={submitHandleClose}>Approve</LoadingButton>
            </DialogActions>
          </Dialog>
        </>}

      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}

    </div>
  );
})

export default InsuranceDetails;