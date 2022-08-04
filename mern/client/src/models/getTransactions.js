import axios from 'axios';

export async function addTransaction({senderName, recieverName, amount}){
    const response= await fetch("http://localhost:5000/transaction/add", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({senderName, recieverName, amount}),
    })
    .catch(error => {
    window.alert(error);
    return;
    });
}

export const getTrans = async () => {
    axios.get('http://localhost:5000/transaction/')   
    .then(response => {
      const res =response.data.filter((user) => (user.reciever===localStorage.getItem("user")||user.sender==localStorage.getItem("user")));
      setTrans(res.map(el=>createData("transfer",el)));
    })
    .catch((error) => {
      console.log(error);
    })
  }
