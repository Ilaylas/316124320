function login(event) {
    event.preventDefault();
    
    let user = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };

    if (!validate(user)) return;

    try {
        fetch("/api/signIn", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.response) {
                    sessionStorage.setItem('LOGGED_IN_USER', JSON.stringify(res.response));
                    window.location = 'index.html';
                }
            })
            .catch((ex) => alert(ex));
    }
    catch(e) {
        console.log(e);
        alert(e.message);
    }
}

function validate(user) {
    if(!user.email){
        document.getElementById("email").focus();
        return false;
    }
    else if(!user.password){
        document.getElementById("password").focus();
        return false;
    }

    return true;
}