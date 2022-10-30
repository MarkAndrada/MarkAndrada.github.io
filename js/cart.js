let categoriesArray = [];
let cartLoad = "";
let loadable = [];
let subtotal = 0;
let cant, cost;
let porcentaje = 0;
let moneda = "USD";
let total;
let id;
let met_pago = document.getElementById("Contenido");


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL+"25801"+EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            categoriesArray = resultObj.data;
            showCartInfo(categoriesArray);
            changePorcentage();
            document.getElementById("productCostText").innerHTML = moneda  + " " + subtotal;
            document.getElementById("comissionText").innerHTML = moneda + " " + porcentaje;
            document.getElementById("totalCostText").innerHTML = moneda + " " + total;
        }
    });
});

function showCartInfo(array){
    loadable = array.articles[0];
    cant = loadable.count;
    cost = loadable.unitCost;
    subtotal = cant*cost;
    document.getElementById("cart_image").innerHTML=`<img src=`+loadable.image+` style="max-width:50px";>`;
    document.getElementById("cart_name").innerHTML=loadable.name;
    document.getElementById("cart_cost").innerHTML=(loadable.currency +" "+cost);   
    document.getElementById("cart_amount").value=cant;
    document.getElementById("cart_total_cost").innerHTML=moneda +" " + subtotal;
}

function changePorcentage(){

    if(document.getElementById("gold").checked){
        porcentaje = subtotal * 15 /100;
    }
    if(document.getElementById("premium").checked){
        porcentaje = subtotal * 7 /100;
    }
    if(document.getElementById("standard").checked){
        porcentaje = subtotal * 5 /100;
    }
    
    total = porcentaje + subtotal;
    document.getElementById("comissionText").innerHTML = moneda + " " + porcentaje;
    document.getElementById("totalCostText").innerHTML = moneda + " " + total;

}

document.getElementById("cart_amount").addEventListener("input", function(){
    cant = document.getElementById("cart_amount").value;
    subtotal = cant*cost;
    document.getElementById("cart_total_cost").innerHTML= moneda + " " + subtotal;
    document.getElementById("productCostText").innerHTML = moneda  + " " + subtotal;
    changePorcentage();
    document.getElementById("comissionText").innerHTML = moneda + " " + porcentaje;
    document.getElementById("totalCostText").innerHTML = moneda + " " + total;
})


document.getElementById("finalizar_compra").addEventListener("click", function(){
    let calle = document.getElementById("calle");
    let numero = document.getElementById("numero");
    let esquina = document.getElementById("esquina");
    let num_tarj = document.getElementById("num_tarjeta");
    let num_seg= document.getElementById("cod_seg");
    let venc = document.getElementById("vencimiento");
    let num_cuen = document.getElementById("num_cuenta");
    let error_count=0;
    if(calle.value==""||numero.value==""||esquina.value==""||met_pago.innerHTML == "No ha seleccionado"||cant<=0||((num_tarj.value==""||num_seg.value==""||venc.value=="")||num_cuen.value=="")){
        if(calle.value==""){
            let calleError = document.querySelector('#calle + span.error');
            calleError.textContent = 'Ingresa una calle';
            calle.style.borderColor = "red";
            error_count++;
        }
        if(numero.value==""){
            let numeroError = document.querySelector('#numero + span.error');
            numeroError.textContent = 'Ingresa un numero';
            numero.style.borderColor = "red";
            error_count++;
        }
        if(esquina.value==""){
            let esquinaError = document.querySelector('#esquina + span.error');
            esquinaError.textContent = 'Ingresa una esquina';
            esquina.style.borderColor = "red";
            error_count++;
        }
        if(met_pago.innerHTML == "No ha seleccionado"){
            let pagoError = document.querySelector('#Contenido + span.error');
            pagoError.textContent = 'Debe seleccionar una forma de pago';
            error_count++;
        }
        if(document.getElementById("credit").checked == true){
            if(num_tarj == ""){
                let num_tarj_error = document.querySelector('#num_tarjeta + span.error');
                num_tarj_error.textContent = 'Debe ingresar una tarjeta';
                error_count++;
            }
            if(num_seg == "No ha seleccionado"){
                let num_seg_error = document.querySelector('#cod_seg + span.error');
                num_seg_error.textContent = 'Debe ingresar un número de seg';
                error_count++;
            }
            if(venc == "No ha seleccionado"){
                let venc_error = document.querySelector('#vencimiento + span.error');
                venc_error.textContent = 'Debe ingresar una fecha';
                error_count++;
            }
        }
        if(document.getElementById("bank").checked==true){
            if(num_cuen.innerHTML == "No ha seleccionado"){
                let num_cuen_error = document.querySelector('#num_cuenta + span.error');
                num_cuen_error.textContent = 'Debe ingresar una cuenta';
                error_count++;
            }
        }
    }
    if(error_count==0){
        document.getElementById("alert-success").classList.add("show");
    }
})

document.getElementById("sel_pago").addEventListener("click", function(){
    if(document.getElementById("credit").checked == true){
        met_pago.innerHTML = "Tarjeta de credito";
        document.getElementById("num_tarjeta").disabled =false;
        document.getElementById("cod_seg").disabled =false;
        document.getElementById("vencimiento").disabled =false;
        document.getElementById("num_cuenta").disabled =true;
    }
    if(document.getElementById("bank").checked==true){
        met_pago.innerHTML = "Transferencia bancaria";
        document.getElementById("num_tarjeta").disabled =true;
        document.getElementById("cod_seg").disabled =true;
        document.getElementById("vencimiento").disabled =true;
        document.getElementById("num_cuenta").disabled =false;
    }
})


document.getElementById("credit").addEventListener("click", function(){
    met_pago.innerHTML = "Tarjeta de credito";
    document.getElementById("num_tarjeta").disabled =false;
    document.getElementById("cod_seg").disabled =false;
    document.getElementById("vencimiento").disabled =false;
    document.getElementById("num_cuenta").disabled =true;
})
document.getElementById("bank").addEventListener("click", function(){
    met_pago.innerHTML = "Transferencia bancaria";
    document.getElementById("num_tarjeta").disabled =true;
    document.getElementById("cod_seg").disabled =true;
    document.getElementById("vencimiento").disabled =true;
    document.getElementById("num_cuenta").disabled =false;
})


