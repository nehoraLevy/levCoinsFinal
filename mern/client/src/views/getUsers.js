/*export async function getUsersByName(name) {
    let users;
    fetch(`http://localhost:5000/user/:${name}`, {       
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },}
    .then(response => {
        users=response.json();
    })
    .catch((error) => {
      console.log(error);
    })
    )
    return users;
}*/
import axios from 'axios'
export async function getUsers() {
  let users;
  axios.get('http://localhost:5000/user/')     
  .then(response => {
    console.log(response.data);
      users=response.json();
  })
  .catch((error) => {
    console.log(error);
  })

  return users;
}

export async function getUserByName(name) {
  let users;
  axios.get('http://localhost:5000/',{
    params:{
      name:String(name)
    }
  })     
  .then(response => {
    console.log(response.data);
      users=response.json();
  })
  .catch((error) => {
    console.log(error);
  })

  return users;
}