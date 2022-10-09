let categoriesArray = [];
let cartLoad = "";
let loadable = [];
let subtotal = 0;
let cant, cost;

function showCartInfo(array){
    console.log(array);
    console.log(cartLoad);
    loadable = array.articles[0];
    cant = loadable.count;
    cost = loadable.unitCost;
    subtotal = cant*cost;
    document.getElementById("cart_image").innerHTML=`<img src=`+loadable.image+` style="max-width:50px";>`;
    document.getElementById("cart_name").innerHTML=loadable.name;
    document.getElementById("cart_cost").innerHTML=(loadable.currency +" "+cost);   
    document.getElementById("cart_amount").value=cant;
    document.getElementById("cart_total_cost").innerHTML=subtotal;
}

document.getElementById("cart_amount").addEventListener("keypress", function(){
    cant = document.getElementById("cart_amount").value;
    subtotal = cant*cost;
    document.getElementById("cart_total_cost").innerHTML=subtotal;
})

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL+"25801"+EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            categoriesArray = resultObj.data;
            showCartInfo(categoriesArray);
        }
    });
});
