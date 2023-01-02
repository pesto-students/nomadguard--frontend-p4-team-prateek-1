import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false, // if current user is logged in or not
  // functions to change the above keys
  user: {},
  login: (data) => { },
  onAvatarChange: (url) => { },
  logout: (token) => { },
});

// component responsible to managing Auth related state
// accept props because it return AuthContext
// will be using this component as a wrapper around other components so they have access to the context
export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const initialUser = JSON.parse(localStorage.getItem('user'));
  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState(initialUser);

  // useEffect(() => {
  //   if (localStorage.getItem('user')) {
  //     setUser(JSON.parse(localStorage.getItem('user')));
  //     // setIsLoggedIn(true);
  //   }
  // }, []);

  const navigate = useNavigate();
  // gives true/false boolean !!
  // if empty will return false
  // or else true
  const userIsLoggedIn = !!token;

  const loginHandler = (data) => {
    console.log(data)
    setToken(data.token);
    setUser(data);

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data));
  };
 
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    navigate('/login', { replace: true });
  };

  // const avatarHandler = (avatarUrl) => {
  //   setUserAvatar(avatarUrl)
  // }

  const contextValue = {
    token: token,
    user: user,
    onAvatarChange: setUser,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
