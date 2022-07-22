


export async function getUsers() {
    const response = await fetch(`http://localhost:5000/user/`);

    if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
    }
    const users = await response.json();
    return users;
}

export async function checkUser({name, pass}) {
    const users=getUsers();
    console.log("18:", users);
    users.array.forEach(user => {
        if(user.name===name && user.password===pass)
        {
            return true;
        }
    });
    return false;
}