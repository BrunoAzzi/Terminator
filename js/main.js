var map = new Map();
var product = {};
var data = {};
var html = [''];

var ID_SELECT = "id-select";
var URL_SELECT = "url-select";
var CATEGORIES_SELECT = "categories-select";
var PRICE_SELECT = "price-select";

function listEvents(root) {
  data = root.feed.entry || [];

  for (var property in data[0]) {
    if(property.indexOf("gsx$") > -1){
        html.push('<option>', property.split("$", 2)[1], '</option>');
    }
  }

  populateSelectors(html);
}

function populateSelectors(html){
  populateSelect(ID_SELECT, html);
  populateSelect(URL_SELECT, html);
  populateSelect(CATEGORIES_SELECT, html);
  populateSelect(PRICE_SELECT, html);
}

function populateSelect(name, html){
  document.getElementById(name).innerHTML = html.join("");
}

function generateJson(){
  //for( i = 0; i < data.length; i++){
   map.set("product.id","gsx$"+document.getElementById("id-select").value);
   map.set("product.url","gsx$"+document.getElementById("url-select").value);
   map.set("product.categories","gsx$"+document.getElementById("categories-select").value);
   map.set("product.price","gsx$"+document.getElementById("price-select").value);

   populateId(searchData(0,map.get("product.id")));
   populateUrl(searchData(0,map.get("product.url")));
   product.categories = searchData(0,map.get("product.categories")).split("-");
   populatePrice(searchData(0,map.get("product.price")));

 //}
   console.log(JSON.stringify(product));
}

function populateId(value){
  if(value != null && value != ""){
    product.id = value;
  }
}

function populateUrl(value){
  if(value != null && value != ""){
    product.url = value;
  }
}

function populateCategories(value){
  if(value != null && value != ""){
    categoryList = value.split(">");
    //TODO implement
  }
}

function populatePrice(value){
  if(value != null && value != ""){
    product.price = value;
  }
}

function searchData(linha, coluna){
  for(var columnName in data[linha]){
    if(columnName.indexOf(coluna) > -1){
      return data[linha][columnName].$t;
    }
  }
}
