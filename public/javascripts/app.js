angular.module('student', [])
 .controller('mainCtrl', [
 '$scope','$http',
 function($scope, $http) {
   $scope.students = [];
   $scope.addStudent = function(){
     var newObject = {name:$scope.formContent, practiceTime :0};
     $scope.students.push(newObject);
     $scope.formContent = "";
   };

   $scope.incrementPracticeTime = function(student) {
     student.practiceTime += 1;
     //student.addPracticeTime(formContent) //Need to get the time from a form
     //Maybe we could have a button for each student that is like (+5) or (+10) mins 
   };
 }
]);
