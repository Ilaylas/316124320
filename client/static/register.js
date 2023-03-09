
const form = document.getElementById('form');
const fullname = document.getElementById('fullname');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const alergy = document.getElementById('alergy');
const adress = document.getElementById('adress');
const phone = document.getElementById('phone');

form.addEventListener('submit',e => {
    e.preventDefault();
    validateInputs();
});

let hasErrors = false;

const setError =(element,message) =>{
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error')

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
    
    hasErrors = true;
}
const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email =>{
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs =() => {
    const fullnameValue = fullname.value.trim();
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    const adressValue = adress.value.trim();
    const phoneValue = phone.value.trim();

    if (fullnameValue === '') {
        setError(username, 'חובה להזין שם משתמש');
    } else {
        setSuccess(username);
    }

    if (usernameValue === '') {
        setError(fullname, 'חובה להזין שם מלא');
    } else {
        setSuccess(fullname);
    }
    if (emailValue === '') {
        setError(email, 'חובה להזין אימייל');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'כתובת אימייל לא תקינה');
    } else {
        setSuccess(email);
    }
    if (passwordValue === '') {
        setError(password, 'חובה להזין סיסמא');
    } else if (passwordValue.length < 6) {
        setError(password, 'סיסמא חייבת להיות לפחות 6 תוווים');
    } else {
        setSuccess(password);
    }
    if (phoneValue === '') {
        setError(phone, "חובה להזין מספר טלפון");
    }  else if (phoneValue.length !== 10 ) {
        setError(phone, "מספר טלפון חייב להיות 10 ספרות");
    } else {
        setSuccess(phone);
    }
    if (password2Value === '') {
        setError(password2, 'חובה לאמת סיסמא');
    } else if (password2Value !== passwordValue) {
        setError(password2, "הסיסמאה אינה תואמת");
    } else {
        setSuccess(password2);
    }
    if (adressValue === '') {
        setError(adress, "חובה להזין כתובת");
    } else {
        setSuccess(adress);
    }

    if (hasErrors !== true) {
        try {
            fetch("api/signUp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullname: fullname.value,
                    username: username.value,
                    email: email.value,
                    password: password.value,
                    alergy: alergy.value,
                    adress: adress.value,
                    phone: phone.value,
                }),
            })
                .then((res) => {
                    window.location = 'Login.html';
                })
                .catch((ex) => alert(ex));
        }
        catch(e) {
            console.log(e);
            alert(e.message);
        }
    }
    else {
        hasErrors = false;
    }
};

