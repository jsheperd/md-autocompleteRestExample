angular
   .module('firstApplication', ['ngMaterial', 'ngResource'])
   .controller('autoCompleteController', autoCompleteController);

function autoCompleteController ($timeout, $q, $log, $http) {
   var self = this;
   self.simulateQuery = false;
   self.isDisabled    = false;
   // list of states to be displayed
   self.selectedItemChange = selectedItemChange;
   self.searchTextChange   = searchTextChange;
   self.filteredList = [];

   function searchTextChange(text) {
      $log.info('Text changed to ' + text);
      var deferred = $q.defer();
     
      $http.get('/state?state=' + text).then(
        function(res){
          angular.copy( res.data, self.filteredList);
          deferred.resolve();
          $log.info(res.data);
        },
        function(err) {
          deferred.reject(err);
          self.filteredList = [];
          $log.info(err); 
        });
        //self.filteredList = deferred.promise;
   }
   function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
   }
}  
