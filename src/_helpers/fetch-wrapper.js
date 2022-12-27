export const fetchWrapper = {
  get,
  post,
  postData,
  put,
  postDoc,
  delete: _delete,
  newPassword,
};



function get(url) {
const user = JSON.parse(localStorage.getItem('user'));
  console.log(user)
  const requestOptions = {
    method: 'GET',
    headers: {
      'auth-token': user.token,
      'user-id': user._id,
      Accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function postDoc(url, body) {
  const user = JSON.parse(localStorage.getItem('user'));
  const requestOptions = {
    method: 'POST',
    headers: { 'auth-token': user.token, 'user-id': user._id },
    body: body,
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function postDocByAdmin(url, body, id) {
   const user = id
   const requestOptions = {
     method: 'POST',
     headers: { 'user-id': user },
     body: body,
   };
   return fetch(url, requestOptions).then(handleResponse);
 }

function post(url, body) {
  const user = JSON.parse(localStorage.getItem('user'));
  const requestOptions = {
    method: 'POST',
    headers: { 'auth-token': user.token, 'user-id': user._id, 'Content-Type': 'application/json' },
    body:JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function postData(url, body) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body,
    };
    return fetch(url, requestOptions).then(handleResponse);
  }

function put(url, body) {
  const user = JSON.parse(localStorage.getItem('user'));

  const requestOptions = {
    method: 'PUT',
    headers: { 'auth-token': user.token, 'user-id': user._id, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
  const user = JSON.parse(localStorage.getItem('user'));

  const requestOptions = {
    method: 'DELETE',
    headers: {
      'auth-token': user.token,
      'user-id': user._id,
    },
  };
  return fetch(url, requestOptions).then(handleResponse);
}


function newPassword(url, body) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body,
  };
  return fetch(url, requestOptions).then(handleResponse);
}


// helper functions

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
