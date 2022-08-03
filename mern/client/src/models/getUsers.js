
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
  axios.get('http://localhost:5000/user/'+name)     
  .then(response => {
      return response.data;
  })
  .catch((error) => {
    console.log(error);
  })
}

export async function updateUser(userUpdate){
  const name=userUpdate.name;
  await fetch(`http://localhost:5000/update/${name}`, {
      method: "POST",
      body: JSON.stringify(userUpdate),
      headers: {
          'Content-Type': 'application/json'
      },
  });
}