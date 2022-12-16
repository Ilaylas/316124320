var user= document.forms['form']['user'];
var password = document.forms['form']['password'];

var user_error= document.getElementById(   'user_error');
var pass_error = document.getElementById('pass_error');

user.addEventListener('textInput', user_verify);
password.addEventListener('textInput', pass_verify)

function validated(){
    if(user.value.length<6){
        user_error.style.display = "block";
        user.focus();
        return false;
    }
    if(password.value.length<6){
        pass_error.style.display = "block";
        password.focus();
        return false;
    }
}
function user_verify(){
    if(user.value.length >= 5){
        user_error.style.display = "none";
        return true;
    }
}

function pass_verify(){
    if(password.value.length >= 5){
        pass_error.style.display = "none";
        return true;
    }
}