let categoriesArray =[];
let product_id = localStorage.getItem("product_id");

let htmlContentToAppend = "";
let htmlContent = "";

function product_redirect(id) {
    localStorage.setItem("product_id", id);
    window.location.href = "product-info.html";
}

//Muestro la informacion de los productos y los productos relacionados
function showProductInfo(array){

    htmlContentToAppend += `<h3 class="mt-4">`+ array.name +`</h3><hr> 
                            <b>Precio</b> <p>` + array.currency + ` ` + array.cost + `</p> 
                            <b>Descripción</b> <p>`+ array.description +`</p> 
                            <b>Categoría</b> <p>`+array.category +`</p>
                            <b>Cantidad de vendidos</b><p>`+array.soldCount+`</p> 
                            <b>Imágenes ilustrativas</b><p></p>`;
                            for (let i in array.images){
                                htmlContentToAppend +=`<img src="` + array.images[i] + `" alt="product image" class="img-thumbnail col-sm-3">`;
                            }
    for(let i=0; i<array.relatedProducts.length; i++){
        htmlContent += `<div onclick="product_redirect(`+array.relatedProducts[i].id+`)"class="card" style="width: 18rem;"><img src="`+array.relatedProducts[i].image + `
        " alt="product image" class="img-thumbnail"> <div class="card-body"> <p class="card-text">`+array.relatedProducts[i].name +
         `</p> </div> </div>`;
    }
    document.getElementById("product_info_contaider").innerHTML = htmlContentToAppend; 
    document.getElementById("related_products").innerHTML = htmlContent;
    
}


//Muestro los comentarios hechos 
function showComments(comments){
    htmlContentToAppend += `<h3>Comentarios</h3> `
    for(let i=0; i<comments.length; i++){
        htmlContentToAppend += `<div class="list-group-item list-group-item-action"> <b>`+ comments[i].user +`</b> - `+  comments[i].dateTime + ` - `;
        let puntuacion = comments[i].score;
        //Este for es para color las estrellas dependiendo de la puntuacion guardada en el comentario
        for(let a = 1; a<6; a++){
            if(a <= comments[i].score){
                console.log(a)
                htmlContentToAppend += `<span class="fa fa-star checked"></span>`;
            }
            else{
                htmlContentToAppend += `<span class="fa fa-star"></span>`;
            }
        }
        htmlContentToAppend += `<p>`+ comments[i].description +`</p></div>`;

    
    }
    
    document.getElementById("product_info_contaider").innerHTML = htmlContentToAppend; 
    
}
//Funcion que se fija en el .json con la id del producto, llama al que imprime en pantalla la info del producto y
// luego va a fijarse en los comentarios y los imprime
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL+product_id+EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            categoriesArray = resultObj.data;
            showProductInfo(categoriesArray);
            getJSONData(PRODUCT_INFO_COMMENTS_URL+product_id+EXT_TYPE).then(function(resultObj){
                if (resultObj.status === "ok")
                {
                    categoriesArray = resultObj.data;
                    showComments(categoriesArray);
                }
            });
        }
    });
});
