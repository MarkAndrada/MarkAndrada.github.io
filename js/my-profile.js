let fname = document.getElementById("profile_first_name");
let sname = document.getElementById("profile_second_name");
let fsname = document.getElementById("profile_first_surname");
let ssname = document.getElementById("profile_second_surname");
let mail = document.getElementById("profile_mail");
let cnumber = document.getElementById("profile_contact_number");
let user_mail = localStorage.getItem("Usuario");


(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')


    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {

                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
        if(user_mail==null){
            document.getElementById("profile_container").classList.add('d-none');
            return;
        }
        
        fname.value=localStorage.getItem("First_Name");
        sname.value=localStorage.getItem("Second_Name");
        fsname.value=localStorage.getItem("First_Surname");
        ssname.value=localStorage.getItem("Second_Surname");
        mail.value=user_mail;
        cnumber.value=localStorage.getItem("Contact_Number");
        let pimage = localStorage.getItem("Profile_image");
        if(pimage!=null){
            document.getElementById("profile_picture").src = pimage;
        }
    
})

//Funcion que se ejecuta al abrir la pagina. Se fija si el usuario esta vacio.
//En caso de estarlo, oculta la pagina de perfil
//En caso de no estarlo. Muestra los datos ya guardados con anterioridad
//Al igual que la imagen de perfil

(function user_empty(){
    if(user_mail==null){
        document.getElementById("profile_container").classList.add('d-none');
        return;
    }
    
    fname.value=localStorage.getItem("First_Name");
    sname.value=localStorage.getItem("Second_Name");
    fsname.value=localStorage.getItem("First_Surname");
    ssname.value=localStorage.getItem("Second_Surname");
    mail.value=user_mail;
    cnumber.value=localStorage.getItem("Contact_Number");
    let pimage = localStorage.getItem("Profile_image");
    if(pimage!=null){
        document.getElementById("profile_picture").src = pimage;
    }

    
})

//Se ejecuta tambien al abrir la pagina, se encarga de tirar los mensajes de error
//Cuando no se han rellenado los campos obligatorios


//Guarda los valores en el LocalStorage de los campos que se hayan llenado

function validate(){
    localStorage.setItem("First_Name", fname.value);
    localStorage.setItem("Second_Name", sname.value);
    localStorage.setItem("First_Surname", fsname.value);
    localStorage.setItem("Second_Surname", ssname.value);
    localStorage.setItem("Contact_Number",cnumber.value);
}

//Cambia la imagen de perfil y guarda la imagen en el LocalHost
function encodeImageFileAsURL() {

    var filesSelected = document.getElementById("profile_image").files;
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];

        var fileReader = new FileReader();

        fileReader.onload = function(fileLoadedEvent) {
            var srcData = fileLoadedEvent.target.result;
            var newImage = document.getElementById("profile_picture");
            newImage.src = srcData;
            localStorage.setItem("Profile_image", newImage.src);
            document.getElementById("profile_picture").innerHTML = newImage.outerHTML;
        }
        fileReader.readAsDataURL(fileToLoad);
    }
}
