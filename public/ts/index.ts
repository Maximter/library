const signup_btn = document.getElementById('signup_btn');
const login_btn = document.getElementById('login_btn');

signup_btn.onclick = () : void => {
    window.location.href = '/signup';
} 

login_btn.onclick = () : void => {
    window.location.href = '/login';
} 