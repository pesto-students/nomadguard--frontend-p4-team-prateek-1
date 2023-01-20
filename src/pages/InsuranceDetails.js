import * as React from 'react';
import { useState, useContext, useImperativeHandle } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Typography } from '@mui/material';

import { LoadingButton } from '@mui/lab';
// form builder
import { useFormik, Form, FormikProvider } from 'formik';
// validation
import * as Yup from 'yup';
// service
import { userService } from 'src/_services/user.service';
// auth context from store
import AuthContext from 'src/_store/auth-context';

const InsuranceDetails = React.forwardRef((props, ref) => {
  const authCtx = useContext(AuthContext);
  const userDetails = authCtx.user;
  const [open, setOpen] = React.useState(false);
  const [insurance, setInsurance] = useState()

  const handleClickOpen = () => {
    setOpen(true);
  };

  useImperativeHandle(ref, (insurance) => ({
    // getting one insurance as props from insurance list component
    openModal(insurance) {
      console.log(insurance)
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
          <Dialog maxWidth={"lg"} open={open} onClose={handleClose}>
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
                  User Information &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;
                </Typography>

                <Typography variant="subtitle1" >
                  Name - &nbsp; &nbsp; {insurance.createdBy.firstName} {insurance.createdBy.lastName}
                </Typography>

                <Typography variant="subtitle1" >
                  Email - &nbsp; &nbsp; {insurance.createdBy.email}
                </Typography>
                <Typography variant="subtitle1" >
                  Home Country - &nbsp; &nbsp; {insurance.createdBy.homeCountry}
                </Typography>
                <Typography variant="subtitle1" >
                  Citizenship - &nbsp; &nbsp; {insurance.createdBy.citizenship}
                </Typography>
                <Typography variant="subtitle1" >
                  State - &nbsp; &nbsp; {insurance.createdBy.state}
                </Typography>
                <Typography variant="subtitle1" >
                  City - &nbsp; &nbsp; {insurance.createdBy.city}
                </Typography>
              </>

            </DialogContent>

            {userDetails.userRole == 'ADMIN' && <>
              <DialogActions>
                <LoadingButton onClick={handleClose}>Cancel</LoadingButton>
                <LoadingButton variant="contained" onClick={submitHandleClose}>Approve</LoadingButton>
              </DialogActions>
            </>}

          </Dialog>
        </>}

      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}

    </div>
  );
})

export default InsuranceDetails;