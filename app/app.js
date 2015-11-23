'use strict';

var app = angular.module('terminator', [
        'terminator.jsonInspector',
        'terminator.jsonTextInspector',
        'terminator.jsonTableInspector',
        'terminator.jsonMapInspector',
        'ngResource'
    ]);

app.service('ConstantService',function() {
    //TODO improve this
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

    this.categoryParentsSeparator = "=";
    this.googleSheetsUrl = "";
    this.product = {};
});

app.factory('GoogleSheetsDataService', ['$http', '$q', function ($http, $q ) {
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
}]);

app.controller('sheetsUrlController', function($scope, ConstantService, $rootScope, GoogleSheetsDataService, $sce) {
    $scope.apiKeyDisable = false;
    $scope.apiKeySendButtonVisible = true;

    $scope.googleSheetsUrlEditSignVisible = false;
    $scope.googleSheetsUrlValidSignVisible = false;

    $rootScope.devToolsVisible = false;

    $scope.saveUrl = function() {
        if (isGoogleSheetsUrlValid($scope.googleSheetsUrl)) {
            var key = $scope.googleSheetsUrl.split("/d/")[1].split("/")[0];
            ConstantService.googleSheetsUrl = "https://spreadsheets.google.com/feeds/list/"+key+"/od6/public/values?alt=json&callback=JSON_CALLBACK"

            GoogleSheetsDataService.getGoogleSheetsData(ConstantService.googleSheetsUrl)
                .then(
                    function(data) {
                        //TODO implement check data here

                        if (checkData(data.feed.entry || [])) {
                            makeProductJson(data.feed.entry || [], ConstantService.MAP);
                        }

                        makeDataTableJson(data.feed.entry || []);
                        enableDevView();

                    },function(data) {
                        console.log("rest error");
                        showURLRestError();
                    }
                );

        } else {
            //TODO alerts message in case of validations fails
            showURLIvalidError();
            console.log("url invalida");
        }
    },

    $scope.editUrl = function() {
        disableDevView();
        ConstantService.url = "";
        ConstantService.product = {};
    };

    var getAlertTemplate = function(value) {
        return "<div class='alert alert-danger'>"+value+"</div>";
    },

    checkData = function(entries) {
        var response = true;
        for (var linha=0;linha<entries.length;linha++) {
            for (var column=0;column<entries[linha].length;column++) {

            }
        }
        return response;
    },

    showURLIvalidError = function() {
        $scope.googleSheetsUrlRestErrorSignVisible = false;
        $scope.googleSheetsUrlInvalidErrorSignVisible = true;
    },

    showURLRestError = function() {
        $scope.googleSheetsUrlInvalidErrorSignVisible = false;
        $scope.googleSheetsUrlRestErrorSignVisible = true;
    },

    disableDevView = function() {
        $scope.googleSheetsUrlInvalidErrorSignVisible = false;
        $rootScope.devToolsVisible = false;
        $scope.googleSheetsUrlValidSignVisible = false;
        $scope.googleSheetsUrlEditSignVisible = false;
        $scope.apiKeyDisable = false;
        $scope.apiKeySendButtonVisible = true;
        $scope.googleSheetsUrlRestErrorSignVisible = false;
    },

    enableDevView = function() {
        $scope.googleSheetsUrlInvalidErrorSignVisible = false;
        $scope.googleSheetsUrlRestErrorSignVisible = false;
        $scope.apiKeyDisable = true;
        $scope.apiKeySendButtonVisible = false;
        $scope.googleSheetsUrlValidSignVisible = true;
        $scope.googleSheetsUrlEditSignVisible = true;
        $rootScope.devToolsVisible = true;
    },

    // TODO not implemented yet
    makeDataTableJson = function(entries) {
        for (var i=0;i < entries.lenght;i++) {
            if (indexOf(ConstantService.GOOGLE_PREFIX) != -1)
            ConstantService.tableData[i] = newLine;
        }
        ConstantService.tableData
    },

    isGoogleSheetsUrlValid = function(url) {
      //TODO implement validations here
      if (url != null || url != "") {
        if (url.indexOf("/d/") != -1) {
          return true;
        }
      }
      return false;
    },

    makeProductJson = function(entries,map) {
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
    },

    searchData = function(linha, coluna, data) {
        for (var columnName in data[linha]) {
            if (columnName.indexOf(coluna) > -1) {
                return data[linha][columnName].$t;
            }
        }
    },

    populateId = function(value) {
        if (value != null && value != "") {
            ConstantService.product.id = value;
        }
    },

    populateName = function(value) {
        if (value != null && value != "") {
            ConstantService.product.name = value;
        }
    },

    populateDescription = function(value) {
        if (value != null && value != "") {
            ConstantService.product.description = value;
        }
    },

    populateUrl = function(value) {
        if (value != null && value != "") {
            ConstantService.product.url = value;
        }
    },

    populateStatus = function(value) {
        if (value != null && value != "") {
            ConstantService.product.status = value;
        }
    },

    populateCategories = function(value) {
        if (value != null && value != "") {
            ConstantService.product.categories = [];
            var categoryList = value.split(">");
            for (var linha = 0; linha <categoryList.length; linha++) {
                ConstantService.product.categories[linha] = {};
                ConstantService.product.categories[linha].name = categoryList[linha];
                ConstantService.product.categories[linha].id = categoryList[linha];
                // TODO parents is actualy an array
                if (linha!=0) {
                    var categoryListParents = categoryList[linha].split(ConstantService.categoryParentsSeparator);
                    ConstantService.product.categories[linha].parents = [];
                    for (var iterador = 0; iterador < categoryListParents.length; iterador++) {
                        ConstantService.product.categories[linha].parents[iterador] = categoryListParents[iterador];
                    }
                }
            }
        }
    },

    populatePrice = function(value) {
        if (value != null && value != "") {
            ConstantService.product.price = parseFloat(value);
        }
    },

     populateOldPrice = function(value) {
        if (value != null && value != "") {
            ConstantService.product.old_price = parseFloat(value);
        }
    },

    populateBasePrice = function(value) {
        if (value != null && value != "") {
            ConstantService.product.base_price = parseFloat(value);
        }
    },

    populatePublished = function(value) {
        if (value != null && value != "") {
            ConstantService.product.published = value;
        }
    },

    populateUnit = function(value) {
        if (value != null && value != "") {
            ConstantService.product.unit = value;
        }
    },

    populateStock = function(value) {
        if (value != null && value != "" && Number.isInteger(parseInt(value))) {
            ConstantService.product.stock = parseInt(value);
        }
    },

    populateEanCode = function(value) {
        if (value != null && value != "") {
            ConstantService.product.ean_code = value;
        }
    },

    populateVoltagem = function(value) {
        if (value != null && value != "") {
            ConstantService.product.specs = {};
            ConstantService.product.specs.Voltagem = value.split(",");
        }
    }


});
