import axios from "axios";

export async function addLoan({senderName, recieverName, amount})
{
    const response= await fetch("http://localhost:5000/loans/add", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({sender:senderName, reciever: recieverName, amount}),
    })
    .catch(error => {
        window.alert(error);
        return;
    });

}


export const getLoans = async () => {
    axios.get('http://localhost:5000/loans/')   
    .then(response => {
      const res=response.data.filter((user) => (user.reciever===localStorage.getItem("user")||user.sender==localStorage.getItem("user")));
      setLoan(res.map(i=>createData(i)));
      //res.forEach((loans)=>{console.log(loans);
      //  rows.push(createData(loans))})
    })
    .catch((error) => {
      console.log(error);
    })
  };