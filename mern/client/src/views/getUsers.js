

import axios from 'axios';
export async function getUsers() {
    let users;
    axios.get('http://localhost:5000/user/')
    .then(response => {
        users=response.data;
    })
    .catch((error) => {
      console.log(error);
    })
    return users;
}
