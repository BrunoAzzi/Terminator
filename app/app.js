'use strict';

angular.module('terminator', [
  'terminator.jsonInspector',
  'terminator.jsonTextInspector',
  'terminator.jsonTableInspector',
  'terminator.jsonMapInspector',
  'ngResource'
]).service('ConstantService',function(){
  this.GOOGLE_PREFIX = "gsx$";
  this.ID = "id";
  this.NAME = "name";
  this.DESCRIPTION = "description";
  this.URL = "url";
  this.STATUS = "status"
  this.CATEGORIES = "categories";
  this.PRICE = "price";
  this.SPECS_VOLTAGEM = "voltagem";
  this.OLD_PRICE = "oldprice"

  this.BASE_PRICE = "baseprice";
  this.PUBLISHED = "published";
  this.UNIT = "unit";
  this.STOCK = "stock";
  this.EAN_CODE = "ean_code";
  this.MAP = new Map();

  this.googleSheetsUrl = "";
  this.product = {};
}).factory('GoogleSheetsDataService', ['$http', '$q', function ($http, $q) {
    return {
        getGoogleSheetsData: function (googleSheetsUrl) {
            var deferred = $q.defer();

            $http.jsonp(googleSheetsUrl).success(function (data) {
                deferred.resolve(data);
            }).error(function () {
                deferred.reject("An error occurred while getting google sheets data");
            });

            return deferred.promise;
        }
    };
}]).controller('sheetsUrlController', function($scope, ConstantService, $rootScope, GoogleSheetsDataService){
  $scope.apiKeyDisable = false;
  $scope.apiKeySendButtonVisible = true;

  $scope.googleSheetsUrlEditSignVisible = false;
  $scope.googleSheetsUrlValidSignVisible = false;

  $rootScope.devToolsVisible = false;

    $scope.saveUrl = function () {
      if(isGoogleSheetsUrlValid()){
        var key = $scope.googleSheetsUrl.split("/d/")[1].split("/")[0];
        var url = "https://spreadsheets.google.com/feeds/list/"+key+"/od6/public/values?alt=json&callback=JSON_CALLBACK"
        ConstantService.googleSheetsUrl = url;
        console.log(url);

        GoogleSheetsDataService.getGoogleSheetsData(ConstantService.googleSheetsUrl).then(function(data){
          makeProductJson(data.feed.entry || [], ConstantService.MAP);
        });
        enableDevView();
      }else{
        //TODO alerts message in case of validations fails
      }

    }

    $scope.editUrl = function(){
      disableDevView();
      ConstantService.url = "";
      ConstantService.product = {};
    }

    function disableDevView(){
      $rootScope.devToolsVisible = false;
      $scope.googleSheetsUrlValidSignVisible = false;
      $scope.googleSheetsUrlEditSignVisible = false;
      $scope.apiKeyDisable = false;
      $scope.apiKeySendButtonVisible = true;
    }

    function enableDevView(){
      $scope.apiKeyDisable = true;
      $scope.apiKeySendButtonVisible = false;
      $scope.googleSheetsUrlValidSignVisible = true;
      $scope.googleSheetsUrlEditSignVisible = true;
      $rootScope.devToolsVisible = true;
    }

    function isGoogleSheetsUrlValid(){
      //TODO implement validations here
      if($scope.googleSheetsUrl != null || $scope.googleSheetsUrl != ""){
        return true;
      }
    }

    function makeProductJson(entries,map){

      map.set("product.id",ConstantService.GOOGLE_PREFIX+ConstantService.ID);
      map.set("product.name",ConstantService.GOOGLE_PREFIX+ConstantService.NAME);
      map.set("product.description",ConstantService.GOOGLE_PREFIX+ConstantService.DESCRIPTION);
      map.set("product.url",ConstantService.GOOGLE_PREFIX+ConstantService.URL);
      map.set("product.status",ConstantService.GOOGLE_PREFIX+ConstantService.STATUS);
      map.set("product.categories",ConstantService.GOOGLE_PREFIX+ConstantService.CATEGORIES);
      map.set("product.price",ConstantService.GOOGLE_PREFIX+ConstantService.PRICE);
      map.set("product.old_price",ConstantService.GOOGLE_PREFIX+ConstantService.OLD_PRICE);
      map.set("product.base_price",ConstantService.GOOGLE_PREFIX+ConstantService.BASE_PRICE);
      map.set("product.published",ConstantService.GOOGLE_PREFIX+ConstantService.PUBLISHED);
      map.set("product.unit",ConstantService.GOOGLE_PREFIX+ConstantService.UNIT);
      map.set("product.stock",ConstantService.GOOGLE_PREFIX+ConstantService.STOCK);
      map.set("product.ean_code",ConstantService.GOOGLE_PREFIX+ConstantService.EAN_CODE);
      map.set("product.specs.Voltagem",ConstantService.GOOGLE_PREFIX+ConstantService.SPECS_VOLTAGEM);

      populateId(searchData(0,map.get("product.id"),entries));
      populateName(searchData(0,map.get("product.name"),entries));
      populateDescription(searchData(0,map.get("product.description"),entries));
      populateUrl(searchData(0,map.get("product.url"),entries));
      populateStatus(searchData(0,map.get("product.status"),entries));
      populateCategories(searchData(0,map.get("product.categories"),entries));
      populatePrice(searchData(0,map.get("product.price"),entries));
      populateOldPrice(searchData(0,map.get("product.old_price"),entries));
      populateBasePrice(searchData(0,map.get("product.base_price"),entries));
      populatePublished(searchData(0,map.get("product.published"),entries));
      populateUnit(searchData(0,map.get("product.unit"),entries));
      populateStock(searchData(0,map.get("product.stock"),entries));
      populateEanCode(searchData(0,map.get("product.ean_code"),entries));
      populateVoltagem(searchData(0,map.get("product.specs.Voltagem"),entries));
    }

    function searchData(linha, coluna, data){
      for(var columnName in data[linha]){
        if(columnName.indexOf(coluna) > -1){
          return data[linha][columnName].$t;
        }
      }
    }

    function populateId(value){
      if(value != null && value != ""){
        ConstantService.product.id = value;
      }
    }

    function populateName(value){
      if(value != null && value != ""){
        ConstantService.product.name = value;
      }
    }

    function populateDescription(value){
      if(value != null && value != ""){
        ConstantService.product.description = value;
      }
    }

    function populateUrl(value){
      if(value != null && value != ""){
        ConstantService.product.url = value;
      }
    }

    function populateStatus(value){
      if(value != null && value != ""){
        ConstantService.product.status = value;
      }
    }

    function populateCategories(value){
      if(value != null && value != ""){
        ConstantService.product.categories = [];
        var categoryList = value.split(">");
        for(var i=0;i<categoryList.length;i++){
          ConstantService.product.categories[i] = {};
          ConstantService.product.categories[i].name = categoryList[i];
          ConstantService.product.categories[i].id = categoryList[i];
          // TODO parents is actualy an array
          if(i!=0){ConstantService.product.categories[i].parents = categoryList[i-1];}
        }
      }
    }

    function populatePrice(value){
      if(value != null && value != ""){
        ConstantService.product.price = value;
      }
    }

    function populateOldPrice(value){
      if(value != null && value != ""){
        ConstantService.product.old_price = value;
      }
    }

    function populateBasePrice(value){
      if(value != null && value != ""){
        ConstantService.product.base_price = value;
      }
    }

    function populatePublished(value){
      if(value != null && value != ""){
        ConstantService.product.published = value;
      }
    }

    function populateUnit(value){
      if(value != null && value != ""){
        ConstantService.product.unit = value;
      }
    }

    function populateStock(value){
      if(value != null && value != ""){
        ConstantService.product.stock = value;
      }
    }

    function populateEanCode(value){
      if(value != null && value != ""){
        ConstantService.product.ean_code = value;
      }
    }

    function populateVoltagem(value){
      if(value != null && value != ""){
        ConstantService.product.specs = {};
          ConstantService.product.specs.Voltagem = value.split(",");
      }
    }


});
