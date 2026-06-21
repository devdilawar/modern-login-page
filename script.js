const loginForm = document.querySelector(".login-form");
const signupForm = document.querySelector(".signup-form");

function showSignup(){
    loginForm.style.display = "none";
    signupForm.style.display = "block";
}

function showLogin(){
    signupForm.style.display = "none";
    loginForm.style.display = "block";
}

function showMessage(text,type){

    const msg = document.getElementById("message");

    msg.style.display = "block";
    msg.innerHTML = text;
    msg.className = type;

    setTimeout(()=>{
        msg.style.display = "none";
    },3000);
}

function validateEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const passwordInput =
document.getElementById("signupPassword");

const strength =
document.getElementById("strength");

passwordInput.addEventListener("input",()=>{

    let pass = passwordInput.value;

    if(pass.length < 6){
        strength.innerHTML = "Weak Password";
        strength.className = "strength weak";
    }
    else if(
        pass.length >= 8 &&
        /[A-Z]/.test(pass) &&
        /[0-9]/.test(pass)
    ){
        strength.innerHTML = "Strong Password";
        strength.className = "strength strong";
    }
    else{
        strength.innerHTML = "Medium Password";
        strength.className = "strength medium";
    }

});

function signupUser(){

    const name =
    document.getElementById("name").value.trim();

    const email =
    document.getElementById("signupEmail").value.trim();

    const password =
    document.getElementById("signupPassword").value;

    const confirm =
    document.getElementById("confirmPassword").value;

    if(name === ""){
        return showMessage("Enter Full Name","error");
    }

    if(!validateEmail(email)){
        return showMessage("Invalid Email Address","error");
    }

    if(password.length < 6){
        return showMessage("Password too weak","error");
    }

    if(password !== confirm){
        return showMessage("Passwords do not match","error");
    }

    localStorage.setItem("email",email);
    localStorage.setItem("password",password);

    showMessage(
        "Account Created Successfully 🎉",
        "success"
    );

    signupForm.reset();
}

function loginUser(){

    const email =
    document.getElementById("loginEmail").value;

    const password =
    document.getElementById("loginPassword").value;

    const savedEmail =
    localStorage.getItem("email");

    const savedPassword =
    localStorage.getItem("password");

    if(email === savedEmail &&
       password === savedPassword){

        showMessage(
            "Login Successful ✅",
            "success"
        );

    }else{

        showMessage(
            "Invalid Email or Password ❌",
            "error"
        );
    }
}

document
.querySelectorAll(".toggle-password")
.forEach(icon=>{

    icon.addEventListener("click",()=>{

        const input =
        icon.previousElementSibling;

        if(input.type==="password"){
            input.type="text";
            icon.classList.replace(
                "fa-eye",
                "fa-eye-slash"
            );
        }else{
            input.type="password";
            icon.classList.replace(
                "fa-eye-slash",
                "fa-eye"
            );
        }

    });

});