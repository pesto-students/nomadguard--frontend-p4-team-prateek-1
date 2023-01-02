import React, { useContext, useRef, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Box, Stack, Card, CardActions, CardContent, Button, Snackbar, Alert } from '@mui/material';
// components
import UserAvatar from './UserAvatar';
import AuthContext from '../../_store/auth-context';
import EditUserData from './EditUserData';

// /static/mock-images/avatars/avatar_default.jpg


const EditProfile = () => {

  const userDetails = JSON.parse(localStorage.getItem('user'));
  localStorage.setItem('user', JSON.stringify({ ...userDetails, avatarLoaded: false }));
  console.log(userDetails);
  const authCtx = useContext(AuthContext);
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;

  const handleImageChange = async (image) => {
    // localStorage.setItem('user', JSON.stringify({ ...userDetails, avatarLoaded: true }));
    // const formData = new FormData();
    // formData.append('file', image);
    // console.log('ere');
    // // const response = await avatarService.uploadAvatar(formData);
    // const response = await avatarService.updateAvatar(formData);
    // if (response) {
    //   setState({ open: true, ...{ vertical: "bottom", horizontal: "right" } });
    //   localStorage.setItem('user', JSON.stringify({ ...userDetails, avatarLoaded: false }));
    // }
    // authCtx.onAvatarChange({ ...authCtx.user, avatarLocation: response.Location });
    // localStorage.setItem('user', JSON.stringify({ ...userDetails, avatarLocation: response.Location }));
    

  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (<>

      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <UserAvatar onImageChange={handleImageChange} imageUrl={userDetails?.avatarLocation} />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <Card>
              <CardContent>
                <EditUserData />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
  </>);
}

export default EditProfile;