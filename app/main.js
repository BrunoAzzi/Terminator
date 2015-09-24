var map = new Map();
var product = {};
var data = {};
var html = [''];

var ID_SELECT = "id-select";
var URL_SELECT = "url-select";
var CATEGORIES_SELECT = "categories-select";
var PRICE_SELECT = "price-select";
var VOLTAGEM_SELECT = "voltagem-select";
var OLD_PRICE_SELECT = "old-price-select";

var SELECT_EMPTY_VALUE = "Escolha uma coluna";

var GOOGLE_PREFIX = "gsx$";

function listEvents(root) {
  data = root.feed.entry || [];

  //TODO revisar essa gambi
  html.push('<option>',SELECT_EMPTY_VALUE,'</option>');

  for (var property in data[0]) {
    if(property.indexOf(GOOGLE_PREFIX) > -1){
        html.push('<option>', property.split("$", 2)[1], '</option>');
    }
  }

  populateSelectors(html);

  document.getElementById("id-label").addEventListener('click', function(){doSomething("id-form-group", "id-label");});
  document.getElementById("url-label").addEventListener('click', function(){doSomething("url-form-group", "url-label");});
  document.getElementById("categories-label").addEventListener('click', function(){doSomething("categories-form-group", "categories-label");});
  document.getElementById("price-label").addEventListener('click', function(){doSomething("price-form-group", "price-label");});
  document.getElementById("voltagem-label").addEventListener('click', function(){doSomething("voltagem-form-group", "voltagem-label");});
  document.getElementById("old-price-label").addEventListener('click', function(){doSomething("old-price-form-group", "old-price-label");});
}

//this code is not supported for IE < 10
function doSomething(selectFormGroupId, labelId){
  label = document.getElementById(labelId);
  select = document.getElementById(selectFormGroupId);
  if(label.classList.contains('label-default')){
    label.classList.remove('label-default');
    label.classList.add('label-primary');
    select.classList.remove('hidden');
  }else{
    label.classList.remove('label-primary');
    label.classList.add('label-default');
    select.classList.add('hidden');
  }
}

function populateSelectors(html){
  populateSelect(ID_SELECT, html);
  populateSelect(URL_SELECT, html);
  populateSelect(CATEGORIES_SELECT, html);
  populateSelect(PRICE_SELECT, html);
  populateSelect(VOLTAGEM_SELECT, html);
  populateSelect(OLD_PRICE_SELECT, html);
}

function populateSelect(name, html){
  document.getElementById(name).innerHTML = html.join("");
}

function generateJson(){
  product = {};
  map.clear();

   if(!isHidden(ID_SELECT)) if(!isSelectEmpty(ID_SELECT)) map.set("product.id",GOOGLE_PREFIX+document.getElementById(ID_SELECT).value);
   if(!isHidden(URL_SELECT)) if(!isSelectEmpty(URL_SELECT)) map.set("product.url",GOOGLE_PREFIX+document.getElementById(URL_SELECT).value);
   if(!isHidden(CATEGORIES_SELECT)) if(!isSelectEmpty(CATEGORIES_SELECT)) map.set("product.categories",GOOGLE_PREFIX+document.getElementById(CATEGORIES_SELECT).value);
   if(!isHidden(PRICE_SELECT)) if(!isSelectEmpty(PRICE_SELECT)) map.set("product.price",GOOGLE_PREFIX+document.getElementById(PRICE_SELECT).value);
   if(!isHidden(VOLTAGEM_SELECT)) if(!isSelectEmpty(VOLTAGEM_SELECT)) map.set("product.specs.Voltagem",GOOGLE_PREFIX+document.getElementById(VOLTAGEM_SELECT).value);
   if(!isHidden(OLD_PRICE_SELECT)) if(!isSelectEmpty(OLD_PRICE_SELECT)) map.set("product.old_price",GOOGLE_PREFIX+document.getElementById(OLD_PRICE_SELECT).value);

   populateId(searchData(0,map.get("product.id")));
   populateUrl(searchData(0,map.get("product.url")));
   populateCategories(searchData(0,map.get("product.categories")));
   populatePrice(searchData(0,map.get("product.price")));
   populateOldPrice(searchData(0,map.get("product.old_price")));
   populateVoltagem(searchData(0,map.get("product.specs.Voltagem")));

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
    product.categories = [];
    categoryList = value.split(">");
    for(i=0;i<categoryList.length;i++){
      product.categories[i] = {};
      product.categories[i].name = categoryList[i];
      product.categories[i].id = categoryList[i];
      // TODO parents is actualy an array
      if(i!=0){product.categories[i].parents = categoryList[i-1];}
    }
  }
}

function populatePrice(value){
  if(value != null && value != ""){
    product.price = value;
  }
}

function populateOldPrice(value){
  if(value != null && value != ""){
    product.old_price = value;
  }
}
function populateVoltagem(value){
  if(value != null && value != ""){
    product.specs = {};
      product.specs.Voltagem = value.split(",");
  }
}

function isSelectEmpty(selectId){
  if(document.getElementById(selectId).value == SELECT_EMPTY_VALUE) return true;
  return false;
}

function isHidden(selectId) {
    return (document.getElementById(selectId).offsetParent === null);
}

function searchData(linha, coluna){
  for(var columnName in data[linha]){
    if(columnName.indexOf(coluna) > -1){
      return data[linha][columnName].$t;
    }
  }
}
