const emailError = document.querySelector('#floatingInput + span.error');
const contraseñaError = document.querySelector('#floatingPassword + span.error');
const emailCuadro = document.getElementById("floatingInput");
const contraseñaCuadro = document.getElementById("floatingPassword");
document.getElementById("login_button").addEventListener("click", validacion);

function validacion(){
    var mail, contraseña;
    mail = document.getElementById("floatingInput").value;
    contraseña = document.getElementById("floatingPassword").value;
    emailError.innerHTML = '';
    contraseñaError.innerHTML = '';
    emailCuadro.style.borderColor = "";
    contraseñaCuadro.style.borderColor = "";
    if (mail=='' || contraseña==''){
        if(mail==''){
            emailError.textContent = 'Ingrese tu e-mail';
            emailCuadro.style.borderColor = "red";
        }
        if(contraseña==''){
            contraseñaError.textContent = 'Ingrese tu contraseña';
            contraseñaCuadro.style.borderColor = "red";
        }
    }
    else{
        window.location.href ="home.html";
    }
    

}
