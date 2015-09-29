'use strict';

angular.module('terminator', [
  'terminator.jsonInspector',
  'terminator.jsonTextInspector',
  'terminator.jsonTableInspector',
  'terminator.jsonMapInspector',
  'ngResource'
]).factory('SheetsFactory', function($resource) {
  var url = "https://spreadsheets.google.com/feeds/list/1RXqSvRBTZe2zvYSwCUM_Xj_NtVruqztEA6AMvKFGKDA/od6/public/values?alt=json";

  var SheetsAPI = $resource(url,
      { callback: "JSON_CALLBACK" },
      { get: { method: "JSONP" }});

  return {
    getData: function(){
      return SheetsAPI.get().$promise;
    }
  }

}).controller('sheetsUrlController', function($scope){
    var teste = $scope.sheetsUrl;
    $scope.teste = teste;

}).service('ConstantService',function(){
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
  this.product = {};
});
