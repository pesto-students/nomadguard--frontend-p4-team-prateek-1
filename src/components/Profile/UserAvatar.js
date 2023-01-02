import { useEffect, useState } from 'react';
import { Typography, Box, Stack, Card, CardContent, Button, LinearProgress, CircularProgress } from '@mui/material';

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const UserAvatar = () => {
  const userDetails = JSON.parse(localStorage.getItem('user'));
  const [style, setStyle] = useState({ display: 'none' });
  // const [fileDataURL, setFileDataURL] = useState(props.imageUrl);
  const [fileDataURL, setFileDataURL] = useState('/assets/images/avatars/avatar_default.jpg');
  const [file, setFile] = useState(null);
  const [progressPerc, setProgressPerc] = useState();

  const changeHandler = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert('Image mime type is not valid');
      return;
    }
    setFile(file);
  };

  return (<Card>
    <CardContent>
      <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
        <Box alignItems="center" display="flex" justifyContent="center" flexDirection="column">
          <Box>
            <input accept="image/*" id="upload-company-logo" type="file" onChange={changeHandler} hidden />
            <label htmlFor="upload-company-logo">
              <Button
                component="span"
                onMouseEnter={(e) => {
                  setStyle({ display: 'block', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#fff' });
                }}
                onMouseLeave={(e) => {
                  setStyle({ display: 'none' });
                }}
              >
                <span style={style}>Update photo</span>
                <span style={{ display: 'block', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#fff' }}>
                  {userDetails.avatarLoaded && <CircularProgress />}
                  {userDetails.UserAvatarByAdmin && <CircularProgress />}
                </span>
                <Box sx={{ borderRadius: '50%', width: 200, top: 50 }} component="img" src={fileDataURL} />
              </Button>
            </label>
          </Box>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          {/* <div>{ progressPerc != 100 && progressPerc != undefined && <LinearProgress value={progressPerc} />}</div> */}
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Allowed *.jpeg, *.jpg, *.png, *.gif {progressPerc}
          </Typography>
        </Box>
      </Stack>
    </CardContent>
  </Card>);
}

export default UserAvatar;  