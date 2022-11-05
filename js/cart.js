let categoriesArray = [];
let cartLoad = "";
let loadable = [];
let subtotal = 0;
let cant, cost;
let porcentaje = 0;
let moneda = "USD";
let total;
let id;
let met_pago = document.getElementById("Payment_Selected");
let tarj_numb = document.getElementById("num_tarjeta");
let sec_code = document.getElementById("cod_seg");
let tarj_venc = document.getElementById("vencimiento");
let acount_num = document.getElementById("num_cuenta");
let total_cost_text = document.getElementById("totalCostText");
let comissionText = document.getElementById("comissionText");
let productCostText = document.getElementById("productCostText");
let pagoError = document.querySelector('#Payment_Selected + span.error');


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL+"25801"+EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            categoriesArray = resultObj.data;
            showCartInfo(categoriesArray);
            changePorcentage();
            productCostText.innerHTML = moneda  + " " + subtotal;
            comissionText.innerHTML = moneda + " " + porcentaje;
            total_cost_text.innerHTML = moneda + " " + total;
 
                'use strict'
            
                // Fetch all the forms we want to apply custom Bootstrap validation styles to
                var forms = document.querySelectorAll('.needs-validation')
                console.log(forms)
            
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
                

            
        }
    });
});

function showCartInfo(array){
    loadable = array.articles[0];
    cant = loadable.count;
    cost = loadable.unitCost;
    subtotal = cant*cost;
    document.getElementById("cart_table").innerHTML+=`<tr id="cart-load">
    <th id="cart_image"><img src=`+loadable.image+` style="max-width:50px";></th>
    <th id="cart_name">`+loadable.name+`</th>
    <th id="cart_cost">`+(loadable.currency +" "+cost)+`</th>
    <th><input id="cart_amount" class="form-control" type="number" value="`+cant+`"style="width:25%;margin:auto" required></th>
    <th id="cart_total_cost">`+moneda +" " + subtotal+`</th>
  </tr> 
    `;
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
    comissionText.innerHTML = moneda + " " + porcentaje;
    total_cost_text.innerHTML = moneda + " " + total;

}

document.getElementById("cart_table").addEventListener("input", function(){
    cant = document.getElementById("cart_amount").value;
    subtotal = cant*cost;
    document.getElementById("cart_total_cost").innerHTML= moneda + " " + subtotal;
    productCostText.innerHTML = moneda  + " " + subtotal;
    changePorcentage();
    comissionText.innerHTML = moneda + " " + porcentaje;
    total_cost_text.innerHTML = moneda + " " + total;
})


document.getElementById("finalizar_compra").addEventListener("click", function(){
    if(met_pago.innerHTML == "No ha seleccionado"){
        pagoError.textContent = 'Debe seleccionar una forma de pago';
        return;
    }
    pagoError.textContent = '';
})

document.getElementById("sel_pago").addEventListener("click", function(){
    met_pago.innerHTML = "Tarjeta de credito";
    tarj_numb.disabled =false;
    sec_code.disabled =false;
    tarj_venc.disabled =false;
    acount_num.disabled =true;
    pagoError.textContent = '';
})

function validateAmountAndSelectedPayment(){
    let cant = document.getElementById("cart_amount");
    cant.setCustomValidity(cant.value<=0 || cant.value=='' ? "La cantidad debe ser mayor a 0": "");
    met_pago.setCustomValidity(met_pago.innerHTML == "No ha seleccionado" ? "Seleccione un metodo de pago":"");
}

document.getElementById("credit").addEventListener("click", function(){
    met_pago.innerHTML = "Tarjeta de credito";
    tarj_numb.disabled =false;
    sec_code.disabled =false;
    tarj_venc.disabled =false;
    acount_num.disabled =true;
    tarj_numb.required = true;
    sec_code.required =true;
    tarj_venc.required =true;
    acount_num.required =false;

})
document.getElementById("bank").addEventListener("click", function(){
    met_pago.innerHTML = "Transferencia bancaria";
    tarj_numb.disabled =true;
    sec_code.disabled =true;
    tarj_venc.disabled =true;
    acount_num.disabled =false;
    tarj_numb.required = false;
    sec_code.required =false;
    tarj_venc.required =false;
    acount_num.required =true;

})
