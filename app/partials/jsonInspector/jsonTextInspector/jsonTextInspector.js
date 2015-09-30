angular.module('terminator.jsonTextInspector', [
]).controller('jsonTextInspectorController', function($scope, ConstantService, GoogleSheetsDataService) {
  $scope.product = JSON.stringify(ConstantService.product,null,4);
  });
