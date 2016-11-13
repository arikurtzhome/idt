/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var statesApp = angular.module("states", []);


statesApp.controller("statesCtrl", function($scope,$http) {
    // varialbes
    $scope.stateSelected = false;
    $scope.statesList = [];
    // methods
    $scope.getStatesInformation = function(){ //sets an oject with states information
    $http.get("http://pos.idtretailsolutions.com/countytest/states").
            then(function(rslt){
                rslt = angular.fromJson(rslt.data);
                $scope.statesList = rslt.data;
        });
    };
    
    $scope.getStateDetails= function(indx){ //sets a object values the object is used for information in the display box
        $scope.displayDetails = $scope.statesList[indx];
        $http.get($scope.statesList[indx].detail).
                then(function(rslt){
                    rslt = angular.fromJson(rslt.data);
                    rslt =  rslt.data;
                    $scope.displayDetails.countyDetails = rslt;
                    var sum  =0;
                    for(indx in rslt) {
                       sum += rslt[indx].population ; 
                    }
                    $scope.displayDetails.countiesTotalPop = sum;
                $scope.displayDetails.indication = ($scope.displayDetails.countiesTotalPop==$scope.displayDetails.population) ? "":"*";
        });
        
    }
    
    $scope.toggleSelected= function(indx){ //sets the style of items that have been double clicked
        console.log("aktest1" +$scope.statesList[indx].highlight);
        if(typeof $scope.statesList[indx].highlight == 'undefined' || $scope.statesList[indx].highlight == {'background-color':'#FFFFFF'})
          $scope.statesList[indx].highlight = {'background-color':'#FFFFAA'};
        else
          $scope.statesList[indx].highlight = {'background-color':'#FFFFFF'};  
     }
    
    $scope.showStateDetails = function(indx){ // displays the selected states information in the display box
        $scope.stateSelected = indx;
        $scope.getStateDetails(indx);
     }
    
    $scope.getStatesInformation();
});
