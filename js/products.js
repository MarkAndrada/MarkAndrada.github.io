let minCost = undefined;
let maxCost = undefined;
let categoriesArray = [];

const ORDER_ASC_BY_COST = "09";
const ORDER_DESC_BY_COST = "90";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;

//funcion para redireccionar segun la id del producto al que se le haga clic
function product_redirect(id) {
    localStorage.setItem("product_id", id);
    window.location.href = "product-info.html";
}

//funcion que muestra las categorias
function showCategoriesList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let category = array[i];
        //filtro por el precio minimo y maximo fijandome en los valores que esten en los campos de filtrado por precio
        if (((minCost == undefined) || (minCost != undefined && parseInt(category.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(category.cost) <= maxCost))){

                htmlContentToAppend += `
                <div onclick="product_redirect(`+category.id+`)" class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                        <div class="col-3">
                            <img src="` + category.image + `" alt="product image" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <div class="mb-1">
                                <h4>`+ category.name +` - ` + category.currency + ` ` + category.cost + `</h4> 
                                <p> `+ category.description +`</p> 
                                </div>
                                <small class="text-muted">` + category.soldCount + ` artículos</small> 
                            </div>
        
                        </div>
                    </div>
                </div>
                `
        }
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend; 
    }
    
}

//obtengo la catID del localstorage 
let product_id = localStorage.getItem("catID");

document.addEventListener("DOMContentLoaded", function(e){
    //llamo a getJSONData con la url ya dada donde se encuentran los json, pasando como parametro el valor ID 
    getJSONData(PRODUCTS_URL+product_id+EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            categoriesArray = resultObj.data;
            showCategoriesList(categoriesArray.products);
        }
    });

    //limpia los campos de filtrado por precio con el boton de limpiar
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showCategoriesList(categoriesArray.products);
    });
  
    document.getElementById("rangeFilterCost").addEventListener("click", function(){
    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }

        showCategoriesList(categoriesArray.products);
    });
});

//funcion que se usa para ordenar, uso los criteria para ejecutar uno de los valores en particular
function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.products.sort(function(a, b) {
            return a.cost - b.cost;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.products.sort(function(a, b) {
            return b.cost - a.cost;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.products.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            return bCount - aCount;
        });
    }
    return result;
}
//funcion con la que filtro los productos bajo los criterios de precios y los mando a la funcion que los muestra 
function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showCategoriesList(currentCategoriesArray);
}
//boton con el que filtro de manera ascendente por precio
document.getElementById("sortAsc").addEventListener("click", function(){
    sortAndShowCategories(ORDER_ASC_BY_COST, categoriesArray);
});
//boton con el que filtro de manera descente por precio
document.getElementById("sortDesc").addEventListener("click", function(){
    sortAndShowCategories(ORDER_DESC_BY_COST, categoriesArray);
});
//boton para filtrar por relevancia (cantidad vendida)
document.getElementById("sortByRel").addEventListener("click", function(){
    sortAndShowCategories(ORDER_BY_PROD_COUNT, categoriesArray);
});
